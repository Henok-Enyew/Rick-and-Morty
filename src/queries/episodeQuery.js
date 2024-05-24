import gql from "graphql-tag";
export const Episode_Query = gql`
  query GetEpisodes($id: ID!) {
    episode(id: $id) {
      name
      air_date
      episode
      created
      characters {
        name
        id
        status
        species
        gender
        image
      }
    }
  }
`;
