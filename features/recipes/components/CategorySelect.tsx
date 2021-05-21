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
} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import {useField} from "formik"
import React from "react"

export const CategorySelect = (): JSX.Element => {
  const classes = useStyles()
  const [field, meta] = useField("category")

  //const {data, loading, error} = useQuery<GetAvailableCategories>(GET_CATEGORIES)

  // if (data == null || data.availableClassifiedsCategories == null || loading) {
  //   return (
  //     <div className={classes.loading}>
  //       <CircularProgress />
  //     </div>
  //   )
  // }

  // if (error) {
  //   console.log("There was an error fetching available categories", error)
  // }

  // const {availableClassifiedsCategories: categories} = data

  return (
    <>
      {meta.touched && meta.error ? (
        <Box mb={2}>
          <Alert severity="error">{meta.error}</Alert>
        </Box>
      ) : null}
      <FormControl className={classes.root} variant="filled" error={meta.touched && !!meta.error}>
        <InputLabel>Category</InputLabel>

        <Select {...field} name="category">
          {/* {categories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))} */}
          <MenuItem key="vegan" value="vegan">
            Vegan
          </MenuItem>
        </Select>
      </FormControl>
    </>
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
  }),
)
