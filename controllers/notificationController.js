const { Notification } = require('../models');

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({ where: { user_id: req.user.id } });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markNotificationsRead = async (req, res) => {
  try {
    await Notification.update({ is_read: true }, { where: { user_id: req.user.id, is_read: false } });
    res.json({ message: 'Notifications marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getNotifications, markNotificationsRead };
