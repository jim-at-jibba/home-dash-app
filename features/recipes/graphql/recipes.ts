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

export const GET_RECIPE_STEPS = gql`
  query GetRecipeSteps($input: GetRecipeByIdInput!) {
    getRecipeStepsByRecipeId(input: $input) {
      id
      stepNumber
      stepDescription
    }
  }
`
