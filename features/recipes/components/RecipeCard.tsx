import React, {FunctionComponent} from "react"
import {makeStyles, Theme, createStyles} from "@material-ui/core/styles"
import clsx from "clsx"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import {RecipeDetails, useGetRecipeStepsLazyQuery} from "src/generated/graphql"
import {dateFormat} from "@/utils/dates"
import {LinearProgress} from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
    },
  }),
)

interface Props {
  recipe: Pick<RecipeDetails, "id" | "name" | "description" | "createdAt" | "image">
}

const RecipeReviewCard: FunctionComponent<Props> = ({recipe}) => {
  console.log({recipe})
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const [getRecipeSteps, {data, loading}] = useGetRecipeStepsLazyQuery()

  console.log(data, loading)
  const handleExpandClick = () => {
    setExpanded(!expanded)
    getRecipeSteps({variables: {input: {id: recipe.id}}})
  }

  const renderSteps = () => {
    return data?.getRecipeStepsByRecipeId.map((step) => {
      return (
        <Typography paragraph key={step.id}>
          {step.stepNumber}: {step.stepDescription}
        </Typography>
      )
    })
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            JB
          </Avatar>
        }
        title={recipe.name}
        subheader={dateFormat(recipe.createdAt, "dd LLL, yyyy")}
      />
      <CardMedia
        className={classes.media}
        image={recipe.image != "" ? recipe.image : "/images/recipe-placeholder.png"}
        title={recipe.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {recipe.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          {loading ? <LinearProgress color="secondary" /> : renderSteps()}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default RecipeReviewCard
