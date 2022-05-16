const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
} = require("graphql");

const ItemType = new GraphQLObjectType({
  name: "item",
  fields: () => ({
    item_ID: { type: GraphQLInt },
    shop: { type: GraphQLInt },
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
    fav: { type: GraphQLString },
    shopname: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

module.exports = ItemType;
