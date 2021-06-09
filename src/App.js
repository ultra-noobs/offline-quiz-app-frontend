import Navbar from "./components/nav/navbar.jsx";
import FrontPage from "./pages/frontPage/frontPage.jsx"
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
      <Layout>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/"><FrontPage/></Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}
export default App;
