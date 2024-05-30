const express = require('express');
const { getBidsByItemId, createBid } = require('../controllers/bidController');
const auth = require('./middleware/auth');
const router = express.Router();

router.get('/:itemId/bids', getBidsByItemId);
router.post('/:itemId/bids', auth, createBid);

module.exports = router;
