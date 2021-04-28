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

export type EnviroMessage = {
  __typename?: "EnviroMessage"
  temperature: Scalars["Float"]
  pressure: Scalars["Float"]
  humidity: Scalars["Float"]
  oxidised?: Maybe<Scalars["Float"]>
  reduced?: Maybe<Scalars["Float"]>
  nh3?: Maybe<Scalars["Float"]>
  lux?: Maybe<Scalars["Float"]>
  serial?: Maybe<Scalars["String"]>
}

export type LatestMessageInput = {
  topic: Scalars["String"]
}

export type MqttMessage = {
  __typename?: "MqttMessage"
  id: Scalars["ID"]
  topic: Scalars["String"]
  message: EnviroMessage
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type Query = {
  __typename?: "Query"
  me: Scalars["String"]
  getLatestMessage: MqttMessage
}

export type QueryGetLatestMessageArgs = {
  input: LatestMessageInput
}

export type GetLatestMessageByTopicQueryVariables = Exact<{
  input: LatestMessageInput
}>

export type GetLatestMessageByTopicQuery = {__typename?: "Query"} & {
  getLatestMessage: {__typename?: "MqttMessage"} & Pick<MqttMessage, "id" | "topic"> & {
      message: {__typename?: "EnviroMessage"} & Pick<EnviroMessage, "temperature">
    }
}

export const GetLatestMessageByTopicDocument = gql`
  query GetLatestMessageByTopic($input: LatestMessageInput!) {
    getLatestMessage(input: $input) {
      id
      topic
      message {
        temperature
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
  possibleTypes: {},
}
export default result
