const { GraphQLInt, GraphQLList, GraphQLString } = require("graphql");

// Import Shop Type
const ShopType = require("../TypeDefs/ShopType");

// Import Shop Model
const ShopModel = require("../../models/shop.model");

// Create Shop
exports.createShop = {
  type: ShopType,
  args: {
    shop_ID: { type: GraphQLInt },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    image: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const shop_ID = args.shop_ID;
    const name = args.name;
    const username = args.username;
    const image = args.image;
    try {
      await ShopModel.create({ shop_ID, name, username, image });
      return args;
    } catch (err) {
      return err;
    }
  },
};

// Update Shop
exports.updateShop = {
  type: ShopType,
  args: {
    shop_ID: { type: GraphQLInt },
    name: { type: GraphQLString },
    total_sales: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    try {
      await ShopModel.findOneAndUpdate(
        { shop_ID: args.shop_ID },
        {
          $set: {
            name: args.name,
            total_sales: args.total_sales,
          },
        },
        { returnOriginal: false }
      );
      return args;
    } catch (err) {
      return err;
    }
  },
};

// Update Shop sales
exports.updateShopSales = {
  type: ShopType,
  args: {
    shop_ID: { type: GraphQLInt },
    total_sales: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    try {
      await ShopModel.findOneAndUpdate(
        { shop_ID: args.shop_ID },
        {
          $set: {
            total_sales: args.total_sales,
          },
        },
        { returnOriginal: false }
      );
      return args;
    } catch (err) {
      return err;
    }
  },
};

// Update Shop Image
exports.updateShopImage = {
  type: ShopType,
  args: {
    shop_ID: { type: GraphQLInt },
    image: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      await ShopModel.findOneAndUpdate(
        { shop_ID: args.shop_ID },
        {
          $set: {
            image: args.image,
          },
        },
        { returnOriginal: false }
      );
      return args;
    } catch (err) {
      return err;
    }
  },
};
