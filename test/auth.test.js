const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const { sequelize, User } = require('../models');

describe('Auth API', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
      });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password',
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('should get the profile of the logged-in user', async () => {
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password',
      });
    const res = await request(app)
      .get('/auth/profile')
      .set('Authorization', `Bearer ${loginRes.body.token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('username', 'testuser');
  });
});
