import FrontPage from "./pages/frontPage/index.jsx"
import Login from './pages/Login/index'
import Register from './pages/Signup/index'
import Layout from './components/Layout'
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
            <Route exact path="/"><FrontPage/></Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
      </Layout>
      </Router>
    </div>
  );
}
export default App;
