import { useState,useEffect } from 'react'
import { Button, Form, Container, Message, Header } from 'semantic-ui-react'
import Axios from 'axios';
import { useHistory,Redirect } from "react-router-dom";
import './Signup.scss'
import useToken from "../../utils/customHooks/token";
import useAuthStatus from "../../utils/customHooks/user";
import Navbar from "../../components/Navigation/index"

const SignupForm = () => {
  const labelStyle = { fontSize: "15px" };
  const formElements = [{ name: "name", placeholder: "Enter your name" },{name: "email", placeholder: "Enter your email"}, {name: "institution", placeholder: "Enter your institution"}, {name: "password", placeholder: "Set password"}, {name: "re-password", placeholder: "Re renter the password"}];
  const renderFormElement = (name, placeholder) => <Form.Field><label style={labelStyle} className="label">{name}</label><input type={name} name={name} onChange={(e) => setInfo(e)} placeholder={placeholder} /></Form.Field>;

  const [errMessage, seterrMessage] = useState('');
  const [userInfo , setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    institution: ""
  });

  const {setToken} = useToken();
  const {getStatus} = useAuthStatus();
  const history = useHistory();
  const setInfo = (e) => {
    setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value  
    })
  }

  var [isLoading,setLoading] = useState(true);
  var [auth,setAuth] = useState();

  useEffect(()=>{
     const checkStatus = async()=>{
       const isAuthenticated = await getStatus();
        setAuth(isAuthenticated);
        setLoading(false);
     }
     checkStatus();
  },[])

  const sendData = async () => {
    const { email, password, name, institution } = userInfo;
    const userData = {
        password,
        email,
        name,
        institution
    }
    try {
      const data = await Axios.post('http://localhost:5000/register', userData);
      const token = data.data.token;
      const errorMessage = data.data.errorMessage;
      if(errorMessage){
        seterrMessage(errorMessage);
      }else{
        setToken(token);
        history.push('/dashboard')
      }
    } catch(err) {
      seterrMessage(err);
    }
    
  }

  return(
    <Container>
      {isLoading && <div>Loading...</div>}
      {!isLoading && auth && <Redirect to='/dashboard' />}
      {!isLoading && !auth && 
      <div>
        <Navbar />
        <Header as='h1'>Register</Header>
        <Form error={!!errMessage} > 
          {formElements.map((ele, index) => renderFormElement(ele.name, ele.placeholder))}  
          <Button type='submit' onClick={() => sendData()}>Register</Button>  
          <Message error header="Oops!!" content={errMessage} />
        </Form>
      </div>
    }
    </Container>
 )
};

export default SignupForm;
