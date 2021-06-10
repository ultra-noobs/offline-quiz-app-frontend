import { React, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Form, Button, Message } from 'semantic-ui-react'
import Axios from 'axios';

const FormRegisteration = () => {

    const [useData, setUserData] = useState({ name: '', id: '', phno: '' })
    var { token, batch } = useParams();
    const [error, setError] = useState(false);
    const [errmsg, setErrMsg] = useState("");
    const [suc, setSuc] = useState(false);
    const updateUserState = (e) => {
        setUserData({
            ...useData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        const data = { name: useData.name, id: useData.id, phone: useData.phno, token, batch }
        try {
            const response = await Axios.put("http://localhost:5000/addStudent", data);
            const { errorMessage, success } = response.data;
            console.log(errorMessage)
            console.log(success)
            if (errorMessage) {
                setError(true);
                setErrMsg(errorMessage);
            }
            if (success) {
                setSuc(true);
            }
        } catch (err) {
            setError(true);
            setErrMsg("Link is Broken, Please Recheck The Link.")
        }
    }

    return (
        <Container>
            <Form>
                <Form.Field>
                    <label> Name </label>
                    <input name="name" onChange={(e) => updateUserState(e)} required />
                    <label> Roll no </label>
                    <input name="id" onChange={(e) => updateUserState(e)} required />
                    <label> Phonenumber </label>
                    <input name="phno" onChange={(e) => updateUserState(e)} required />
                    <Button primary style={{ marginTop: "10px" }} onClick={handleSubmit}> Submit </Button>
                    {error && 
                        <Message negative>
                            <Message.Header>{errmsg}</Message.Header>
                        </Message>
                    }
                    {
                        suc &&
                        <Message positive>
                            <Message.Header>Successfully Registered In Database</Message.Header>
                            <p>
                                Now You Can <b>Close the Window</b> And go back to your studies.
                            </p>
                        </Message>
                    }
                </Form.Field>
            </Form>
        </Container>
    );
}

export default FormRegisteration;
