import {createStyles, makeStyles, Box, InputAdornment} from "@material-ui/core"
import TextField, {TextFieldProps} from "@material-ui/core/TextField"
import Alert from "@material-ui/lab/Alert"
import {useField} from "formik"
import React from "react"

export interface InputProps {
  inputLabel: string
  myVariant: "outlined" | "standard" | "filled" | undefined
  name: string
  startAdornmentContent?: string
  shiftError?: boolean // Adds styles to position error alert absolutely
}

export type InputFieldProps = InputProps & TextFieldProps

export const Input = ({
  inputLabel,
  myVariant = "filled",
  helperText,
  multiline = false,
  name,
  rows,
  startAdornmentContent,
  shiftError = false,
  ...rest
}: InputFieldProps): JSX.Element => {
  const classes = useStyles()
  const [field, meta] = useField(name)
  return (
    <Box className={classes.root}>
      {meta.touched && meta.error ? (
        <Box mb={2} className={shiftError ? classes.alertContainer : ""}>
          <Alert severity="error">{meta.error}</Alert>
        </Box>
      ) : null}
      <TextField
        {...rest}
        error={meta.touched && !!meta.error}
        {...field}
        className={classes.input}
        label={inputLabel}
        variant={myVariant}
        multiline={multiline}
        rows={rows}
        helperText={helperText}
        InputProps={
          startAdornmentContent
            ? {
                startAdornment: (
                  <InputAdornment position="start">{startAdornmentContent}</InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Box>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      position: "relative",
    },
    input: {
      width: "100%",

      "& .MuiFormHelperText-contained": {
        marginLeft: 0,
      },
    },
    alertContainer: {
      position: "absolute",
      top: "-60px",
      zIndex: 1,
      width: "100%",
    },
  }),
)
