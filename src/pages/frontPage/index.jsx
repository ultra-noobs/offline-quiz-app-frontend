import "./frontPage.scss";
import { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import * as content from "../../contents/content.json";
import { Button } from "semantic-ui-react";
import useAuthStatus from "../../utils/customHooks/user";
import Navbar from "../../components/Navigation/index";
import Loader from "../../components/Loader/index";

const FrontPage = () => {
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
  }, [getStatus]);
  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && auth && <Redirect to="/dashboard" />}
      {!isLoading && !auth && (
        <div>
          <Navbar />
          <div className="frontpage">
            <div className="frontpage__tagline">
              <div className="frontpage__tagline__text">
                <h1>{content.content[0].frontPage.TagLine1}</h1>
                <p>{content.content[0].frontPage.TagLine2}</p>
                <Link to="/register">
                  <Button size="huge" color="green" icon="rocket" content="Get Stared" />
                </Link>
              </div>
            </div>
            <div className="frontpage__img">
              <img
                className="frontPageImg"
                src="images/online-testing.png"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FrontPage;
