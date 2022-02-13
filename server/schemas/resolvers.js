const { AuthenticationError } = require("apollo-server-express");
const { User, Shed, Breed, Flock } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("thoughts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("thoughts");
    },
    flocks: async () => {
      return Flock.find().populate("location");
    },
  },

  Mutation: {
    addUser: async (
      parent,
      { username, firstName, lastName, password, userType }
    ) => {
      const user = await User.create({
        username,
        firstName,
        lastName,
        password,
        userType,
      });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("No user found with this username");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addShed: async (parent, { location }) => {
      return await Shed.create({ location });
    },
    addBreed: async (parent, { name }) => {
      return await Breed.create({ name });
    },

    addFlock: async (
      parent,
      {
        startDate,
        initialStock,
        age,
        femaleCount,
        maleCount,
        vaccinated,
        location,
        breed,
        status,
      }
    ) => {
      return await Flock.create({
        startDate,
        initialStock,
        age,
        femaleCount,
        maleCount,
        vaccinated,
        location,
        breed,
        status,
      });
    },
  },
};

module.exports = resolvers;
