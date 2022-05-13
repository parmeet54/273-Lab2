const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

const items = [
  {
    item_ID: 1,
    name: "Item 1",
  },
  {
    item_ID: 2,
    name: "Item 2",
  },
];

const ItemType = new GraphQLObjectType({
  name: "item",
  fields: () => ({
    item_ID: { type: GraphQLInt },
    name: { type: GraphQLString },
  }),
});

module.exports = { ItemType, items };
