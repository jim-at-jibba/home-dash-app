import {makeStyles} from "@material-ui/core"
import React, {FunctionComponent} from "react"
import {Alert} from "@material-ui/lab"
import DashboardCard from "../Paper"
import {useGetLastXDaysTempHumidityQuery} from "src/generated/graphql"

interface Props {
  title: string
}
const TempHumidityGraph: FunctionComponent<Props> = ({title}) => {
  const classes = useStyles()
  console.log(classes)

  const {data, loading, error} = useGetLastXDaysTempHumidityQuery({
    variables: {input: {topic: "living-room/enviro", numberDays: 3}},
  })

  console.log(data, loading, error)

  if (error) {
    console.log(error)
    return <Alert severity="error">Unable to retrieve the office temp</Alert>
  }

  // function resolveMessage(latestMessage?: GetLatestMessageByTopicQuery["getLatestMessage"]) {
  //   if (latestMessage == null) {
  //     return null
  //   }

  //   switch (latestMessage.__typename) {
  //     case "EnviroMessage":
  //       return {
  //         temperature: latestMessage.message.temperature / 100,
  //         humidity: latestMessage.message.humidity / 100,
  //       }
  //     case "TemperatureMessage":
  //       return {
  //         temperature: latestMessage.message.temperature / 100,
  //         humidity: latestMessage.message.humidity / 100,
  //       }
  //     case "SwitchMessage":
  //       return {
  //         status: latestMessage.message.state,
  //       }
  //     default:
  //       null
  //   }
  // }

  // const result = resolveMessage(data?.getLatestMessage)

  return (
    <DashboardCard title={title} loading={loading} error={error}>
      <p>Hello</p>
    </DashboardCard>
  )
}

const useStyles = makeStyles(() => ({}))

export default TempHumidityGraph
