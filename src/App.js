import FrontPage from "./pages/frontPage/index.jsx"
import Login from './pages/Login/index'
import Register from './pages/Signup/index'
import Dashboard from './pages/Dashboard/index'
import Create from './pages/Dashboard/Create/index'
import FormRegisteration from './pages/Dashboard/Form/index'
import View from './pages/Dashboard/View/index'
import Header from './components/Navigation/index'
import Profile from './pages/Dashboard/Profile/index'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import 'semantic-ui-css/semantic.min.css'
//switch to lazy loading for pending request refer below code for syntax
// const LoginPage = React.lazy(() => import('./pages/Login/index'))

const App = () => {
  return(
    <div>
      <Router>
          <Switch>
            {/* <Header /> */}
            <Route exact path="/" component={FrontPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/create" component={Create} />
            <Route exact path="/dashboard/profile" component={Profile} />
            <Route exact path="/dashboard/view/:id" component={View} />
            <Route exact path="/formRegister/:id/:id2" component={FormRegisteration} />
          </Switch>
      </Router>
    </div>
  );
}
export default App;
