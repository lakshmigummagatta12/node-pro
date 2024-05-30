const request = require('supertest');
const app = require('../app');

describe('GET /items', () => {
    it('should return all items', async () => {
        const response = await request(app)
            .get('/items')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveLength(3); // Adjust based on your data
    });
});
