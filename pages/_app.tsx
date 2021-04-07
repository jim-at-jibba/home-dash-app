import CssBaseline from "@material-ui/core/CssBaseline"
import {ThemeProvider} from "@material-ui/core/styles"

import {CustomNextPage} from "../types"
import {themeDark, themeLight} from "lib/theme"
import {AppProps} from "next/app"
import React from "react"

type PageProps = Record<string, unknown>

interface Props extends AppProps {
  pageProps: PageProps
  Component: CustomNextPage
}

export default function MyApp(props: Props) {
  const {Component, pageProps} = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  const isDarkTheme = false
  return (
    <ThemeProvider theme={isDarkTheme ? themeDark : themeLight}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
