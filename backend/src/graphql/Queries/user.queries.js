const { GraphQLList, GraphQLString } = require("graphql");

// import User Type
const UserType = require("../TypeDefs/UserType");

// User Mongoose Model
const UserModel = require("../../models/user.model");

// Get All Users
exports.getAllUsers = {
  type: new GraphQLList(UserType),
  async resolve(parent, args) {
    const users = await UserModel.find();
    return users;
  },
};

// Get User by Username
exports.getUser = {
  type: UserType,
  args: { username: { type: GraphQLString } },
  async resolve(parent, args) {
    const user = await UserModel.findOne({ username: args.username });
    return user;
  },
};
