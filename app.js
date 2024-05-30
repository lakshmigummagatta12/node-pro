const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const bidRoutes = require('./routes/bidRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const auth = require('/middleware/auth');
const { notifyBid } = require('./services/notificationService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/auth', authRoutes);
app.use('/items', itemRoutes);
app.use('/bids', bidRoutes);
app.use('/notifications', notificationRoutes);

// Middleware for error handling
app.use(require('./middleware/errorHandler'));

// WebSocket events
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('bid', async (data) => {
    const { itemId, bidAmount, userId } = data;
    try {
      const item = await Item.findByPk(itemId);
      if (!item) {
        socket.emit('error', { error: 'Item not found' });
        return;
      }

      if (bidAmount <= item.current_price) {
        socket.emit('error', { error: 'Bid amount must be higher than current price' });
        return;
      }

      const bid = await Bid.create({ item_id: itemId, user_id: userId, bid_amount: bidAmount });
      await item.update({ current_price: bidAmount });

      io.emit('update', { itemId, bidAmount, userId });
      await notifyBid(item.user_id, `New bid on your item: ${item.name}`);
    } catch (error) {
      socket.emit('error', { error: error.message });
    }
  });
});

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

