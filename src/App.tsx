import { ApolloClient, ApolloProvider, createHttpLink } from '@apollo/client'
import { AppRoutes } from './AppRoutes'
import { AppTheme } from './themes/AppTheme'
import { HelmetProvider } from 'react-helmet-async'
import { UserDetailContextProvider } from './globalState/UserDetail'
import { appConfig } from './appConfig'
import { cache } from './cache'
import CssBaseline from '@material-ui/core/CssBaseline'
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
    <HelmetProvider>
      <AppTheme>
        <ApolloProvider client={client}>
          <UserDetailContextProvider>
            <CssBaseline />
            <AppRoutes />
          </UserDetailContextProvider>
        </ApolloProvider>
      </AppTheme>
    </HelmetProvider>
  )
}

export default App
