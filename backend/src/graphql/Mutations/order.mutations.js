const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLInputObjectType,
} = require("graphql");

// Import Order Type
const OrderType = require("../TypeDefs/OrderType");
// Import Order Model
const OrderModel = require("../../models/order.model");

// Child Type for Ordered Items
const OrderedItemType = new GraphQLInputObjectType({
  name: "ordered_item",
  fields: () => ({
    item_ID: { type: GraphQLInt },
    shop: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
    stock: { type: GraphQLInt },
    totalPrice: { type: GraphQLFloat },
    image: { type: GraphQLString },
  }),
});

exports.createOrder = {
  type: OrderType,
  args: {
    order_ID: { type: GraphQLInt },
    username: { type: GraphQLString },
    items: { type: new GraphQLList(OrderedItemType) },
    date_purc: { type: GraphQLString },
    total: { type: GraphQLFloat },
  },
  async resolve(parent, args) {
    const order_ID = args.order_ID;
    const username = args.username;
    const items = args.items;
    const date_purc = args.date_purc;
    const total = args.total;

    try {
      await OrderModel.create({ order_ID, username, items, date_purc, total });
      return args;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};
