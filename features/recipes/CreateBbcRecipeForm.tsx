import Content from "@/components/Content"
import {createStyles, makeStyles, Theme, Grid, IconButton} from "@material-ui/core"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import SaveIcon from "@material-ui/icons/Save"
import PermMediaIcon from "@material-ui/icons/PermMedia"
import React, {FunctionComponent} from "react"
import DashboardCard from "@/components/Paper"
import DeleteIcon from "@material-ui/icons/Delete"
import * as yup from "yup"
import {Form, Formik, FormikProps} from "formik"
import {Input} from "@/components/formCotrols/input"
import {CategorySelect} from "./components/CategorySelect"
import {CourseSelect} from "./components/CourseSelect"
import {Alert} from "@material-ui/lab"
import {useCreateBbcRecipeMutation, useCreateImageSignatureMutation} from "src/generated/graphql"
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
  url: string
  categoryIds: Array<string>
  courseId: string
  recipeImage: string
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

const CreateBbcRecipeForm: FunctionComponent = () => {
  const classes = useStyles()
  const [previewImage, setPreviewImage] = React.useState<string>()

  const [createImageSignature] = useCreateImageSignatureMutation()
  const [createRecipe] = useCreateBbcRecipeMutation()

  const validationSchema = yup.object({
    url: yup.string().required(), // check its bbc url
    categoryIds: yup.array().of(yup.string()).min(1, "There must be at least one category"),
    courseId: yup.string().min(1, "Must be longer that 1 char").required("A course is require."),
    recipeImage: yup.mixed().required("Recipe image is require."),
  })

  return (
    <Content>
      <Formik<RecipeFormValues>
        initialValues={{
          url: "",
          categoryIds: [],
          courseId: "",
          recipeImage: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          await actions.validateForm(values)

          try {
            console.log({values})
            await createRecipe({
              variables: {
                input: {
                  // name: values.name,
                  // courseId: values.courseId,
                  // categoryId: values.categoryId,
                  // description: values.description,
                  // recipeImage: values.recipeImage,
                  // cookTime: values.cookTime,
                  // prepTime: values.prepTime,
                  // serves: val,
                  // steps: [{stepNumber: 1, stepDescription: "Cut shit up"}],
                  // ingredients: [{ingredient: "50g carrots"}],
                  ...values,
                },
              },
            })
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
                <Grid item xs={12} lg={4}>
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
                <Grid item lg={8} xs={12}>
                  <DashboardCard title="Recipe Details">
                    <Box display="flex" flex={1} flexDirection="column">
                      <Box display="flex" flex={1} mb={2}>
                        <Input name="url" inputLabel="Recipe url" myVariant="filled" />
                      </Box>
                      <Box display="flex" flex={2} flexDirection="row" mb={2}>
                        <Box display="flex" flex={1} mr={2}>
                          <CategorySelect />
                        </Box>
                        <Box display="flex" flex={1}>
                          <CourseSelect />
                        </Box>
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
export default CreateBbcRecipeForm
