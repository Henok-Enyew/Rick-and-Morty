import gql from "graphql-tag";

export const Location_Query = gql`
  query GetLocation($id: ID!) {
    location(id: $id) {
      name
      id
      dimension
      type
      created
      residents {
        id
        image
        name
        status
        gender
        species
      }
    }
  }
`;
