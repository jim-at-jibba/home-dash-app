import {ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject} from "@apollo/client"
import {useMemo} from "react"

const url =
  process.env.NODE_ENV == "production"
    ? "http://192.168.68.106:4000/graphql"
    : "http://localhost:4000/graphql"

const httpLink = new HttpLink({
  uri: url,
})

function createApolloClient() {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    ssrMode: false,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  })
}

export function useApollo(): ApolloClient<NormalizedCacheObject> {
  const client = useMemo(() => createApolloClient(), [])
  return client
}
