import { React, useState } from 'react'
import { Container, Form, Button } from 'semantic-ui-react'

const FormRegisteration  = () => {

    const [useData, setUserData ] = useState({name: '', id: '', phno: ''})

    const updateUserState = (e) => {
        setUserData({
            ...useData,
            [e.target.name]: e.target.value
        })
    }

    return(
        <Container>
            <Form.Field>
                <label> Name </label>
                <input name="name" onChange={(e) => updateUserState(e)} />
                <label> Roll no </label>
                <input name="id" onChange={(e) => updateUserState(e)} />
                <label> Phonenumber </label>
                <input name="phno" nChange={(e) => updateUserState(e)} />
                <Button primary> Submit </Button>
            </Form.Field>
        </Container>
    );
}

export default FormRegisteration;