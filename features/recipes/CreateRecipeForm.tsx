import Content from "@/components/Content"
import {
  createStyles,
  makeStyles,
  Theme,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import SaveIcon from "@material-ui/icons/Save"
import AddIcon from "@material-ui/icons/Add"
import React, {FunctionComponent} from "react"
import DashboardCard from "@/components/Paper"
import CancelIcon from "@material-ui/icons/Cancel"
import * as yup from "yup"
import {Form, Formik, FormikProps} from "formik"
import {Input} from "@/components/formCotrols/input"
import {CategorySelect} from "./components/CategorySelect"
import {CourseSelect} from "./components/CourseSelect"
import {Alert} from "@material-ui/lab"
// import {Alert} from "@material-ui/lab"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: "100%",
      padding: theme.spacing(4),
    },
    formControl: {
      width: "100%",
    },
    button: {
      marginTop: theme.spacing(1),
    },
    input: {
      width: "100%",
      minWidth: 350,

      "& .MuiFormHelperText-contained": {
        marginLeft: 0,
      },
    },
  }),
)

interface RecipeFormValues {
  name: string
  categoryId: string
  courseId: string
  description: string
  ingredients: Array<{ingredient: string}>
  steps: Array<{stepNumber: number; stepDescription: string}>
  cookTime: number
  prepTime: number
  serves: number
  recipeImage: string
}

const CreateRecipeForm: FunctionComponent = () => {
  const classes = useStyles()
  const [ingredientsList, setIngredientsList] = React.useState<Array<{ingredient: string}>>([
    {ingredient: ""},
  ])

  const [stepsList, setStepsList] = React.useState<
    Array<{stepNumber: number; stepDescription: string}>
  >([{stepNumber: 0, stepDescription: ""}])

  const validationSchema = yup.object({
    name: yup.string().min(1, "Must be longer that 1 char").required("Recipe name is require."),
  })

  React.useEffect(() => {
    console.log("WHAT", stepsList)
  }, [stepsList])

  const handleIngredientInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number,
  ) => {
    const {value} = e.target
    const list = [...ingredientsList]
    list[index]["ingredient"] = value
    setIngredientsList(list)
  }

  // handle click event of the Remove button
  const handleIngredientRemoveClick = (index: number) => {
    const list = [...ingredientsList]
    list.splice(index, 1)
    setIngredientsList(list)
  }

  // handle click event of the Add button
  const handleIngredientAddClick = () => {
    setIngredientsList([...ingredientsList, {ingredient: ""}])
  }

  const handleStepsInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number,
  ) => {
    const {value} = e.target
    const list = [...stepsList]
    console.log(list, index)
    list[index]["stepDescription"] = value
    list[index]["stepNumber"] = index + 1
    setStepsList(list)
  }

  // handle click event of the Remove button
  const handleStepsRemoveClick = (index: number) => {
    const list = [...stepsList]
    list.splice(index, 1)
    setStepsList(list)
  }

  // handle click event of the Add button
  const handleStepsAddClick = () => {
    setStepsList([...stepsList, {stepNumber: 0, stepDescription: ""}])
  }

  return (
    <Content>
      <Formik<RecipeFormValues>
        initialValues={{
          name: "",
          categoryId: "",
          courseId: "",
          description: "",
          ingredients: [],
          steps: [],
          cookTime: 0,
          prepTime: 0,
          serves: 0,
          recipeImage: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          await actions.validateForm(values)

          try {
            console.log({values})
          } catch (err) {
            console.log(err)
            actions.setSubmitting(false)
          }
        }}
      >
        {(props: FormikProps<RecipeFormValues>) => (
          <Form>
            <Grid container direction="column" spacing={4}>
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={4}>
                  <DashboardCard title="Recipe Image">
                    <p>Image</p>
                  </DashboardCard>
                </Grid>
                <Grid item xs={8}>
                  <DashboardCard title="Recipe Details">
                    <Box display="flex" flex={1} flexDirection="column">
                      <Box display="flex" flex={1} mb={2}>
                        <Input {...props} name="name" inputLabel="Recipe name" myVariant="filled" />
                      </Box>
                      <Box display="flex" flex={2} flexDirection="row" mb={2}>
                        <Box display="flex" flex={1} mr={2}>
                          <CategorySelect />
                        </Box>
                        <Box display="flex" flex={1}>
                          <CourseSelect />
                        </Box>
                      </Box>
                      <Box display="flex" flex={1} mb={2}>
                        <Input
                          {...props}
                          multiline
                          rows={4}
                          name="description"
                          inputLabel="Recipe description"
                          myVariant="filled"
                        />
                      </Box>
                      <Box display="flex" flex={3} flexDirection="row" mb={2}>
                        <Box display="flex" flex={1} mr={2}>
                          <Input
                            {...props}
                            name="cookTime"
                            inputLabel="Cook time"
                            type="number"
                            myVariant="filled"
                          />
                        </Box>
                        <Box display="flex" flex={1} mr={2}>
                          <Input
                            {...props}
                            name="prepTime"
                            inputLabel="Prep time"
                            type="number"
                            myVariant="filled"
                          />
                        </Box>
                        <Box display="flex" flex={1}>
                          <>
                            {props.touched.cookTime && props.errors.cookTime ? (
                              <Box mb={2}>
                                <Alert severity="error">{props.errors.cookTime}</Alert>
                              </Box>
                            ) : null}
                            <FormControl
                              style={{width: "100%"}}
                              variant="filled"
                              error={props.touched.serves && !!props.errors.serves}
                            >
                              <InputLabel>Serves</InputLabel>

                              <Select name="serves">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                                  <MenuItem key={item} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </>
                        </Box>
                      </Box>
                    </Box>
                  </DashboardCard>
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                  <DashboardCard title="Ingredients">
                    <Box display="flex" flex={1} flexDirection="column">
                      {ingredientsList.map((ingredient, i) => {
                        return (
                          <Box key={`${ingredient}-${i}`} mb={1}>
                            <TextField
                              className={classes.input}
                              label="ingredient"
                              name="ingredient"
                              variant="filled"
                              value={ingredient.ingredient}
                              onChange={(e) => handleIngredientInputChange(e, i)}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="remove-ingredient"
                                      onClick={() => handleIngredientRemoveClick(i)}
                                      edge="end"
                                    >
                                      <CancelIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Box>
                        )
                      })}

                      <Box>
                        <Button
                          onClick={handleIngredientAddClick}
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<AddIcon />}
                          type="submit"
                          className={classes.button}
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                  </DashboardCard>
                </Grid>
                <Grid item xs={6}>
                  <DashboardCard title="Steps">
                    <Box display="flex" flex={1} flexDirection="column">
                      {stepsList.map((step, i) => {
                        return (
                          <Box key={`${step}-${i}`} mb={1}>
                            <TextField
                              className={classes.input}
                              label={`Step ${i + 1}`}
                              name="stepDescription"
                              variant="filled"
                              multiline
                              rows={2}
                              value={step.stepDescription}
                              onChange={(e) => handleStepsInputChange(e, i)}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="remove-ingredient"
                                      onClick={() => handleStepsRemoveClick(i)}
                                      edge="end"
                                    >
                                      <CancelIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Box>
                        )
                      })}

                      <Box>
                        <Button
                          onClick={handleStepsAddClick}
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<AddIcon />}
                          type="submit"
                          className={classes.button}
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                  </DashboardCard>
                </Grid>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<SaveIcon />}
              type="submit"
              className={classes.button}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Content>
  )
}
export default CreateRecipeForm
