import Content from "@/components/Content"
import RecipeReviewCard from "@/features/recipes/components/recipe-card"
import {createStyles, Grid, makeStyles, Theme} from "@material-ui/core"
import {FunctionComponent} from "react"

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

const Recipes: FunctionComponent = () => {
  const classes = useStyles()
  return (
    <Content>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {[0, 1, 2, 3, 4, 5].map((value) => (
              <Grid key={value} item>
                <RecipeReviewCard />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Content>
  )
}
export default Recipes
