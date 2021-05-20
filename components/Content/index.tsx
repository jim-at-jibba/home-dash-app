import {FunctionComponent} from "react"

const Content: FunctionComponent = ({children}) => {
  return <div style={{marginTop: 50, display: "flex", flexDirection: "column"}}>{children}</div>
}

export default Content
