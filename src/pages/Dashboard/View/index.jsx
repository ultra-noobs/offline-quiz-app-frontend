import { React, useEffect, useState } from "react"
import { useLocation, Redirect } from "react-router-dom";
import './View.scss'
import Question from '../../../components/Question/index'
import { Container, Divider, Button } from "semantic-ui-react";
import Hamburgermenu from '../../../components/HamburgerMenu/index'
import Loader from '../../../components/Loader/index'
import useToken from '../../../utils/customHooks/token'
import useAuthStatus from "../../../utils/customHooks/user";
import Axios from 'axios'

const View = () => {

  const location = useLocation();
  const { getToken } = useToken();
  const { getStatus } = useAuthStatus();
  var [isLoading, setLoading] = useState(true);
  var [auth, setAuth] = useState();
  const [ currentQuiz, setCurrentQuiz ] = useState({});
  
  useEffect( async () => {
    let documentId = location.pathname.substr(16, location.pathname.length - 16);
    let endpoint = "http://localhost:5000/dashboard/view/" + documentId;

    const token = getToken();
      const response = await Axios.get(endpoint, {
          headers:{
              Authorization: token,
          }
      });

      setCurrentQuiz(response.data);
      const isAuthenticated = await getStatus();
      setAuth(isAuthenticated);
      setLoading(false);
  },[])


  const renderQuestions = () => currentQuiz.finalQuizArray.map((element, index)=> 
    <Question question={element.question} options={element.option} index={index+1}/>
    );

    return(
      <div>
      {isLoading && <Loader />}
      {!isLoading && !auth && <Redirect to="/login" />}
      {!isLoading && auth && (
        <Container>
            <h2 className="heading" onClick={() =>test()}>Quiz 1 for batch XXXX<Button floated="right">Circulate</Button> </h2>
            <Divider/>
            {renderQuestions()}
        </Container>)}
      </div>
    );
}

export default View;