const { GraphQLInt, GraphQLString, GraphQLFloat } = require("graphql");

// import all Types
const ItemType = require("../TypeDefs/ItemType");

// Mongoose Models
const ItemModel = require("../../models/item.model");

// Create Item
exports.createItem = {
  type: ItemType,
  args: {
    name: { type: GraphQLString },
    shop: { type: GraphQLInt },
    shopname: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    var theRandomNumber = Math.floor(Math.random() * 99999) + 1;

    const item_ID = theRandomNumber;
    const name = args.name;
    const shop = args.shop;
    const shopname = args.shopname;
    const category = args.category;
    const description = args.description;
    const image = args.image;
    const price = args.price;
    const quantity = args.quantity;
    const fav = 0;

    try {
      await ItemModel.create({
        item_ID,
        name,
        shop,
        shopname,
        category,
        description,
        price,
        quantity,
        fav,
        image,
      });

      console.log(`Item created: ${args.name}`);
      return args;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};

// Update Item
exports.updateItem = {
  type: ItemType,
  args: {
    item_ID: { type: GraphQLInt },
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    try {
      await ItemModel.findOneAndUpdate(
        { item_ID: args.item_ID },
        {
          $set: {
            name: args.name,
            image: args.image,
            category: args.category,
            description: args.description,
            price: args.price,
            quantity: args.quantity,
          },
        },
        { returnOriginal: false }
      );

      console.log("Item Updated");
      return args;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};

// Update Item Quantity
exports.updateItemQuantity = {
  type: ItemType,
  args: {
    item_ID: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    const quantity = args.quantity;

    try {
      await ItemModel.findOneAndUpdate(
        { item_ID: args.item_ID },
        {
          $set: {
            quantity: quantity,
          },
        },
        { returnOriginal: false }
      );

      console.log("Item Quantity Updated");
      return args;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};

// Delete Item
exports.deleteItem = {
  type: ItemType,
  args: {
    item_ID: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    try {
      await ItemModel.deleteOne({ item_ID: args.item_ID });

      console.log("Item Deleted");
      return args;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};
