const { GraphQLObjectType, GraphQLSchema } = require("graphql");

// Import Item Queries and Mutations
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

// Import Shop Queries and Mutations

// Import Order Queries and Mutations
const { getAllOrders, getOrdersByUser } = require("./Queries/order.queries");

// Import User Queries and Mutations
const { getAllUsers, getUser } = require("./Queries/user.queries");

const { updateUser } = require("./Mutations/user.mutations");

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

    // Users
    getAllUsers: getAllUsers,
    getUser: getUser,
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

    // Orders

    // Users
    updateUser: updateUser,
  },
});

// GraphQL Schema
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
