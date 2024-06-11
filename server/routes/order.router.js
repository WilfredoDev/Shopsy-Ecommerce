const express = require('express');
const {createOrder,getOrders, getOrder, getOrderProducts} = require('../controllers/order.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/', authenticate, getOrders);
router.get('/:orderId', authenticate, getOrder);
router.get('/:orderId/products', authenticate, getOrderProducts);

module.exports = router

