const { GraphQLInt, GraphQLList, GraphQLString } = require("graphql");

// Import Shop Type
const ShopType = require("../TypeDefs/ShopType");

// Import Shop Model
const ShopModel = require("../../models/shop.model");

// Get All Shops
exports.getAllShops = {
  type: new GraphQLList(ShopType),
  async resolve(parent, args) {
    const allShops = await ShopModel.find();
    return allShops;
  },
};

// Get Shop By ID
exports.getShopByID = {
  type: ShopType,
  args: {
    shop_ID: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    try {
      const shop = await ShopModel.findOne({ shop_ID: args.shop_ID });
      return shop;
    } catch (err) {
      return err;
    }
  },
};

// Get Shop by User
exports.getShopByUser = {
  type: ShopType,
  args: {
    username: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      const shop = await ShopModel.findOne({ username: args.username });
      return shop;
    } catch (err) {
      return err;
    }
  },
};
