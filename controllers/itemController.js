const { Item, User } = require('../models');

const getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createItem = async (req, res) => {
  const { name, description, starting_price, end_time, image_url } = req.body;
  try {
    const item = await Item.create({ name, description, starting_price, end_time, image_url });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, starting_price, end_time, image_url } = req.body;
  try {
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    await item.update({ name, description, starting_price, end_time, image_url });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    await item.destroy();
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getItems, getItemById, createItem, updateItem, deleteItem };
