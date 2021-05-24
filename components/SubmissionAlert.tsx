import React, {FunctionComponent} from "react"
import Snackbar from "@material-ui/core/Snackbar"
import Alert, {AlertProps} from "@material-ui/lab/Alert"
import Slide from "@material-ui/core/Slide"
import {TransitionProps} from "@material-ui/core/transitions"

export interface Props {
  message: string
  open: boolean
  severity: AlertProps["severity"]
  onClose: () => void
}

const SubmissionAlert: FunctionComponent<Props> = ({message, open, onClose, severity}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      TransitionComponent={SlideUpTransition}
    >
      <Alert elevation={6} variant="filled" onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}

const SlideUpTransition: React.ComponentType<
  TransitionProps & {children?: React.ReactElement<any, any>}
> = (props) => {
  return <Slide {...props} direction="up" />
}

type ShowAlertFunc = (message: string) => void

function useSubmissionAlert(): [Props, ShowAlertFunc, ShowAlertFunc, () => void] {
  const [submissionAlertProps, setSubmissionAlertProps] = React.useState<Props>({
    open: false,
    message: "",
    severity: "success",
    onClose: React.useCallback(() => {
      setSubmissionAlertProps((prevState) => ({
        ...prevState,
        open: false,
      }))
    }, []),
  })

  const showSuccessAlert = React.useCallback((message: string) => {
    setSubmissionAlertProps((prevState) => ({
      ...prevState,
      message,
      open: true,
      severity: "success",
    }))
  }, [])

  const showWarningAlert = React.useCallback((message: string) => {
    setSubmissionAlertProps((prevState) => ({
      ...prevState,
      message,
      open: true,
      severity: "warning",
    }))
  }, [])

  return [submissionAlertProps, showSuccessAlert, showWarningAlert, submissionAlertProps.onClose]
}

export default SubmissionAlert
export {useSubmissionAlert}
