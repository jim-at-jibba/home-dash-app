import Box from "@material-ui/core/Box"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import AddBoxIcon from "@material-ui/icons/AddBox"
import MenuBookIcon from "@material-ui/icons/MenuBook"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import {makeStyles, useTheme} from "@material-ui/core/styles"
import {useRouter} from "next/router"
import React, {FunctionComponent} from "react"
import {Drawer, IconButton} from "@material-ui/core"
import Link from "next/link"
import clsx from "clsx"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices"
import LocalFloristIcon from "@material-ui/icons/LocalFlorist"

interface Props {
  open: boolean
  handleDrawerClose: () => void
}

const Sidebar: FunctionComponent<Props> = ({open, handleDrawerClose}) => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <Drawer
      data-testid="sidebar"
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Box display="flex" flexDirection="column" flex={1}>
        <List
          subheader={
            <ListSubheader
              className={clsx({
                [classes.listingSubheadingOpen]: open,
                [classes.listingSubheadingClosed]: !open,
              })}
            >
              Rooms
            </ListSubheader>
          }
          component="nav"
        >
          <MenuItemNext path="/office" label="Office">
            <ImportantDevicesIcon />
          </MenuItemNext>
          <MenuItemNext path="/plants" label="Plants">
            <LocalFloristIcon />
          </MenuItemNext>
        </List>

        <Divider />

        <List component="nav">
          <MenuItemNext path="/plants" label="Plants">
            <LocalFloristIcon />
          </MenuItemNext>
        </List>

        <Divider />

        <List
          subheader={
            <ListSubheader
              className={clsx({
                [classes.listingSubheadingOpen]: open,
                [classes.listingSubheadingClosed]: !open,
              })}
            >
              Recipes
            </ListSubheader>
          }
          component="nav"
        >
          <MenuItemNext path="/recipes" label="Recipes">
            <MenuBookIcon />
          </MenuItemNext>
          <MenuItemNext path="/recipes/add" label="New recipe">
            <AddBoxIcon />
          </MenuItemNext>
        </List>
      </Box>
    </Drawer>
  )
}

const drawerWidth = 264
const useStyles = makeStyles((theme) => ({
  button: {
    cursor: "pointer",
  },
  footerText: {
    fontSize: "12px",
    color: theme.palette.grey["600"],
    lineHeight: "24px",
    fontWeight: 600,
  },
  iconSelected: {
    color: theme.palette.secondary.main,
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
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    borderTop: "none",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  listingSubheadingOpen: {
    display: "block",
    transition: theme.transitions.create("display", {
      easing: theme.transitions.easing.easeIn,
      duration: 500,
    }),
  },
  listingSubheadingClosed: {
    display: "none",
    transition: theme.transitions.create("display", {
      easing: theme.transitions.easing.easeOut,
      duration: 500,
    }),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  badgeRoot: {
    "& .MuiBadge-badge": {
      backgroundColor: theme.palette.warning.main,
      color: "white",
    },
  },
}))

// function ListItemLink({
//   href,
//   target,
//   children,
// }: {
//   href: string
//   target?: string
//   children: React.ReactElement
// }) {
//   return (
//     <ListItem button component="a" href={href} target={target}>
//       {children}
//     </ListItem>
//   )
// }

function MenuItemNext({
  path,
  children,
  label,
}: {
  path: string
  children: React.ReactElement
  label: string
}) {
  const router = useRouter()
  const classes = useStyles()

  const isPath = router.asPath.includes(path)
  return (
    <Link href={path}>
      <ListItem button selected={isPath ?? true}>
        <>
          <ListItemIcon className={isPath ? classes.iconSelected : ""}>{children}</ListItemIcon>
          <ListItemText primary={label} />
        </>
      </ListItem>
    </Link>
  )
}
export default Sidebar
