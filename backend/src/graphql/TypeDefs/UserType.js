const { GraphQLObjectType, GraphQLString } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    username: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    about: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    dob: { type: GraphQLString },
    phone_no: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

module.exports = UserType;
