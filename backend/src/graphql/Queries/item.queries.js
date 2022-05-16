const { GraphQLInt, GraphQLList } = require("graphql");

// import all Types
const ItemType = require("../TypeDefs/ItemType");

// Mongoose Models
const ItemModel = require("../../models/item.model");

// Get All Items
exports.getAllItems = {
  type: new GraphQLList(ItemType),
  async resolve(parent, args) {
    const allItems = await ItemModel.find();
    console.log(allItems);
    return allItems;
  },
};

// Get Item By item_ID
exports.getItemById = {
  type: ItemType,
  args: { item_ID: { type: GraphQLInt } },
  async resolve(parent, args) {
    console.log(args.item_ID);
    const item = await ItemModel.findOne({ item_ID: args.item_ID });
    console.log("Item Retreived:", item);
    return item;
  },
};

// Get Items by Shop ID
exports.getItemsByShop = {
  type: new GraphQLList(ItemType),
  args: { shop: { type: GraphQLInt } },
  async resolve(parent, args) {
    console.log(args.shop);
    const items = await ItemModel.find({ shop: args.shop });
    return items;
  },
};
