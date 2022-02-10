const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
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
    age: Int
    femaleCount: Int
    maleCount: Int
    vaccinated: Boolean
    location: Shed
    breed: [Breed]
  }

  type DailyOps {
    _id: ID
    feed: Boolean
    temperature: Number
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
