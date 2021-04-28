import {createMuiTheme} from "@material-ui/core/styles"

const themeDark = createMuiTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#fafafa",
    },
    primary: {
      light: "rgba(115, 232, 255, 1)",
      main: "rgba(41, 182, 246, 1)",
      dark: "rgba(0, 134, 195, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(93, 222, 244, 1)",
      main: "rgba(0, 172, 193, 1)",
      dark: "rgba(0, 124, 145, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
})

const themeLight = createMuiTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#fafafa",
    },
    primary: {
      light: "rgba(115, 232, 255, 1)",
      main: "rgba(41, 182, 246, 1)",
      dark: "rgba(0, 134, 195, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(93, 222, 244, 1)",
      main: "rgba(0, 172, 193, 1)",
      dark: "rgba(0, 124, 145, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
})

export {themeDark, themeLight}
