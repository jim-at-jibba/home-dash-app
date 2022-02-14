import Header from "../Header"
import Sidebar from "../Sidebar"
import {GetLayoutFunc} from "../../types"
import Box from "@material-ui/core/Box"
import React, {useEffect, useState} from "react"
import {FunctionComponent} from "react"
import useWindowDimensions from "@/hooks/useWindowDimensions"

const SidebarLayout: FunctionComponent = ({children}) => {
  const [open, setOpen] = useState<boolean | null>(null)
  const {width} = useWindowDimensions()

  useEffect(() => {
    // @ts-expect-error
    if (width != null && width < 1000) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [width])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  if (open == null) {
    return null
  }

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Box display="flex" flexDirection="row" flex={1} overflow="hidden">
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
        <MainContent>{children}</MainContent>
      </Box>
    </Box>
  )
}

const MainContent: FunctionComponent = ({children}) => {
  const {width} = useWindowDimensions()
  return (
    <Box
      component="main"
      color="background.default"
      overflow="scroll"
      flexBasis={0}
      flexGrow={999}
      // @ts-expect-error
      marginTop={width && width < 1000 ? 2 : 8}
    >
      <Box>{children}</Box>
    </Box>
  )
}

export const getSidebarLayout: GetLayoutFunc = (page) => <SidebarLayout>{page}</SidebarLayout>
