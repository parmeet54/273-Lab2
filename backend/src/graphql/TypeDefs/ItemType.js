const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
} = require("graphql");

const items = [
  {
    item_ID: 1,
    shop: 333,
    name: "Item 1",
    category: "category 1",
    description: "description 1",
    price: 100.13,
    quantity: 22,
    fav: "1",
    shopname: "Shop 1",
    image: "image 1",
  },
  {
    item_ID: 2,
    shop: 333,
    name: "Item 2",
    category: "category 2",
    description: "description 2",
    price: 200.13,
    quantity: 4444,
    fav: "0",
    shopname: "Shop 1",
    image: "image 2",
  },
];

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

module.exports = { ItemType, items };
