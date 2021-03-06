const { GraphQLString } = require("graphql");

// import all Types
const UserType = require("../TypeDefs/UserType");

// Mongoose Models
const UserModel = require("../../models/user.model");

// Create User
exports.createUser = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    image: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const name = args.name;
    const username = args.username;
    const email = args.email;
    const password = args.password;
    const image = args.image;

    try {
      await UserModel.create({
        name,
        username,
        email,
        password,
        image,
      });
      return args;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};

// Update User
exports.updateUser = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    name: { type: GraphQLString },
    about: { type: GraphQLString },
    city: { type: GraphQLString },
    dob: { type: GraphQLString },
    address: { type: GraphQLString },
    country: { type: GraphQLString },
    phone_no: { type: GraphQLString },
    image: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      await UserModel.findOneAndUpdate(
        { username: args.username },
        {
          $set: {
            name: args.name,
            about: args.about,
            city: args.city,
            dob: args.dob,
            address: args.address,
            country: args.country,
            phone_no: args.phone_no,
            image: args.image,
          },
        },
        { returnOriginal: false }
      );

      console.log("User Updated");
      return args;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};
