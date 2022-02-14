import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $userType: Boolean!
  ) {
    addUser(
      username: $username
      firstName: $firstName
      lastName: $lastName
      password: $password
      userType: $userType
    ) {
      token
      user {
        username
        firstName
        lastName
        userType
      }
    }
  }
`;

export const ADD_FLOCK = gql`
  mutation addFlock(
    $startDate: String!
    $initialStock: Int!
    $age: Int!
    $femaleCount: Int!
    $maleCount: Int!
    $vaccinated: Boolean
    $shed: ID!
    $breed: ID!
    $status: String!
  ) {
    addFlock(
      startDate: $startDate
      initialStock: $initialStock
      age: $age
      femaleCount: $femaleCount
      maleCount: $maleCount
      vaccinated: $vaccinated
      shed: $shed
      breed: $breed
      status: $status
    ) {
      _id
      startDate
      initialStock
      age
      femaleCount
      maleCount
      vaccinated
      shed {
        _id
      }
      breed {
        _id
      }
      status
    }
  }
`;

export const ADD_SHED = gql`
  mutation addShed($location: String!) {
    addShed(location: $location) {
      _id
      location
    }
  }
`;

export const ADD_BREED = gql`
  mutation addBreed($name: String!) {
    addBreed(name: $name) {
      _id
      name
    }
  }
`;
