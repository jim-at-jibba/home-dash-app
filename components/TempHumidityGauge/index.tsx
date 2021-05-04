import {makeStyles} from "@material-ui/core"
import Box from "@material-ui/core/Box"
import React, {FunctionComponent} from "react"
import GaugeChart from "react-gauge-chart"
import {GetLatestMessageByTopicQuery, useGetLatestMessageByTopicQuery} from "src/generated/graphql"
import {Alert} from "@material-ui/lab"
import DashboardCard from "../Paper"

interface Props {
  title: string
}
const TempHumidityGauge: FunctionComponent<Props> = ({title}) => {
  const classes = useStyles()

  const {data, loading, error} = useGetLatestMessageByTopicQuery({
    variables: {input: {topic: "living-room/enviro"}},
  })

  console.log(data, loading, error)

  if (error) {
    return <Alert severity="error">Unable to retrieve the office temp</Alert>
  }

  function resolveMessage(latestMessage?: GetLatestMessageByTopicQuery["getLatestMessage"]) {
    if (latestMessage == null) {
      return null
    }

    switch (latestMessage.__typename) {
      case "EnviroMessage":
        return {
          temperature: latestMessage.message.temperature / 100,
          humidity: latestMessage.message.humidity / 100,
        }
      case "TemperatureMessage":
        return {
          temperature: latestMessage.message.temperature / 100,
          humidity: latestMessage.message.humidity / 100,
        }
      case "SwitchMessage":
        return {
          status: latestMessage.message.state,
        }
      default:
        null
    }
  }

  const result = resolveMessage(data?.getLatestMessage)

  return (
    <DashboardCard title={title} loading={loading} error={error}>
      <Box className={classes.guagesWrapper}>
        <Box className={classes.guageContainer}>
          <GaugeChart
            id="temp-gauge"
            nrOfLevels={20}
            percent={result != null ? result.temperature : undefined}
            textColor="#e4f0fb"
            formatTextValue={(temp) => `${temp}℃`}
          />
        </Box>
        <Box className={classes.guageContainer}>
          <GaugeChart
            id="humidity-gauge"
            nrOfLevels={20}
            percent={result != null ? result.humidity : undefined}
            textColor="#e4f0fb"
          />
        </Box>
      </Box>
    </DashboardCard>
  )
}

const useStyles = makeStyles(() => ({
  guagesWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  guageContainer: {
    display: "flex",
    flex: 1,
    maxWidth: 300,
  },
}))

export default TempHumidityGauge
