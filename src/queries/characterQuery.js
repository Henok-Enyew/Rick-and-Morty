import gql from "graphql-tag";
export const Character_Query = gql`
  query GetCharacters($id: ID!) {
    character(id: $id) {
      name
      status
      species
      gender
      location {
        name
        id
      }
      image
      episode {
        name
        id
        air_date
        episode
        created
      }
    }
  }
`;
