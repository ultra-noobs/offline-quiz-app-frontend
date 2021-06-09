import Navbar from "./components/nav/navbar.jsx";
import FrontPage from "./pages/frontPage/frontPage.jsx"
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <FrontPage/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
