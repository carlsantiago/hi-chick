const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    password: String
    userType: Boolean
  }

  type Shed {
    _id: ID
    location: String
  }

  type Breed {
    _id: ID
    name: String
  }

  type Flock {
    _id: ID
    startDate: Date
    initialStock: Int
    currentStock: Int
    age: Int
    femaleCount: Int
    maleCount: Int
    vaccinated: Boolean
    shed: Shed
    breed: Breed
    status: String
  }

  type DailyOps {
    _id: ID
    date: Date
    flockId: Flock
    femaleMorts: Int
    maleMorts: Int
    eggsCollected: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    flocks: [Flock]
    flock(_id: ID!): Flock
    shed: [Shed]
    breed: [Breed]
    location(_id: ID!): Shed
    dailyOps: [DailyOps]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      username: String!
      password: String!
      userType: Boolean
    ): Auth

    login(username: String!, password: String!): Auth

    addDailyOps(
      date: Date
      flockId: ID
      femaleMorts: Int
      maleMorts: Int
      eggsCollected: Int
    ): DailyOps

    addFlock(
      startDate: Date
      initialStock: Int!
      currentStock: Int!
      age: Int!
      femaleCount: Int!
      maleCount: Int!
      vaccinated: Boolean
      shed: ID!
      breed: ID!
      status: String
    ): Flock

    updateFlock(
      _id: ID!
      maleCount: Int!
      femaleCount: Int!
      currentStock: Int!
    ): Flock
  }
`;

module.exports = typeDefs;
