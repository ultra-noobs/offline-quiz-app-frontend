import { React, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import Axios from 'axios';
import { useHistory } from "react-router-dom";

const SignupForm = () => {
  const formElements = [{ name: "firstname", placeholder: "Enter your first name" },{name: "last name", placeholder: "Enter lastname"}, {name: "email", placeholder: "Enter your email"}, {name: "re-password", placeholder: "Re renter the password"}];
  const renderFormElement = (name, placeholder) => <Form.Field><label>{name}</label><input name={name} onChange={(e) => setInfo(e)} placeholder={placeholder} /></Form.Field>;
  //signup schema is a metter of discussion
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
    var response = await Axios.post('http://localhost:5000/login', userData)
    console.log(response);
    history.push('/dashboard')
  }

  return(
  <Form> 
    {formElements.map((ele, index) => renderFormElement(ele.name, ele.placeholder))}  
    <Button type='submit' onClick={() => sendData()}>Submit</Button>  
  </Form>)
  };

export default SignupForm;
