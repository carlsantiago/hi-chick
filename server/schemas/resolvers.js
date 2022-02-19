const { AuthenticationError } = require("apollo-server-express");
const { User, Shed, Breed, Flock, DailyOps } = require("../models");
const { signToken } = require("../utils/auth");
const { Kind, GraphQLScalarType } = require("graphql");

const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value); // ast value is always in string format
      }
      return null;
    },
  }),

  Query: {
    users: async () => {
      return User.find().populate("thoughts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("thoughts");
    },
    flocks: async () => {
      return Flock.find().populate("shed").populate("breed");
    },
    flock: async (parent, _id) => {
      return await Flock.findById(_id).populate("shed").populate("breed");
    },
    shed: async () => {
      return Shed.find();
    },
    breed: async () => {
      return Breed.find();
    },
    location: async (parent, _id) => {
      return await Shed.findById(_id);
    },
    dailyOps: async () => {
      return await DailyOps.find();
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

    addFlock: async (
      parent,
      {
        startDate,
        initialStock,
        currentStock,
        age,
        femaleCount,
        maleCount,
        vaccinated,
        shed,
        breed,
        status,
      }
    ) => {
      return await Flock.create({
        startDate,
        initialStock,
        currentStock,
        age,
        femaleCount,
        maleCount,
        vaccinated,
        shed,
        breed,
        status,
      });
    },

    addDailyOps: async (
      parent,
      { date, flockId, femaleMorts, maleMorts, eggsCollected }
    ) => {
      return await DailyOps.create({
        date,
        flockId,
        femaleMorts,
        maleMorts,
        eggsCollected,
      });
    },

    updateFlock: async (
      parent,
      { _id, femaleCount, maleCount, currentStock }
    ) => {
      return await Flock.findOneAndUpdate(
        { _id },
        { femaleCount, maleCount, currentStock },
        {
          new: true,
        }
      )
        .populate("shed")
        .populate("breed");
    },

    addLocation: async (parent, { location }) => {
      return await Shed.create({ location });
    },
    addBreed: async (parent, { name }) => {
      return await Breed.create({ name });
    },
  },
};

module.exports = resolvers;
