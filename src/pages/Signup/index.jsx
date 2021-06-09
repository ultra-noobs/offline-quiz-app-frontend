import { React, useState } from 'react'
import { Button, Form, Container } from 'semantic-ui-react'
import Axios from 'axios';
import { useHistory } from "react-router-dom";

const SignupForm = () => {
  const formElements = [{ name: "name", placeholder: "Enter your name" },{name: "email", placeholder: "Enter your email"}, {name: "institution", placeholder: "Enter your institution"}, {name: "password", placeholder: "Set password"}, {name: "re-password", placeholder: "Re renter the password"}];
  const renderFormElement = (name, placeholder) => <Form.Field><label>{name}</label><input name={name} onChange={(e) => setInfo(e)} placeholder={placeholder} /></Form.Field>;
  //signup schema is a metter of discussion
  const [userInfo , setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    institution: ""
  });

  // const history = useHistory();
  const setInfo = (e) => {
    setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value  
    })
  }

  const sendData = async () => {
    const { email, password, name, institution } = userInfo;
    const userData = {
        password,
        email,
        name,
        institution
    }
    var response = await Axios.post('http://localhost:5000/login', userData)
    console.log(response);
    // history.push('/dashboard')
  }

  return(
    <Container>
       <Form> 
         {formElements.map((ele, index) => renderFormElement(ele.name, ele.placeholder))}  
         <Button type='submit' onClick={() => sendData()}>Register</Button>  
      </Form>
    </Container>
 )
  };

export default SignupForm;
