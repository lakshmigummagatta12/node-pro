const { Sequelize } = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config);

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Item = require('./item')(sequelize, Sequelize.DataTypes);
const Bid = require('./bid')(sequelize, Sequelize.DataTypes);
const Notification = require('./notification')(sequelize, Sequelize.DataTypes);

User.hasMany(Bid);
Item.hasMany(Bid);
User.hasMany(Notification);

sequelize.sync();

module.exports = {
  sequelize,
  User,
  Item,
  Bid,
  Notification,
};
