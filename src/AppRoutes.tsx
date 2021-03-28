import { Button } from '@material-ui/core'
import { Helmet } from 'react-helmet-async'
import { Home } from './pages/Home'
import { Layout } from './components/Layout'
import { Notifications } from './pages/Notifications'
import { PageLoader } from './components/PageLoader'
import { PostDetail } from './pages/PostDetail'
import { Posts } from './pages/Posts'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { UserDetail } from './pages/UserDetail/UserDetail'
import { UserDetailContext } from './globalState/UserDetailContext'
import { appConfig } from './appConfig'
import React, { useContext } from 'react'

export const AppRoutes = () => {
  return (
    <Router>
      <div>
        <Helmet>
          <title>Daily faily</title>
        </Helmet>
        <Layout>
          <Switch>
            <Route exact path='/'>
              <Posts />
            </Route>
            <Route exact path='/notifications'>
              <Notifications />
            </Route>
            <Route exact path='/posts/:postId'>
              <PostDetail />
            </Route>
            <Route exact path='/profile/:userId'>
              <UserDetail />
            </Route>
          </Switch>
        </Layout>
      </div>
    </Router>
  )
}
