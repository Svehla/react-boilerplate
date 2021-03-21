import { ApolloClient, ApolloProvider, createHttpLink } from '@apollo/client'
import { GlobalDataContextProvider } from './GlobalDataContext'
import { HelmetProvider } from 'react-helmet-async'
import { Root } from './Root'
import { appConfig, appEnvs } from './appConfig'
import { cache } from './cache'
import React from 'react'

const link = createHttpLink({
  uri: appConfig.graphqlUrl,
  credentials: 'include',
})

const client = new ApolloClient({
  cache,
  link,
})

const App = () => {
  return (
    <GlobalDataContextProvider>
      <ApolloProvider client={client}>
        <HelmetProvider>
          <h1>Daily faily admin</h1>
          <Root />
        </HelmetProvider>
      </ApolloProvider>
    </GlobalDataContextProvider>
  )
}

export default App
