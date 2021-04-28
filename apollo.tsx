import {ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject} from "@apollo/client"
import {useMemo} from "react"

console.log(process.env)
const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_PUBLIC_API as string}/graphql`,
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
