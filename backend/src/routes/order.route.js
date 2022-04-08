var express = require('express');
var router = express.Router();

// Import Order Controller
const orderController = require('../controllers/order.controller');

// Get All Order Items
router.get('/', orderController.getAllOrders);


// Get Order Items by username
router.get('/:username', orderController.getOrdersByUsername);


// Create Order Item
router.post('/', orderController.createOrderItem);


module.exports = router;