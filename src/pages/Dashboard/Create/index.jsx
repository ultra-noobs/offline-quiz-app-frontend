import { React, useState } from "react"
import './Create.scss'
import { Icon, Button, Container, Header, Form } from 'semantic-ui-react'

const Create = () => {
    const [questionCount, setquestionCount] = useState(0);
    const [questionsArr, setquestionsArr] = useState([]);
    const [questions, setQuestions] = useState({question: '', options: ''})
    const incrementAndRender = () => {
        questionsArr.push(questionCount);
        console.log(questionsArr);
        setquestionCount(questionCount + 1);
    }
    const updateQuestions = (e) => {
        // this will be called when save is clicked 
        // setQuestions(...questions, { question: e.target.value, options: e.target.value });
    };
    const renderQuestionInput = () => questionsArr.map((ele, index) =>  
    <Form.Field>
        <label>Question: {ele}</label>
        <input placeholder="Enter your question" name={"question" + ele } onChange={(e) => updateQuestions(e)} />
        <label> Input for Question {ele} options</label>
        <input placeholder="Comma seperated options" name={"option" + ele } onChange={(e) => updateQuestions(e)} />
    </Form.Field>);

    const buttonStyle = { marginTop: "10px" }
    return(
        <div>
            <Container>
                <Header> Add Questions here <Button primary floated="right"> <Icon name='save' onClick={updateQuestions()} /> Save </Button> <Button warning floated="right">Circulate</Button> </Header>
                <Form>
                 {renderQuestionInput()}
                </Form>
                <Button icon style={buttonStyle} labelPosition='left' floated="right" onClick={() => incrementAndRender()}>
                    <Icon name='add' />
                  Add
                </Button>
            </Container>
        </div>
    );
}

export default Create;