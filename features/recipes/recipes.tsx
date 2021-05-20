import Content from "@/components/Content"
import RecipeReviewCard from "@/features/recipes/components/recipe-card"
import {createStyles, Grid, makeStyles, Theme} from "@material-ui/core"
import {FunctionComponent} from "react"
import {useGetRecipesQuery} from "src/generated/graphql"
import {Alert} from "@material-ui/lab"

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
  const {data, error, loading} = useGetRecipesQuery()

  console.log(data, error, loading)

  if (error) {
    return <Alert severity="error">Unable to retrieve recipes</Alert>
  }

  if (data == null) {
    return null
  }

  const {getRecipes} = data
  return (
    <Content>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {getRecipes.map((recipe) => (
              <Grid key={recipe.id} item>
                <RecipeReviewCard recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Content>
  )
}
export default Recipes
