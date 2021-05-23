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

export const GET_FOOD_CATEGORIES = gql`
  query GetFoodCategories {
    getFoodCategories {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const GET_FOOD_COURSES = gql`
  query GetFoodCourses {
    getFoodCourses {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const GET_RECIPE_BY_ID = gql`
  query GetRecipeById($input: GetRecipeByIdInput!) {
    getRecipeById(input: $input) {
      id
      name
      course
      categories
      description
      image
      cookTime
      prepTime
      serves
      steps {
        id
        stepNumber
        stepDescription
      }
      ingredients {
        id
        ingredient
      }
    }
  }
`

export const CREATE_RECIPE = gql`
  mutation CreateRecipe($input: RecipeInput!) {
    createRecipe(input: $input) {
      id
      name
      course
      categories
      description
      ingredients {
        id
        ingredient
      }
      steps {
        id
        stepNumber
        stepDescription
      }
      image
      cookTime
      prepTime
      serves
    }
  }
`

export const CREATE_BBC_RECIPE = gql`
  mutation CreateBbcRecipe($input: CreateBBCRecipeInput!) {
    createRecipeFromBBC(input: $input) {
      id
    }
  }
`
