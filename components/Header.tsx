import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import {makeStyles} from "@material-ui/core/styles"
import React, {FunctionComponent} from "react"
import {createStyles, IconButton} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import clsx from "clsx"

interface Props {
  handleDrawerOpen: () => void
  open: boolean
}

const Header: FunctionComponent<Props> = ({handleDrawerOpen, open}) => {
  const classes = useStyles()

  return (
    <AppBar
      position="fixed"
      elevation={5}
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => handleDrawerOpen()}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

const drawerWidth = 264
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      boxShadow: "4px 0 3px -1px rgb(0 0 0 / 30%)",
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 46,
    },
    hide: {
      display: "none",
    },
  }),
)

export default Header
