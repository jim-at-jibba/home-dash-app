import Box from "@material-ui/core/Box"
import TempHumidityGauge from "@/components/TempHumidityGauge"
import TempHumidityGraph from "@/components/TempHumidityWeek"
import AirQuality from "@/components/AirQuality"
import {CustomNextPage} from "types"
import {getSidebarLayout} from "../components/layouts/SidebarLayout"

const HomePage: CustomNextPage = () => {
  return (
    <div style={{marginTop: 50, display: "flex"}}>
      <Box mr={2}>
        <TempHumidityGauge title="Living room Temp and Humidity" />
      </Box>
      <Box>
        <AirQuality title="Indoor Air Quality" />
      </Box>
      <Box>
        <TempHumidityGraph title="Temp" />
      </Box>
    </div>
  )
}

HomePage.getLayout = (page) => {
  const Layout = <>{getSidebarLayout(page)}</>
  return Layout
}

export default HomePage
