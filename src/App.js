import FrontPage from "./pages/Landing/index.jsx"
import Login from './pages/Login/index'
import Register from './pages/Signup/index'
import Dashboard from './pages/Dashboard/index'
import Create from './pages/Dashboard/Create/index'
import Edit from './pages/Dashboard/Edit/index'
import AboutUs from './pages/Dashboard/About/index'
import FormRegisteration from './pages/Dashboard/Form/index'
import View from './pages/Dashboard/View/index'
import Profile from './pages/Dashboard/Profile/index'
import ResponseTable from './pages/Dashboard/Profile/Reponses/index'
import DownloadPage from "./pages/Dashboard/About/index";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import 'semantic-ui-css/semantic.min.css'

const App = () => {
  return(
    <div>
      <Router>
          <Switch>
            <Route exact path="/" component={FrontPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/about-us" component={AboutUs} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/download" component={DownloadPage} />
            <Route exact path="/dashboard/create" component={Create} />
            <Route exact path="/dashboard/profile" component={Profile} />
            <Route exact path="/dashboard/view/:id" component={View} />
            <Route exact path="/dashboard/edit/:id" component={Edit} />
            <Route exact path="/dashboard/profile/batch/:batchid" component={ResponseTable} />
            <Route exact path="/formRegister/:token/:batch" component={FormRegisteration} />
          </Switch>
      </Router>
    </div>
  );
}
export default App;
