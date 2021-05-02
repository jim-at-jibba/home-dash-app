import CssBaseline from "@material-ui/core/CssBaseline"
import {ThemeProvider} from "@material-ui/core/styles"

import {CustomNextPage, GetLayoutFunc} from "@/types"
import {themeDark, themeLight} from "theme/theme"
import {AppProps} from "next/app"
import React from "react"
import {useApollo} from "apollo"
import {ApolloProvider} from "@apollo/client"
import Head from "next/head"

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

  const isDarkTheme = true
  const client = useApollo()
  const getLayout: GetLayoutFunc = Component.getLayout || ((page) => <>{page}</>)

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Fira+Mono:400,500,700&display=swap"
        />
      </Head>
      <ThemeProvider theme={isDarkTheme ? themeDark : themeLight}>
        <ApolloProvider client={client}>
          <CssBaseline />

          {getLayout(<Component {...pageProps} />)}
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}
