import Content from "@/components/Content"
import {createStyles, makeStyles, Theme} from "@material-ui/core"
import {FunctionComponent} from "react"
import RecipeCategoryForm from "./components/CreateFoodCategoryForm"
import RecipeCourseForm from "./components/CreateFoodCourseForm"
import Grid from "@material-ui/core/Grid"
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
      <Grid container direction="column" spacing={4}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <RecipeCategoryForm />
          </Grid>
          <Grid item xs={6}>
            <RecipeCourseForm />
          </Grid>
        </Grid>
      </Grid>
    </Content>
  )
}
export default RecipeSettings
