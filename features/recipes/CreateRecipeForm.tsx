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
import PermMediaIcon from "@material-ui/icons/PermMedia"
import AddIcon from "@material-ui/icons/Add"
import React, {FunctionComponent} from "react"
import DashboardCard from "@/components/Paper"
import CancelIcon from "@material-ui/icons/Cancel"
import DeleteIcon from "@material-ui/icons/Delete"
import * as yup from "yup"
import {Form, Formik, FormikProps} from "formik"
import {Input} from "@/components/formCotrols/input"
import {CategorySelect} from "./components/CategorySelect"
import {CourseSelect} from "./components/CourseSelect"
import {Alert} from "@material-ui/lab"
import {useCreateImageSignatureMutation} from "src/generated/graphql"
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
    imageUploader: {
      width: "100%",
      height: "200px",
      border: `2px dashed ${theme.palette.secondary.main}`,
      borderRadius: theme.shape.borderRadius,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    previewImage: {
      objectFit: "cover",
      width: "100%",
      height: "auto",
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
  recipeImage: string | null
}

interface IUploadImageResponse {
  secure_url: string
}

async function uploadImage(
  image: File,
  signature: string,
  timestamp: number,
): Promise<IUploadImageResponse> {
  console.log(process.env.NEXT_PUBLIC_CLOUDINARY_KEY, signature, timestamp)
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`

  const formData = new FormData()
  formData.append("file", image)
  formData.append("signature", signature)
  formData.append("timestamp", timestamp.toString())
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY)

  const reponse = await fetch(url, {
    method: "post",
    body: formData,
  })

  return reponse.json()
}

const CreateRecipeForm: FunctionComponent = () => {
  const classes = useStyles()
  const [ingredientsList, setIngredientsList] = React.useState<Array<{ingredient: string}>>([
    {ingredient: ""},
  ])

  const [stepsList, setStepsList] = React.useState<
    Array<{stepNumber: number; stepDescription: string}>
  >([{stepNumber: 0, stepDescription: ""}])
  const [previewImage, setPreviewImage] = React.useState<string>()

  const [createImageSignature] = useCreateImageSignatureMutation()

  const validationSchema = yup.object({
    name: yup.string().min(1, "Must be longer that 1 char").required("Recipe name is require."),
    categoryId: yup
      .string()
      .min(1, "Must be longer that 1 char")
      .required("A category is require."),
    courseId: yup.string().min(1, "Must be longer that 1 char").required("A course is require."),
    description: yup
      .string()
      .min(1, "Must be longer that 1 char")
      .max(5000, "Maximum of 5000 characters")
      .required("Recipe descrition is require."),
    ingredients: yup
      .array()
      .of(
        yup.object().shape({
          ingredient: yup.string().min(1).max(255).required(),
        }),
      )
      .min(1, "There must be at least 1 ingredient"),
    steps: yup
      .array()
      .of(
        yup.object().shape({
          stepNumber: yup.number().required(),
          stepDescription: yup.string().min(1).required(),
        }),
      )
      .min(1, "There must be at least 1 step"),
    recipeImage: yup.mixed().required("Recipe image is require."),
  })

  React.useEffect(() => {
    console.log("WHAT", stepsList)
  }, [stepsList])

  const handleIngredientInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number,
    formikProps: FormikProps<RecipeFormValues>,
  ) => {
    const {value} = e.target
    const list = [...ingredientsList]
    list[index]["ingredient"] = value
    setIngredientsList(list)
    formikProps.setFieldValue("ingredients", list, false)
  }

  // handle click event of the Remove button
  const handleIngredientRemoveClick = (
    index: number,
    formikProps: FormikProps<RecipeFormValues>,
  ) => {
    const list = [...ingredientsList]
    list.splice(index, 1)
    setIngredientsList(list)
    formikProps.setFieldValue("ingredients", list, false)
  }

  // handle click event of the Add button
  const handleIngredientAddClick = () => {
    setIngredientsList([...ingredientsList, {ingredient: ""}])
  }

  const handleStepsInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number,
    formikProps: FormikProps<RecipeFormValues>,
  ) => {
    const {value} = e.target
    const list = [...stepsList]
    console.log(list, index)
    list[index]["stepDescription"] = value
    list[index]["stepNumber"] = index + 1
    setStepsList(list)
    formikProps.setFieldValue("steps", list, false)
  }

  // handle click event of the Remove button
  const handleStepsRemoveClick = (index: number, formikProps: FormikProps<RecipeFormValues>) => {
    const list = [...stepsList]
    list.splice(index, 1)
    setStepsList(list)
    formikProps.setFieldValue("steps", list, false)
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
          serves: 1,
          recipeImage: null,
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
                    <Box width="100%">
                      {!previewImage && (
                        <label htmlFor="image">
                          <Box width="75%" height="200px" className={classes.imageUploader}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                              Click to add image (16:9)
                              <Box mt={2}>
                                <PermMediaIcon fontSize="large" />
                              </Box>
                            </Box>
                          </Box>
                        </label>
                      )}
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        style={{display: "none"}}
                        onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                          if (event?.target?.files?.[0]) {
                            const file = event.target.files[0]
                            const {data: imageSignatureData} = await createImageSignature()

                            if (imageSignatureData) {
                              const {signature, timestamp} = imageSignatureData.createImageSignature
                              console.log(signature, timestamp)
                              const imageResult = await uploadImage(file, signature, timestamp)
                              const imageUrl = imageResult.secure_url

                              props.setFieldValue("recipeImage", imageUrl, false)
                              setPreviewImage(imageUrl)
                            }
                          }
                        }}
                      />
                      {props.touched.recipeImage && props.errors.recipeImage ? (
                        <Box mb={2} mt={2}>
                          <Alert severity="error">{props.errors.recipeImage}</Alert>
                        </Box>
                      ) : null}
                      {previewImage && (
                        <Box display="flex" flexDirection="column" alignItems="center">
                          <img alt="What" src={previewImage} className={classes.previewImage} />
                          <Box mt={1}>
                            <IconButton
                              aria-label="delete"
                              color="secondary"
                              onClick={() => {
                                props.setFieldValue("recipeImage", "", false)
                                setPreviewImage("")
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </DashboardCard>
                </Grid>
                <Grid item xs={8}>
                  <DashboardCard title="Recipe Details">
                    <Box display="flex" flex={1} flexDirection="column">
                      <Box display="flex" flex={1} mb={2}>
                        <Input name="name" inputLabel="Recipe name" myVariant="filled" />
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
                            name="cookTime"
                            inputLabel="Cook time"
                            type="number"
                            myVariant="filled"
                          />
                        </Box>
                        <Box display="flex" flex={1} mr={2}>
                          <Input
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

                              <Select
                                name="serves"
                                value={props.values.serves}
                                onChange={props.handleChange}
                              >
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
                              onChange={(e) => handleIngredientInputChange(e, i, props)}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="remove-ingredient"
                                      onClick={() => handleIngredientRemoveClick(i, props)}
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
                              onChange={(e) => handleStepsInputChange(e, i, props)}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="remove-ingredient"
                                      onClick={() => handleStepsRemoveClick(i, props)}
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
