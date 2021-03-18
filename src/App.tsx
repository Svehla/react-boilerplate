import { ApolloClient, ApolloProvider } from '@apollo/client'
import { HelmetProvider } from 'react-helmet-async'
import { Root } from './Root'
import { appConfig } from './appConfig'
import { cache } from './cache'
import React from 'react'

const client = new ApolloClient({
  cache,
  uri: appConfig.graphqlUrl,
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <h1>hi</h1>
        <Root />
      </HelmetProvider>
    </ApolloProvider>
  )
}

export default App
