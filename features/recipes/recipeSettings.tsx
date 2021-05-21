import Content from "@/components/Content"
import {createStyles, makeStyles, Theme} from "@material-ui/core"
import {FunctionComponent} from "react"
import RecipeCategoryForm from "./components/create-food-category-form"
// import {Alert} from "@material-ui/lab"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
)

const RecipeSettings: FunctionComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const classes = useStyles()
  return (
    <Content>
      <RecipeCategoryForm />
    </Content>
  )
}
export default RecipeSettings
