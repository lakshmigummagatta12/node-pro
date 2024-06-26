const express = require('express');
const { getItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const auth = require('./middleware/auth');
const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', auth, createItem);
router.put('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);

module.exports = router;
