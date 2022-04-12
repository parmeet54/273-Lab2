var express = require('express');
var router = express.Router();

// Import Order Controller
const orderController = require('../controllers/order.controller');


// Create Order Item
router.post('/', orderController.createOrder);


// Get All Order Items
router.get('/', orderController.getAllOrders);


// Get Order Items by username
router.get('/:username', orderController.getOrdersByUsername);



module.exports = router;