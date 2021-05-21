import Content from "@/components/Content"
import {createStyles, makeStyles} from "@material-ui/core"
import {FunctionComponent} from "react"
import DashboardCard from "@/components/Paper"
// import {Alert} from "@material-ui/lab"

const useStyles = makeStyles(() => createStyles({}))

const RecipeCategoryForm: FunctionComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const classes = useStyles()
  return (
    <Content>
      <DashboardCard title="Create Category">
        <p>Form</p>
      </DashboardCard>
    </Content>
  )
}
export default RecipeCategoryForm
