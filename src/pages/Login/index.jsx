import { React, useState } from 'react'
import { Button, Form, Container } from 'semantic-ui-react'
import Axios from 'axios';
import { useHistory } from "react-router-dom";

const LoginForm = () => {

  const [userInfo , setUserInfo] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();
  const setInfo = (e) => {
    setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value  
    })
  }

  const sendData = async () => {
    const { email, password } = userInfo;
    const userData = {
        password,
        email
    }
    console.log(userData);
    var response = await Axios.post('http://localhost:5000/login', userData)
    console.log(response);
    // history.push('/dashboard')
  }

  const formElements = [{ name: "email", placeholder: "Enter your email" },{name: "password", placeholder: "Enter password"}];
  const renderFormElement = (name, placeholder) => <Form.Field><label>{name}</label><input name={name} onChange={(e) => setInfo(e)} placeholder={placeholder} /></Form.Field>

  return (
    <Container>
       <Form> 
         {formElements.map((element, index) => renderFormElement(element.name, element.placeholder))} 
         <Button type='submit' onClick={() => sendData()}>Login</Button> 
        </Form>
    </Container>
  ) 
    };

export default LoginForm;
