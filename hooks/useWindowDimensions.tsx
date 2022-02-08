import {useState, useEffect} from "react"

interface WidthHeight {
  width: number
  height: number
}

function getWindowDimensions(): WidthHeight {
  const {innerWidth: width, innerHeight: height} = window
  return {
    width,
    height,
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({width: undefined, height: undefined})

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    if (typeof window !== undefined) {
      window.addEventListener("resize", handleResize)
      handleResize()
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  return windowDimensions
}
