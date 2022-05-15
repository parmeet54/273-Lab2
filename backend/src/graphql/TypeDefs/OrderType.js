const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} = require("graphql");

// Child Type for Order Items
const OrderedItemType = new GraphQLObjectType({
  name: "order_item",
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

const OrderType = new GraphQLObjectType({
  name: "order",
  fields: () => ({
    order_ID: { type: GraphQLInt },
    username: { type: GraphQLString },
    items: {
      type: new GraphQLList(OrderedItemType),
      async resolve(parent, args) {
        return parent.items;
      },
    },
    date_purc: { type: GraphQLString },
    total: { type: GraphQLFloat },
  }),
});

module.exports = OrderType;
