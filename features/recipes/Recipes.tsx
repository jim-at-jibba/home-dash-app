import Content from "@/components/Content"
import RecipeReviewCard from "@/features/recipes/components/RecipeCard"
import {Box} from "@material-ui/core"
import {FunctionComponent} from "react"
import {useGetRecipesQuery} from "src/generated/graphql"
import {Alert} from "@material-ui/lab"

const Recipes: FunctionComponent = () => {
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
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {getRecipes.map((recipe) => (
          <Box display="flex" key={recipe.id} m={1}>
            <RecipeReviewCard recipe={recipe} />
          </Box>
        ))}
      </Box>
    </Content>
  )
}
export default Recipes
