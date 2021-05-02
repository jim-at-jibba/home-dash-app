import {gql} from "@apollo/client"

export const GET_LATEST = gql`
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
