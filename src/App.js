import FrontPage from "./pages/frontPage/index.jsx"
import Login from './pages/Login/index'
import Register from './pages/Signup/index'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard/index'
import Create from './pages/Dashboard/Create/index'
import View from './pages/Dashboard/View/index'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
//switch to lazy loading for pending request refer below code for syntax
// const LoginPage = React.lazy(() => import('./pages/Login/index'))

const App = () => {
  return(
    <div>
      <Router>
      <Layout>
          <Switch>
            <Route exact path="/" component={FrontPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/create" component={Create} />
            <Route exact path="/dashboard/view/:id" component={View} />
          </Switch>
      </Layout>
      </Router>
    </div>
  );
}
export default App;
