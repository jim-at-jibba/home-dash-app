// import {GetAvailableCategories} from "@/types/graphql"
// import {useQuery} from "@apollo/client"
import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  // CircularProgress,
  Box,
  CircularProgress,
} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import {useField} from "formik"
import React from "react"
import {useGetFoodCoursesQuery} from "src/generated/graphql"

export const CourseSelect = (): JSX.Element => {
  const classes = useStyles()
  const [field, meta] = useField("courseId")

  const {data, loading, error} = useGetFoodCoursesQuery()

  if (data == null || data.getFoodCourses == null || loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    )
  }

  if (error) {
    console.log("There was an error fetching available categories", error)
  }

  const {getFoodCourses: courses} = data
  return (
    <Box display="flex" flexDirection="column">
      {meta.touched && meta.error ? (
        <Box mb={2}>
          <Alert severity="error">{meta.error}</Alert>
        </Box>
      ) : null}
      <FormControl className={classes.root} variant="filled" error={meta.touched && !!meta.error}>
        <InputLabel>Course</InputLabel>

        <Select {...field} name="courseId">
          <MenuItem key="emplty" value="">
            No selection
          </MenuItem>
          {courses.map((item) => (
            <MenuItem key={item.id} value={item.id} className={classes.text}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      minWidth: 335,
    },
    loading: {
      display: "flex",
      justifyContent: "center",
    },
    text: {
      textTransform: "capitalize",
    },
  }),
)
