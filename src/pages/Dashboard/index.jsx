import { useState, useEffect } from "react";
import "./Dashboard.scss";
import {
  Grid,
  Header,
} from "semantic-ui-react";
import Card from "../../components/Card/index";
import { NavLink, Redirect } from "react-router-dom";
import useAuthStatus from "../../utils/customHooks/user";
import useToken from "../../utils/customHooks/token";
import HamburgerMenu from "../../components/HamburgerMenu/index";

const Dashboard = () => {

  const { setToken } = useToken();
  const { getStatus } = useAuthStatus();
  var [isLoading, setLoading] = useState(true);
  var [auth, setAuth] = useState();

  useEffect(() => {
    const checkStatus = async () => {
      const isAuthenticated = await getStatus();
      setAuth(isAuthenticated);
      setLoading(false);
    };
    checkStatus();
  }, []);

  return (
    <div className="container">
      {isLoading && <div>Loading...</div>}
      {!isLoading && !auth && <Redirect to="/login" />}
      {!isLoading && auth && (
        <HamburgerMenu>
          <Header as="h3">Your Quizes</Header>
          <Grid columns="five" divided>
            <Grid.Row>
              {[0, 1, 2, 3, 4].map((ele, index) => {
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
