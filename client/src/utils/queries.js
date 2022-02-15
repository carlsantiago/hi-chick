import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_FLOCKS = gql`
  query getFlocks {
    flocks {
      _id
      shed {
        _id
        location
      }
      breed {
        _id
        name
      }
      initialStock
      currentStock
      age
      femaleCount
      maleCount
      vaccinated
      status
    }
  }
`;
