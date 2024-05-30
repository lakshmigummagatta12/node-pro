const { Bid, Item, User } = require('../models');
const { notifyBid } = require('../services/notificationService');

const getBidsByItemId = async (req, res) => {
  const { itemId } = req.params;
  try {
    const bids = await Bid.findAll({ where: { item_id: itemId } });
    res.json(bids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBid = async (req, res) => {
  const { itemId } = req.params;
  const { bid_amount } = req.body;
  try {
    const item = await Item.findByPk(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    if (bid_amount <= item.current_price) return res.status(400).json({ error: 'Bid amount must be higher than current price' });
    const bid = await Bid.create({ item_id: itemId, user_id: req.user.id, bid_amount });
    await item.update({ current_price: bid_amount });
    notifyBid(item.user_id, `New bid on your item: ${item.name}`);
    res.status(201).json(bid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getBidsByItemId, createBid };
