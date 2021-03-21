import { Button } from '@material-ui/core'
import { Helmet } from 'react-helmet-async'
import { Home } from './pages/Home'
import { Layout } from './components/Layout'
import { PageLoader } from './components/PageLoader'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { UserDetail } from './pages/UserDetail'
import { UserDetailContext } from './globalState/UserDetail'
import { appConfig } from './appConfig'
import React, { useContext } from 'react'

export const AppRoutes = () => {
  const userDetail = useContext(UserDetailContext)

  if (userDetail.loading) {
    return <PageLoader />
  }

  if (!userDetail.data?.isPublicUserLoggedIn) {
    return (
      <div>
        <h1>Login</h1>
        <a href={appConfig.google.authLoginURL}>
          <Button variant='contained'>Login</Button>
        </a>
      </div>
    )
  }

  return (
    <Router>
      <div>
        <Helmet>
          <title>Root title</title>
        </Helmet>
        <Layout>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/profile'>
              <UserDetail />
            </Route>
          </Switch>
        </Layout>
      </div>
    </Router>
  )
}
