import Box from "@material-ui/core/Box"
import TempHumidityGauge from "@/components/TempHumidityGauge"
import TempHumidityGraph from "@/components/TempHumidityWeek"
import AirQuality from "@/components/AirQuality"
import {CustomNextPage} from "types"
import {getSidebarLayout} from "../components/layouts/SidebarLayout"
import React from "react"
import Content from "@/components/Content"

const HomePage: CustomNextPage = () => {
  return (
    <Content>
      <Box style={{marginTop: 50, display: "flex", flexDirection: "row"}}>
        <Box mr={2}>
          <TempHumidityGauge title="Living room Temp and Humidity" />
        </Box>
        <Box>
          <AirQuality title="Indoor Air Quality" />
        </Box>
      </Box>
      <Box>
        <TempHumidityGraph title="3 day temp" />
      </Box>
    </Content>
  )
}

HomePage.getLayout = (page) => {
  const Layout = <>{getSidebarLayout(page)}</>
  return Layout
}

export default HomePage
