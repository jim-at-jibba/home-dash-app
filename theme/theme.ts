import {createMuiTheme} from "@material-ui/core/styles"

const headingStyles = {
  fontFamily: ["'Fira Mono'", "Menlo", "monospace"].toString(),
  fontWeight: 700,
}

const themeDark = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#506477",
      light: "#7390aa",
      dark: "#767c9d",
      contrastText: "#e4f0fb",
    },
    secondary: {
      main: "#d0679d",
      light: "#fcc5e9",
      dark: "#fae4fc",
      contrastText: "#e4f0fb",
    },
    warning: {
      main: "#fffac2",
      light: "#eaf54f",
      contrastText: "#101010",
    },
    success: {
      main: "#5de4c7",
      dark: "#42675a",
      contrastText: "#101010",
    },
    divider: "#717cb4",
    background: {
      default: "#252b37",
      paper: "#1f2531",
    },
  },
  typography: {
    fontFamily: ["'Fira Mono'", "Menlo", "monospace"].toString(),
    h1: headingStyles,
    h2: headingStyles,
    h3: headingStyles,
    h4: headingStyles,
    h5: headingStyles,
    h6: {
      fontWeight: 400,
    },
    overline: {
      fontSize: "0.875rem",
      fontWeight: 500,
      letterSpacing: 2,
    },
    button: {
      fontWeight: 500,
    },
  },
})

const themeLight = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#506477",
      light: "#7390aa",
      dark: "#767c9d",
      contrastText: "#e4f0fb",
    },
    secondary: {
      main: "#d0679d",
      light: "#fcc5e9",
      dark: "#fae4fc",
      contrastText: "#e4f0fb",
    },
    warning: {
      main: "#fffac2",
      light: "#eaf54f",
      contrastText: "#101010",
    },
    success: {
      main: "#5de4c7",
      dark: "#42675a",
      contrastText: "#101010",
    },
    divider: "#717cb4",
    background: {
      default: "#e4f0fb",
      paper: "#e4eefb",
    },
  },
  typography: {
    fontFamily: ["'Fira Mono'", "Menlo", "monospace"].toString(),
    h1: headingStyles,
    h2: headingStyles,
    h3: headingStyles,
    h4: headingStyles,
    h5: headingStyles,
    h6: {
      fontWeight: 400,
    },
    overline: {
      fontSize: "0.875rem",
      fontWeight: 500,
      letterSpacing: 2,
    },
    button: {
      fontWeight: 500,
    },
  },
})

export {themeDark, themeLight}
