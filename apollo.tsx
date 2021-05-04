import {ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject} from "@apollo/client"
import {useMemo} from "react"

const httpLink = new HttpLink({
  uri: `http://127.0.0.1:4000/graphql`,
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
