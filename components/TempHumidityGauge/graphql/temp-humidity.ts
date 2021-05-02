import {gql} from "@apollo/client"

export const GET_LATEST_TEMP = gql`
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
