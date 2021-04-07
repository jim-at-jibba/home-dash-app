import {NextPage} from "next"

export type GetLayoutFunc = (page: React.ReactNode) => JSX.Element
export type CustomNextPage<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayoutFunc
}
