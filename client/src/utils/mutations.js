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
