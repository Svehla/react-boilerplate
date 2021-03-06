import { ApolloClient, ApolloProvider, createHttpLink } from '@apollo/client'
import { AppRoutes } from './AppRoutes'
import { AppTheme } from './themes/AppTheme'
import { HelmetProvider } from 'react-helmet-async'
import { appConfig } from './appConfig'
import { cache } from './cache'
import CssBaseline from '@material-ui/core/CssBaseline'

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
          <CssBaseline />
          <AppRoutes />
        </ApolloProvider>
      </AppTheme>
    </HelmetProvider>
  )
}

export default App
