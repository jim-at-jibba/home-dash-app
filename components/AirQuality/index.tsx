import {makeStyles} from "@material-ui/core"
import {FunctionComponent} from "react"
import DashboardCard from "../Paper"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import GaugeChart from "react-gauge-chart"
import {useGetLatestAirQualityQuery} from "src/generated/graphql"

interface Props {
  title: string
}
const TempHumidityGauge: FunctionComponent<Props> = ({title}) => {
  const classes = useStyles()
  const {data, loading, error} = useGetLatestAirQualityQuery({
    variables: {input: {topic: "living-room/enviro"}},
  })

  return (
    <DashboardCard title={title} loading={loading} error={!!error}>
      <Box className={classes.guagesWrapper}>
        <Box className={classes.guageContainer}>
          <GaugeChart
            id="temp-gauge"
            nrOfLevels={20}
            percent={data != null ? data.getLatestAirQuality.message.pm25 / 100 : undefined}
            textColor="#e4f0fb"
            formatTextValue={(temp) => `${temp}µg/m3`}
          />
          <Typography variant="h6">
            PM<sub>2.5</sub>
          </Typography>
        </Box>
        <Box className={classes.guageContainer}>
          <GaugeChart
            id="temp-gauge"
            nrOfLevels={20}
            percent={data != null ? data.getLatestAirQuality.message.pm10 / 100 : undefined}
            textColor="#e4f0fb"
            formatTextValue={(temp) => `${temp}µg/m3`}
          />
          <Typography variant="h6">
            PM<sub>10</sub>
          </Typography>
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
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
}))

export default TempHumidityGauge
