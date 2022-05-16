const { GraphQLList, GraphQLString } = require("graphql");

// import Order Type
const OrderType = require("../TypeDefs/OrderType");

// Order Mongoose Model
const OrderModel = require("../../models/order.model");

// Get All Orders
exports.getAllOrders = {
  type: new GraphQLList(OrderType),
  async resolve(parent, args) {
    const orders = await OrderModel.find();
    return orders;
  },
};

// Get Orders for User
exports.getOrdersByUser = {
  type: new GraphQLList(OrderType),
  args: { username: { type: GraphQLString } },
  async resolve(parent, args) {
    const orders = await OrderModel.find({ username: args.username });
    return orders;
  },
};
