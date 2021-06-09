import { React, useState } from 'react'
import { Button, Form, Container, Message, Header } from 'semantic-ui-react'
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import './Login.scss'

const LoginForm = () => {

  const labelStyle = { fontSize: "15px" }
  const [errMessage, seterrMessage ] = useState('');
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
    try {
      var response = await Axios.post('http://localhost:5000/login', userData)
    } catch(err) {
      seterrMessage(err);
    }
    history.push('/dashboard')
  }

  const formElements = [{ name: "email", placeholder: "Enter your email" },{name: "password", placeholder: "Enter password"}];
  const renderFormElement = (name, placeholder) => <Form.Field><label className="label" style={labelStyle}>{name}</label><input name={name} onChange={(e) => setInfo(e)} placeholder={placeholder} /></Form.Field>

  return (
    <Container>
       <Header as='h1'>Login</Header>
       <Form error={!!errMessage}>  
         {formElements.map((element, index) => renderFormElement(element.name, element.placeholder))} 
         <Button type='submit' onClick={() => sendData()}>Login</Button>
         <Message error header="Oops!!" content={errMessage} /> 
        </Form>
    </Container>
  ) 
    };

export default LoginForm;
