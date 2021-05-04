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

export type LatestAirQualityOutput = {
  __typename?: "LatestAirQualityOutput"
  topic: Scalars["String"]
  message: AirQuality
}

export type LatestMessageInput = {
  topic: Scalars["String"]
}

export type Mqtt = EnviroMessage | SwitchMessage | TemperatureMessage

export type Query = {
  __typename?: "Query"
  me: Scalars["String"]
  getLatestMessage: Mqtt
  getLatestAirQuality: LatestAirQualityOutput
}

export type QueryGetLatestMessageArgs = {
  input: LatestMessageInput
}

export type QueryGetLatestAirQualityArgs = {
  input: LatestMessageInput
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
