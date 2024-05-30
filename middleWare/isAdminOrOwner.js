const { Item } = require('../models');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const item = await Item.findByPk(id);

  if (!item) return res.status(404).json({ error: 'Item not found' });

  if (item.user_id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  next();
};
