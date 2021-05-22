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

export const CREATE_FOOD_COURSE = gql`
  mutation CreateFoodCourse($input: FoodCourseInput!) {
    createFoodCourse(input: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const CREATE_FOOD_CATEGORY = gql`
  mutation CreateFoodCategory($input: FoodCategoryInput!) {
    createFoodCategory(input: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const CREATE_IMAGE_SIGNATURE = gql`
  mutation CreateImageSignature {
    createImageSignature {
      signature
      timestamp
    }
  }
`
