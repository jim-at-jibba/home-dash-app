import {LinearProgress, makeStyles, Theme} from "@material-ui/core"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import React, {FunctionComponent} from "react"
import {Alert} from "@material-ui/lab"
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted"

interface Props {
  title?: string
  error?: boolean
  loading?: boolean
  handleIconClick?: () => void
}
const DashboardCard: FunctionComponent<Props> = ({
  title,
  loading = false,
  error,
  children,
  handleIconClick,
}) => {
  const classes = useStyles()

  if (error) {
    return <Alert severity="error">Unable to retrieve data</Alert>
  }

  return (
    <Paper className={classes.paperRoot} variant="outlined">
      {loading ? (
        <Box width="100%">
          <LinearProgress />
        </Box>
      ) : (
        <>
          <Box pb={2} display="flex" flexDirection="row" alignItems="center">
            <Typography variant="h5">{title}</Typography>
            {title === "Ingredients" ? (
              <Box ml={2} onClick={handleIconClick}>
                <FormatListBulletedIcon />
              </Box>
            ) : null}
          </Box>
          <>{children}</>
        </>
      )}
    </Paper>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  paperRoot: {
    width: "100%",
    // maxWidth: 600,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    alignItems: "center",
    minHeight: "60px",
    height: "100%",
  },
}))

export default DashboardCard
