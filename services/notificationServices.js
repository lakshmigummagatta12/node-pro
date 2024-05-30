const { Notification } = require('../models');

const notifyBid = async (userId, message) => {
  try {
    await Notification.create({ user_id: userId, message });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

module.exports = { notifyBid };
