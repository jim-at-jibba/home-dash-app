import {gql} from "@apollo/client"

export const GET_LATEST_AIR_QUALITY = gql`
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
