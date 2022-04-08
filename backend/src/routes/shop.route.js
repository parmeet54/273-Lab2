var express = require('express');
var router = express.Router();

// Import shop controller
const shopController = require('../controllers/shop.controller');

// Get all Shops
router.get("/", shopController.getAllShops);

// Get Shop by ID
router.get("/:shop_ID", shopController.getShopByID);

// Get Shop by Username
router.get("/usershop/:username", shopController.getShopByUser);

// Create a Shop
router.post("/", shopController.createShop);

// Update Shop
router.put("/:shop_ID", shopController.updateShop);

// Update Shop Sales
router.put("/sales/:shop_ID", shopController.updateShopSales);

// Update Shop Image
router.put("/shopimage/:shop_ID", shopController.updateShopImage);

module.exports = router;