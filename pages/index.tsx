import TempHumidityGauge from "@/components/TempHumidityGauge"
import AirQuality from "@/components/AirQuality"
import {CustomNextPage} from "types"
import {getSidebarLayout} from "../components/layouts/SidebarLayout"

const HomePage: CustomNextPage = () => {
  return (
    <div style={{marginTop: 50}}>
      <TempHumidityGauge title="Office Temp and Humidity" />
      <AirQuality title="Indoor Air Quality" />
    </div>
  )
}

HomePage.getLayout = (page) => {
  const Layout = <>{getSidebarLayout(page)}</>
  return Layout
}

export default HomePage
