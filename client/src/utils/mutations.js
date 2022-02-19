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
    $userType: Boolean
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
    $startDate: Date
    $initialStock: Int!
    $currentStock: Int!
    $age: Int!
    $femaleCount: Int!
    $maleCount: Int!
    $vaccinated: Boolean
    $shed: ID!
    $breed: ID!
    $status: String
  ) {
    addFlock(
      startDate: $startDate
      initialStock: $initialStock
      currentStock: $currentStock
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

export const ADD_DAILYOPS = gql`
  mutation addDailyOps(
    $flockId: ID!
    $eggsCollected: Int!
    $femaleMorts: Int!
    $maleMorts: Int!
  ) {
    addDailyOps(
      flockId: $flockId
      eggsCollected: $eggsCollected
      femaleMorts: $femaleMorts
      maleMorts: $maleMorts
    ) {
      _id
      flockId {
        _id
      }
      eggsCollected
      femaleMorts
      maleMorts
    }
  }
`;

export const UPDATE_FLOCK = gql`
  mutation updateFlock(
    $_id: ID!
    $femaleCount: Int!
    $maleCount: Int!
    $currentStock: Int!
  ) {
    updateFlock(
      _id: $_id
      femaleCount: $femaleCount
      maleCount: $maleCount
      currentStock: $currentStock
    ) {
      _id
      shed {
        location
      }
      breed {
        name
      }
      femaleCount
      maleCount
    }
  }
`;
