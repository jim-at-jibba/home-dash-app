import {gql} from "@apollo/client"

export const GET_RECIPES = gql`
  query GetRecipes {
    getRecipes {
      id
      name
      description
      createdAt
      image
    }
  }
`
