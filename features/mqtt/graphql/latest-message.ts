import {gql} from "@apollo/client"

export const GET_LATEST = gql`
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
