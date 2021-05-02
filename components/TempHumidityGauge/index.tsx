import {LinearProgress, makeStyles, Theme} from "@material-ui/core"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import React, {FunctionComponent} from "react"
import GaugeChart from "react-gauge-chart"
import {GetLatestMessageByTopicQuery, useGetLatestMessageByTopicQuery} from "src/generated/graphql"
import {Alert} from "@material-ui/lab"

interface Props {
  title: string
}
const TempHumidityGauge: FunctionComponent<Props> = ({title}) => {
  const classes = useStyles()

  const {data, loading, error} = useGetLatestMessageByTopicQuery({
    variables: {input: {topic: "enviro"}},
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
    <Paper className={classes.paperRoot}>
      {data?.getLatestMessage == null || loading ? (
        <Box width="100%">
          <LinearProgress />
        </Box>
      ) : (
        <>
          <Box pb={2}>
            <Typography variant="h4">{title}</Typography>
          </Box>
          <Box className={classes.guagesWrapper}>
            <Box className={classes.guageContainer}>
              <GaugeChart
                id="gauge-chart2"
                nrOfLevels={20}
                percent={result != null ? result.temperature : undefined}
                textColor="#000"
                formatTextValue={(temp) => `${temp}℃`}
              />
            </Box>
            <Box className={classes.guageContainer}>
              <GaugeChart
                id="gauge-chart3"
                nrOfLevels={20}
                percent={result != null ? result.humidity : undefined}
                textColor="#000"
              />
            </Box>
          </Box>
        </>
      )}
    </Paper>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  paperRoot: {
    width: "100%",
    maxWidth: 600,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
    alignItems: "center",
    minHeight: "60px",
  },
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
