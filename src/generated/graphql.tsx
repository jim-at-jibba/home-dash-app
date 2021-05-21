import {gql} from "@apollo/client"
import * as Apollo from "@apollo/client"
export type Maybe<T> = T | null
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>}
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type AirQuality = {
  __typename?: "AirQuality"
  pm1: Scalars["Float"]
  pm25: Scalars["Float"]
  pm10: Scalars["Float"]
}

export type Enviro = {
  __typename?: "Enviro"
  temperature: Scalars["Float"]
  pressure: Scalars["Float"]
  humidity: Scalars["Float"]
  oxidised?: Maybe<Scalars["Float"]>
  reduced?: Maybe<Scalars["Float"]>
  nh3?: Maybe<Scalars["Float"]>
  lux?: Maybe<Scalars["Float"]>
  pm1?: Maybe<Scalars["Float"]>
  pm25?: Maybe<Scalars["Float"]>
  pm10?: Maybe<Scalars["Float"]>
  serial?: Maybe<Scalars["String"]>
}

export type EnviroMessage = {
  __typename?: "EnviroMessage"
  id: Scalars["ID"]
  topic: Scalars["String"]
  message: Enviro
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type GetRecipeByIdInput = {
  id: Scalars["String"]
}

export type IngredientsInput = {
  ingredient: Scalars["String"]
}

export type LastXDaysMessageInput = {
  topic: Scalars["String"]
  numberDays: Scalars["Float"]
}

export type LatestAirQualityOutput = {
  __typename?: "LatestAirQualityOutput"
  topic: Scalars["String"]
  message: AirQuality
}

export type LatestMessageInput = {
  topic: Scalars["String"]
}

export type Mqtt = EnviroMessage | SwitchMessage | TemperatureMessage

export type Mutation = {
  __typename?: "Mutation"
  createRecipe: RecipeFull
}

export type MutationCreateRecipeArgs = {
  input: RecipeInput
}

export type Query = {
  __typename?: "Query"
  me: Scalars["String"]
  getLatestMessage: Mqtt
  getLatestAirQuality: LatestAirQualityOutput
  getLastXDaysMessage: Array<Mqtt>
  getRecipeById: RecipeFull
  getRecipes: Array<RecipeDetails>
  getRecipeStepsByRecipeId: Array<RecipeSteps>
}

export type QueryGetLatestMessageArgs = {
  input: LatestMessageInput
}

export type QueryGetLatestAirQualityArgs = {
  input: LatestMessageInput
}

export type QueryGetLastXDaysMessageArgs = {
  input: LastXDaysMessageInput
}

export type QueryGetRecipeByIdArgs = {
  input: GetRecipeByIdInput
}

export type QueryGetRecipeStepsByRecipeIdArgs = {
  input: GetRecipeByIdInput
}

export type RecipeDetails = {
  __typename?: "RecipeDetails"
  id: Scalars["ID"]
  name: Scalars["String"]
  course: Scalars["String"]
  category: Scalars["String"]
  description: Scalars["String"]
  image: Scalars["String"]
  cookTime: Scalars["Float"]
  prepTime: Scalars["Float"]
  serves: Scalars["Float"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type RecipeFull = {
  __typename?: "RecipeFull"
  id: Scalars["ID"]
  name: Scalars["String"]
  course: Scalars["String"]
  category: Scalars["String"]
  description: Scalars["String"]
  ingredients: Array<RecipeIngredients>
  steps: Array<RecipeSteps>
  image: Scalars["String"]
  cookTime: Scalars["Float"]
  prepTime: Scalars["Float"]
  serves: Scalars["Float"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type RecipeIngredients = {
  __typename?: "RecipeIngredients"
  id: Scalars["ID"]
  recipeId: Scalars["String"]
  ingredient: Scalars["String"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type RecipeInput = {
  name: Scalars["String"]
  courseId: Scalars["String"]
  categoryId: Scalars["String"]
  description: Scalars["String"]
  ingredients: Array<IngredientsInput>
  steps: Array<StepsInput>
  recipeImage: Scalars["String"]
  cookTime: Scalars["Float"]
  prepTime: Scalars["Float"]
  serves: Scalars["Float"]
}

export type RecipeSteps = {
  __typename?: "RecipeSteps"
  id: Scalars["ID"]
  recipeId: Scalars["String"]
  stepNumber: Scalars["Float"]
  stepDescription: Scalars["String"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type StepsInput = {
  stepNumber: Scalars["Float"]
  stepDescription: Scalars["String"]
}

export type Switch = {
  __typename?: "Switch"
  state: Scalars["Boolean"]
}

export type SwitchMessage = {
  __typename?: "SwitchMessage"
  id: Scalars["ID"]
  topic: Scalars["String"]
  message: Switch
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type Temperature = {
  __typename?: "Temperature"
  temperature: Scalars["Float"]
  humidity: Scalars["Float"]
}

export type TemperatureMessage = {
  __typename?: "TemperatureMessage"
  id: Scalars["ID"]
  topic: Scalars["String"]
  message: Temperature
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type GetLatestTempHumidityQueryVariables = Exact<{
  input: LatestMessageInput
}>

export type GetLatestTempHumidityQuery = {__typename?: "Query"} & {
  getLatestMessage:
    | ({__typename?: "EnviroMessage"} & Pick<EnviroMessage, "id" | "topic"> & {
          message: {__typename?: "Enviro"} & Pick<Enviro, "temperature" | "humidity">
        })
    | {__typename?: "SwitchMessage"}
    | {__typename?: "TemperatureMessage"}
}

export type GetLastXDaysTempHumidityQueryVariables = Exact<{
  input: LastXDaysMessageInput
}>

export type GetLastXDaysTempHumidityQuery = {__typename?: "Query"} & {
  getLastXDaysMessage: Array<
    | ({__typename?: "EnviroMessage"} & Pick<EnviroMessage, "topic" | "id" | "createdAt"> & {
          message: {__typename?: "Enviro"} & Pick<Enviro, "temperature" | "humidity">
        })
    | {__typename?: "SwitchMessage"}
    | {__typename?: "TemperatureMessage"}
  >
}

export type GetLatestAirQualityQueryVariables = Exact<{
  input: LatestMessageInput
}>

export type GetLatestAirQualityQuery = {__typename?: "Query"} & {
  getLatestAirQuality: {__typename?: "LatestAirQualityOutput"} & Pick<
    LatestAirQualityOutput,
    "topic"
  > & {message: {__typename?: "AirQuality"} & Pick<AirQuality, "pm1" | "pm25" | "pm10">}
}

export type GetLatestMessageByTopicQueryVariables = Exact<{
  input: LatestMessageInput
}>

export type GetLatestMessageByTopicQuery = {__typename?: "Query"} & {
  getLatestMessage:
    | ({__typename?: "EnviroMessage"} & Pick<EnviroMessage, "id"> & {
          message: {__typename?: "Enviro"} & Pick<Enviro, "temperature" | "humidity">
        })
    | ({__typename?: "SwitchMessage"} & Pick<SwitchMessage, "id"> & {
          message: {__typename?: "Switch"} & Pick<Switch, "state">
        })
    | ({__typename?: "TemperatureMessage"} & Pick<TemperatureMessage, "id"> & {
          message: {__typename?: "Temperature"} & Pick<Temperature, "temperature" | "humidity">
        })
}

export type GetRecipesQueryVariables = Exact<{[key: string]: never}>

export type GetRecipesQuery = {__typename?: "Query"} & {
  getRecipes: Array<
    {__typename?: "RecipeDetails"} & Pick<
      RecipeDetails,
      "id" | "name" | "description" | "createdAt" | "image"
    >
  >
}

export type GetRecipeStepsQueryVariables = Exact<{
  input: GetRecipeByIdInput
}>

export type GetRecipeStepsQuery = {__typename?: "Query"} & {
  getRecipeStepsByRecipeId: Array<
    {__typename?: "RecipeSteps"} & Pick<RecipeSteps, "id" | "stepNumber" | "stepDescription">
  >
}

export const GetLatestTempHumidityDocument = gql`
  query GetLatestTempHumidity($input: LatestMessageInput!) {
    getLatestMessage(input: $input) {
      ... on EnviroMessage {
        id
        topic
        message {
          temperature
          humidity
        }
      }
    }
  }
`

/**
 * __useGetLatestTempHumidityQuery__
 *
 * To run a query within a React component, call `useGetLatestTempHumidityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestTempHumidityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestTempHumidityQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetLatestTempHumidityQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetLatestTempHumidityQuery,
    GetLatestTempHumidityQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetLatestTempHumidityQuery, GetLatestTempHumidityQueryVariables>(
    GetLatestTempHumidityDocument,
    options,
  )
}
export function useGetLatestTempHumidityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLatestTempHumidityQuery,
    GetLatestTempHumidityQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetLatestTempHumidityQuery, GetLatestTempHumidityQueryVariables>(
    GetLatestTempHumidityDocument,
    options,
  )
}
export type GetLatestTempHumidityQueryHookResult = ReturnType<typeof useGetLatestTempHumidityQuery>
export type GetLatestTempHumidityLazyQueryHookResult = ReturnType<
  typeof useGetLatestTempHumidityLazyQuery
>
export type GetLatestTempHumidityQueryResult = Apollo.QueryResult<
  GetLatestTempHumidityQuery,
  GetLatestTempHumidityQueryVariables
>
export const GetLastXDaysTempHumidityDocument = gql`
  query GetLastXDaysTempHumidity($input: LastXDaysMessageInput!) {
    getLastXDaysMessage(input: $input) {
      ... on EnviroMessage {
        topic
        id
        message {
          temperature
          humidity
        }
        createdAt
      }
    }
  }
`

/**
 * __useGetLastXDaysTempHumidityQuery__
 *
 * To run a query within a React component, call `useGetLastXDaysTempHumidityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastXDaysTempHumidityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastXDaysTempHumidityQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetLastXDaysTempHumidityQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetLastXDaysTempHumidityQuery,
    GetLastXDaysTempHumidityQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetLastXDaysTempHumidityQuery, GetLastXDaysTempHumidityQueryVariables>(
    GetLastXDaysTempHumidityDocument,
    options,
  )
}
export function useGetLastXDaysTempHumidityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLastXDaysTempHumidityQuery,
    GetLastXDaysTempHumidityQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetLastXDaysTempHumidityQuery, GetLastXDaysTempHumidityQueryVariables>(
    GetLastXDaysTempHumidityDocument,
    options,
  )
}
export type GetLastXDaysTempHumidityQueryHookResult = ReturnType<
  typeof useGetLastXDaysTempHumidityQuery
>
export type GetLastXDaysTempHumidityLazyQueryHookResult = ReturnType<
  typeof useGetLastXDaysTempHumidityLazyQuery
>
export type GetLastXDaysTempHumidityQueryResult = Apollo.QueryResult<
  GetLastXDaysTempHumidityQuery,
  GetLastXDaysTempHumidityQueryVariables
>
export const GetLatestAirQualityDocument = gql`
  query GetLatestAirQuality($input: LatestMessageInput!) {
    getLatestAirQuality(input: $input) {
      topic
      message {
        pm1
        pm25
        pm10
      }
    }
  }
`

/**
 * __useGetLatestAirQualityQuery__
 *
 * To run a query within a React component, call `useGetLatestAirQualityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestAirQualityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestAirQualityQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetLatestAirQualityQuery(
  baseOptions: Apollo.QueryHookOptions<GetLatestAirQualityQuery, GetLatestAirQualityQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetLatestAirQualityQuery, GetLatestAirQualityQueryVariables>(
    GetLatestAirQualityDocument,
    options,
  )
}
export function useGetLatestAirQualityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLatestAirQualityQuery,
    GetLatestAirQualityQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetLatestAirQualityQuery, GetLatestAirQualityQueryVariables>(
    GetLatestAirQualityDocument,
    options,
  )
}
export type GetLatestAirQualityQueryHookResult = ReturnType<typeof useGetLatestAirQualityQuery>
export type GetLatestAirQualityLazyQueryHookResult = ReturnType<
  typeof useGetLatestAirQualityLazyQuery
>
export type GetLatestAirQualityQueryResult = Apollo.QueryResult<
  GetLatestAirQualityQuery,
  GetLatestAirQualityQueryVariables
>
export const GetLatestMessageByTopicDocument = gql`
  query GetLatestMessageByTopic($input: LatestMessageInput!) {
    getLatestMessage(input: $input) {
      ... on SwitchMessage {
        id
        message {
          state
        }
      }
      ... on TemperatureMessage {
        id
        message {
          temperature
          humidity
        }
      }
      ... on EnviroMessage {
        id
        message {
          temperature
          humidity
        }
      }
    }
  }
`

/**
 * __useGetLatestMessageByTopicQuery__
 *
 * To run a query within a React component, call `useGetLatestMessageByTopicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestMessageByTopicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestMessageByTopicQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetLatestMessageByTopicQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetLatestMessageByTopicQuery,
    GetLatestMessageByTopicQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetLatestMessageByTopicQuery, GetLatestMessageByTopicQueryVariables>(
    GetLatestMessageByTopicDocument,
    options,
  )
}
export function useGetLatestMessageByTopicLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLatestMessageByTopicQuery,
    GetLatestMessageByTopicQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetLatestMessageByTopicQuery, GetLatestMessageByTopicQueryVariables>(
    GetLatestMessageByTopicDocument,
    options,
  )
}
export type GetLatestMessageByTopicQueryHookResult = ReturnType<
  typeof useGetLatestMessageByTopicQuery
>
export type GetLatestMessageByTopicLazyQueryHookResult = ReturnType<
  typeof useGetLatestMessageByTopicLazyQuery
>
export type GetLatestMessageByTopicQueryResult = Apollo.QueryResult<
  GetLatestMessageByTopicQuery,
  GetLatestMessageByTopicQueryVariables
>
export const GetRecipesDocument = gql`
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

/**
 * __useGetRecipesQuery__
 *
 * To run a query within a React component, call `useGetRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecipesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options)
}
export function useGetRecipesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options)
}
export type GetRecipesQueryHookResult = ReturnType<typeof useGetRecipesQuery>
export type GetRecipesLazyQueryHookResult = ReturnType<typeof useGetRecipesLazyQuery>
export type GetRecipesQueryResult = Apollo.QueryResult<GetRecipesQuery, GetRecipesQueryVariables>
export const GetRecipeStepsDocument = gql`
  query GetRecipeSteps($input: GetRecipeByIdInput!) {
    getRecipeStepsByRecipeId(input: $input) {
      id
      stepNumber
      stepDescription
    }
  }
`

/**
 * __useGetRecipeStepsQuery__
 *
 * To run a query within a React component, call `useGetRecipeStepsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipeStepsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipeStepsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetRecipeStepsQuery(
  baseOptions: Apollo.QueryHookOptions<GetRecipeStepsQuery, GetRecipeStepsQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetRecipeStepsQuery, GetRecipeStepsQueryVariables>(
    GetRecipeStepsDocument,
    options,
  )
}
export function useGetRecipeStepsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetRecipeStepsQuery, GetRecipeStepsQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<GetRecipeStepsQuery, GetRecipeStepsQueryVariables>(
    GetRecipeStepsDocument,
    options,
  )
}
export type GetRecipeStepsQueryHookResult = ReturnType<typeof useGetRecipeStepsQuery>
export type GetRecipeStepsLazyQueryHookResult = ReturnType<typeof useGetRecipeStepsLazyQuery>
export type GetRecipeStepsQueryResult = Apollo.QueryResult<
  GetRecipeStepsQuery,
  GetRecipeStepsQueryVariables
>

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    Mqtt: ["EnviroMessage", "SwitchMessage", "TemperatureMessage"],
  },
}
export default result
