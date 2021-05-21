import Content from "@/components/Content"
import {createStyles, makeStyles, FormHelperText, Theme} from "@material-ui/core"
// import Box from "@material-ui/core/Box"
import FilledInput from "@material-ui/core/FilledInput"
import FormControl from "@material-ui/core/FormControl"
import Button from "@material-ui/core/Button"
import SaveIcon from "@material-ui/icons/Save"
import InputLabel from "@material-ui/core/InputLabel"
import React, {FunctionComponent} from "react"
import DashboardCard from "@/components/Paper"
import * as yup from "yup"
import {useFormik} from "formik"
import {useCreateFoodCategoryMutation} from "src/generated/graphql"
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
  }),
)

const RecipeCategoryForm: FunctionComponent = () => {
  const classes = useStyles()
  const [createCategory] = useCreateFoodCategoryMutation()

  const validationSchema = yup.object({
    name: yup.string().required("Category name is require."),
  })

  const formik = useFormik<{name: string}>({
    initialValues: {name: ""},
    validationSchema,
    onSubmit: async (values) => {
      console.log({values})
      createCategory({
        variables: {input: {name: values.name}},
        update() {
          console.log("complete")
          formik.resetForm()
        },
      })
    },
  })

  return (
    <Content>
      <DashboardCard title="Create Category">
        <form
          onSubmit={formik.handleSubmit}
          noValidate
          data-testid="deliveryForm"
          className={classes.form}
        >
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="categoryName">Please enter a value</InputLabel>
            <FilledInput
              id="categoryName"
              name="name"
              autoComplete="off"
              value={formik.values.name}
              onChange={async (evt) => {
                const newVal = evt.target.value
                void formik.setFieldValue("name", newVal, false)
              }}
            />
            {formik.touched.name && !!formik.errors.name ? (
              <FormHelperText error>{formik.errors.name}</FormHelperText>
            ) : null}
          </FormControl>
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
        </form>
      </DashboardCard>
    </Content>
  )
}
export default RecipeCategoryForm
