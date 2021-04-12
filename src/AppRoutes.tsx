import { Helmet } from 'react-helmet-async'
import { Home } from './pages/Home'
import { Layout } from './components/Layout'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

export const AppRoutes = () => {
  return (
    <Router>
      <div>
        <Helmet>
          <title>React boilerplate</title>
        </Helmet>
        <Layout>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
          </Switch>
        </Layout>
      </div>
    </Router>
  )
}
