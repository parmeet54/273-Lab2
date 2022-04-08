var express = require('express');
var router = express.Router();

// Import item controller
const itemController = require('../controllers/item.controller');

// Get all Items
router.get("/", itemController.getAllItems);

// Get Item by ID
router.get("/:item_ID", itemController.getItemByID);

// Get Item by Shop
router.get("/byshop/:shop", itemController.getItemByShopID);

// Get Item by NAME
router.get("/searchItem/:name", itemController.getItemByName);

// Create an Item
router.post("/", itemController.createItem);

// Update Item
router.put("/:item_ID", itemController.updateItem);

// Update Item Quantity
router.put("/stock/:item_ID", itemController.updateItemQuantity);

// Update Item Fav
router.put("/fav/:item_ID", itemController.updateItemFav);

// Delete Item
router.delete("/:item_ID", itemController.deleteItem);


module.exports = router;