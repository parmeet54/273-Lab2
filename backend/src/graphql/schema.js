const { GraphQLObjectType, GraphQLSchema } = require("graphql");

// import Item Queries and Mutations
const {
  getAllItems,
  getItemById,
  getItemsByShop,
} = require("./Queries/item.queries");

const {
  createItem,
  updateItem,
  updateItemQuantity,
  deleteItem,
} = require("./Mutations/item.mutations");

// import Shop Queries and Mutations

// import Order Queries and Mutations
const { getAllOrders, getOrdersByUser } = require("./Queries/order.queries");

// All The query requests
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Items
    getAllItems: getAllItems,
    getItemById: getItemById,
    getItemsByShop: getItemsByShop,

    // Shops

    // Orders
    getAllOrders: getAllOrders,
    getOrdersByUser: getOrdersByUser,
  },
});

// Create. Update, and Delete requests
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Items
    createItem: createItem,
    updateItem: updateItem,
    updateItemQuantity: updateItemQuantity,
    deleteItem: deleteItem,

    // Shops
  },
});

// GraphQL Schema
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
