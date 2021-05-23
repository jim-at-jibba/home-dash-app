import {match, Match} from "node-match-path"
import {useMemo} from "react"

function useMatchPath(path: string): Match {
  const pathname = "location" in global ? global.location.pathname : ""

  return useMemo(() => {
    return match(path, pathname)
  }, [path, pathname])
}

export default useMatchPath
