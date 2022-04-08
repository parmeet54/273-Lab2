var express = require('express');
var router = express.Router();

// Import item controller
const cartController = require('../controllers/cart.controller');

// Get all Items
router.get("/", cartController.getAllItems);

// Create Item
router.post("/", cartController.createItem);

// Get Item by ID
router.get("/:cart_item_ID", cartController.getItemByID);

// Get Item by Username
router.get("/byuser/:username", cartController.getItemByUsername);

// delete Cart Item by username
router.delete('/:username', cartController.deleteItem);

module.exports = router;