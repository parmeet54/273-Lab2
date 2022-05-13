const { ItemType, items } = require("./TypeDefs/ItemType");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const mongoose = require("mongoose");
const ItemModel = require("../models/item.model");

// All The query requests
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllItems: {
      type: new GraphQLList(ItemType),
      async resolve(parent, args) {
        return await ItemModel.find();
        // return allItems;
      },
    },
  },
});

// Create. Update, and Delete requests
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createItem: {
      type: ItemType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(oarent, args) {
        var theRandomNumber = Math.floor(Math.random() * 99999) + 1;
        items.push({ item_ID: theRandomNumber, name: args.name });
        return args;
      },
    },
  },
});

// GraphQL Schema
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
