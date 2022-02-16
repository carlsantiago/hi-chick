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
    feed: Boolean
    temperature: Float
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    flocks: [Flock]
    shed: [Shed]
    breed: [Breed]
    location(_id: ID!): Shed
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      username: String!
      password: String!
      userType: Boolean!
    ): Auth

    login(username: String!, password: String!): Auth

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
      status: String!
    ): Flock
    addShed(location: String!): Shed
    addBreed(name: String!): Breed
  }
`;

module.exports = typeDefs;
