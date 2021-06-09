import { React, useState } from 'react'
import { Button, Form, Container, Message, Header } from 'semantic-ui-react'
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import './Signup.scss'

const SignupForm = () => {
  const labelStyle = { fontSize: "15px" };
  const formElements = [{ name: "name", placeholder: "Enter your name" },{name: "email", placeholder: "Enter your email"}, {name: "institution", placeholder: "Enter your institution"}, {name: "password", placeholder: "Set password"}, {name: "re-password", placeholder: "Re renter the password"}];
  const renderFormElement = (name, placeholder) => <Form.Field><label style={labelStyle} className="label">{name}</label><input name={name} onChange={(e) => setInfo(e)} placeholder={placeholder} /></Form.Field>;

  const [errMessage, seterrMessage] = useState('');
  const [userInfo , setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    institution: ""
  });

  const history = useHistory();
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
    try {
    var response = await Axios.post('http://localhost:5000/login', userData);
    history.push('/dashboard')
    } catch(err) {
      seterrMessage(err);
    }
  }

  return(
    <Container>
       <Header as='h1'>Register</Header>
       <Form error={!!errMessage} > 
         {formElements.map((ele, index) => renderFormElement(ele.name, ele.placeholder))}  
         <Button type='submit' onClick={() => sendData()}>Register</Button>  
         <Message error header="Oops!!" content={errMessage} />
      </Form>
    </Container>
 )
};

export default SignupForm;
