import {gql} from "@apollo/client"

export const GET_LAST_X_DAYS_TEMP_HUMIDITY = gql`
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
