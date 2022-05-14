const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

const ShopType = new GraphQLObjectType({
  name: "shop",
  fields: () => ({
    shop_ID: { type: GraphQLInt },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    total_sales: { type: GraphQLInt },
    image: { type: GraphQLString },
  }),
});

module.exports = ShopType;
