import Content from "@/components/Content"
import {Box, Grid, Typography} from "@material-ui/core"
import React, {FunctionComponent} from "react"
import DashboardCard from "@/components/Paper"
import {useGetRecipeByIdLazyQuery} from "src/generated/graphql"
import useMatchPath from "@/hooks/useMatchPath"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
// import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Image from "next/image"
import TimerIcon from "@material-ui/icons/Timer"
import RestaurantIcon from "@material-ui/icons/Restaurant"

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     form: {
//       width: "100%",
//       padding: theme.spacing(4),
//     },
//     formControl: {
//       width: "100%",
//     },
//     button: {
//       marginTop: theme.spacing(1),
//     },
//     input: {
//       width: "100%",
//       minWidth: 350,

//       "& .MuiFormHelperText-contained": {
//         marginLeft: 0,
//       },
//     },
//     imageUploader: {
//       width: "100%",
//       height: "200px",
//       border: `2px dashed ${theme.palette.secondary.main}`,
//       borderRadius: theme.shape.borderRadius,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     previewImage: {
//       objectFit: "cover",
//       width: "100%",
//       height: "auto",
//     },
//   }),
// )

const CreateRecipeForm: FunctionComponent = () => {
  // const classes = useStyles()
  const {matches, params} = useMatchPath("/recipes/:id")
  const [getRecipes, {data, loading, error}] = useGetRecipeByIdLazyQuery()

  console.log(loading, error)
  React.useEffect(() => {
    if (matches && params && data == null) {
      getRecipes({variables: {input: {id: params.id}}})
    }
  }, [getRecipes, data, matches, params])

  if (data?.getRecipeById == null || loading) {
    return null
  }

  const {
    name,
    description,
    cookTime,
    prepTime,
    serves,
    ingredients,
    steps,
    category,
    course,
    image,
  } = data.getRecipeById
  return (
    <Content>
      <Grid container direction="column" spacing={4}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={4}>
            <DashboardCard title="Recipe Image">
              <Image src={image} alt={`${name} recipe image`} width={345} height="100%" />
            </DashboardCard>
          </Grid>
          <Grid item xs={8}>
            <DashboardCard title="Recipe Details">
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
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
                <Box display="flex" flexDirection="row" m={1}>
                  <Box display="flex" flexDirection="row">
                    <TimerIcon />
                    <Box ml={2}>
                      <Typography variant="body1">Prep: {prepTime}</Typography>
                      <Typography variant="body1">Cook: {cookTime}</Typography>
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="row" ml={2}>
                    <RestaurantIcon />
                    <Box ml={2}>
                      <Typography variant="body2">Serves: {serves}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-around"
                  alignItems="center"
                  width="100%"
                >
                  <Box m={1}>
                    <Typography variant="body1">{category}</Typography>
                  </Box>
                  <Box m={1}>
                    <Typography variant="body1">{course}</Typography>
                  </Box>
                </Box>
              </Box>
            </DashboardCard>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <DashboardCard title="Ingredients">
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
export default CreateRecipeForm
