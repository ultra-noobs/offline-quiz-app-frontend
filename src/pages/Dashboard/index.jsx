import { useState, useEffect } from "react";
import "./Dashboard.scss";
import {
  Grid,
  Header,
} from "semantic-ui-react";
import Card from "../../components/Card/index";
import { NavLink, Redirect } from "react-router-dom";
import useAuthStatus from "../../utils/customHooks/user";
import HamburgerMenu from "../../components/HamburgerMenu/index";
import Loader from '../../components/Loader/index'
import Axios from 'axios'
import useToken from '../../utils/customHooks/token'

const Dashboard = () => {

  const { getStatus } = useAuthStatus();
  var [isLoading, setLoading] = useState(true);
  var [auth, setAuth] = useState();
  const [ quizes, setQuizes ] = useState([{}]);

  const { getToken } = useToken();

  useEffect(async () => {
    const checkStatus = async () => {
      const isAuthenticated = await getStatus();
      setAuth(isAuthenticated);
      setLoading(false);
    };
    checkStatus();

    const token = getToken();
    const quizEndPoint = 'http://localhost:5000/dashboard';
    const fetchQuizes = async (quizEndPoint) => {
      const response = await Axios.get(quizEndPoint, {
          headers:{
              Authorization: token,
          }
      });
      // console.log(response.data)
      response.data.map((element, index) => {
        quizes.push(element);
        console.log(element);
      });
    }
    fetchQuizes(quizEndPoint);
  }, []);

  return (
    <div className="container">
      {isLoading && <Loader />}
      {!isLoading && !auth && <Redirect to="/login" />}
      {!isLoading && auth && (
        <HamburgerMenu>
          <Header as="h3">Your Quizes</Header>
          <Grid columns="five" divided>
            <Grid.Row>
              {quizes.map((ele, index) => {
                return (
                  <Grid.Column>
                    <NavLink
                      exact
                      activeClassName="current"
                      to={`/dashboard/view/${ele}`}
                    >
                      <Card />
                    </NavLink>
                  </Grid.Column>
                );
              })}
            </Grid.Row>
          </Grid>
        </HamburgerMenu>
      )}
    </div>
  );
};
export default Dashboard;
