import {CustomNextPage} from "types"
import {getSidebarLayout} from "../components/layouts/SidebarLayout"

const HomePage: CustomNextPage = () => {
  return (
    <div>
      <p>Hello World!</p>
    </div>
  )
}

HomePage.getLayout = (page) => {
  const Layout = <>{getSidebarLayout(page)}</>
  return Layout
}

export default HomePage
