import {gql} from "@apollo/client"

export const GET_LAST_WEEKS_TEMP_HUMIDITY = gql`
  query GetLastWeeksTempHumidity($input: LatestMessageInput!) {
    getLastWeeksMessage(input: $input) {
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
