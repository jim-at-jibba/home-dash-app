import Content from "@/components/Content"
import DashboardCard from "@/components/Paper"
import useMatchPath from "@/hooks/useMatchPath"
import {Box, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
// import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import RestaurantIcon from "@material-ui/icons/Restaurant"
import TimerIcon from "@material-ui/icons/Timer"
import React, {FunctionComponent, useState} from "react"
import {useGetRecipeByIdLazyQuery} from "src/generated/graphql"

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     modal: {
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       width: 400,
//       background: `${theme.palette.primary.dark}`,
//       border: "2px solid #000",
//       boxShadow: "24",
//       padding: 4,
//     },
//   }),
// )

const SingleRecipe: FunctionComponent = () => {
  // const classes = useStyles()
  const {matches, params} = useMatchPath("/recipes/:id")
  const [getRecipes, {data, loading, error}] = useGetRecipeByIdLazyQuery()

  React.useEffect(() => {
    if (matches && params && data == null) {
      getRecipes({variables: {input: {id: params.id}}})
    }
  }, [getRecipes, data, matches, params])

  if (data?.getRecipeById == null || loading) {
    return null
  }

  const copyIngrdientsList = () => {
    const content = ingredients.map((item) => item.ingredient)
    const el = document.createElement("textarea")
    el.value = content.join("\n")
    document.body.appendChild(el)
    el.select()
    document.execCommand("copy")
    document.body.removeChild(el)
  }

  const {
    name,
    description,
    cookTime,
    prepTime,
    serves,
    ingredients,
    steps,
    categories,
    course,
    image,
    recipeNotes,
  } = data.getRecipeById
  console.log({recipeNotes})
  return (
    <Content>
      <Grid container direction="column" spacing={4}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} lg={4}>
            <DashboardCard>
              <img src={image} alt={`${name} recipe`} width={345} height="auto" />
            </DashboardCard>
          </Grid>
          <Grid item lg={8} xs={12}>
            <DashboardCard>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="space-around"
                width="100%"
              >
                <Box>
                  <Box m={1}>
                    <Typography variant="h4">{name}</Typography>
                  </Box>
                  <Box m={1}>
                    <Typography variant="body1">{description}</Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  mx={1}
                  my={3}
                  justifyContent="flex-start"
                  width="100%"
                >
                  <Box display="flex" flexDirection="row">
                    <TimerIcon color="secondary" />
                    <Box ml={2}>
                      <Typography variant="body1">
                        <strong>Prep:</strong> {prepTime} mins
                      </Typography>
                      <Typography variant="body1">
                        <strong>Cook:</strong> {cookTime} mins
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="row" ml={5}>
                    <RestaurantIcon color="secondary" />
                    <Box ml={2}>
                      <Typography variant="body1">
                        <strong>Serves:</strong> {serves}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box width="100%">
                <Box display="flex" flexDirection="row" alignItems="flex-start" width="100%">
                  <Box m={1} mr={5}>
                    <Typography variant="body1" color="secondary">
                      Categories:
                    </Typography>
                    {categories.map((cat) => {
                      return (
                        <Typography variant="body1" key={cat}>
                          {cat}
                        </Typography>
                      )
                    })}
                  </Box>
                  <Box m={1}>
                    <Typography variant="body1" color="secondary">
                      Course:
                    </Typography>
                    <Typography variant="body1">{course}</Typography>
                  </Box>
                </Box>
              </Box>
            </DashboardCard>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <DashboardCard>
            <Typography variant="h4" color="secondary">
              Notes:
            </Typography>
            <Typography variant="body1">{recipeNotes}</Typography>
          </DashboardCard>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <DashboardCard title="Ingredients" handleIconClick={copyIngrdientsList}>
              <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%">
                <List aria-label="secondary mailbox folders">
                  {ingredients.map((item) => {
                    return (
                      <ListItem key={item.id}>
                        <ListItemText primary={item.ingredient} />
                      </ListItem>
                    )
                  })}
                </List>
              </Box>
            </DashboardCard>
          </Grid>
          <Grid item xs={6}>
            <DashboardCard title="Steps">
              <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%">
                <List aria-label="secondary mailbox folders">
                  {steps.map((item) => {
                    return (
                      <ListItem key={item.id}>
                        <ListItemText primary={`${item.stepNumber}: ${item.stepDescription}`} />
                      </ListItem>
                    )
                  })}
                </List>
              </Box>
            </DashboardCard>
          </Grid>
        </Grid>
      </Grid>
    </Content>
  )
}
export default SingleRecipe
