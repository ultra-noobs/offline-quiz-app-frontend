import { React, useState } from "react"
import './Create.scss'
import { Icon, Button, Container, Header, Form } from 'semantic-ui-react'
import Axios from 'axios';
import useToken from '../../../utils/customHooks/token'
import HamburgerMenu from '../../../components/HamburgerMenu/index'
import Loader from '../../../components/Loader/index'

const Create = () => {
    
    const [ questionCount, setquestionCount ] = useState(0);
    const [ questionsInput, setquestionsInput ] = useState([]);
    const [ questionAndAnswers, setquestionAndAnswers ] = useState([{ question:'', answer: '' }]);
    const [ quizDateAndTime, setQuizDateAndTime ] = useState({date: '', time: ''})

    const incrementAndRender = () => {
        questionsInput.push(questionCount);
        setquestionCount(questionCount + 1);
    }

    const {getToken} = useToken();


    const renderQuestionInput = () => questionsInput.map((ele, index) =>  
    <Form.Field>
        <label>Question: {ele}</label>
        <input placeholder="Enter your question" name={"question" + ele } id={"question"}/>
        <label> Add options for question {ele} </label>
        <input placeholder="a)option1 b)option2 c)option3" name={"options" + ele } id={"answer"} />
    </Form.Field>);

    const saveAndParse = async() => {
        let questions = document.querySelectorAll("#question");
        let answers = document.querySelectorAll("#answer");
        let i=0;
        questions.forEach((ele) => {
            questionAndAnswers.push({ question: ele.value, answer: answers[i].value })
            i++;
        });

        const finalQnA = questionAndAnswers.filter(element => !!element.value || !!element.answer); 
        console.log(questionAndAnswers);
        const token = getToken();
        const response = await Axios.post(
            'http://localhost:5000/dashboard/saveQuiz', 
            {
                finalQnA,
                time:quizDateAndTime.time,
                date:quizDateAndTime.date
            },
            {
                headers: {
                Authorization: token,
                },
            }
        )
        console.log(response);
    }

    const setDateAndTime = (e) => {
        setQuizDateAndTime({
            ...quizDateAndTime,
            [e.target.name]: e.target.value
        });
        console.log(quizDateAndTime);
    };
 
    const buttonStyle = { marginTop: "10px" }
    return(
        <div>
            <HamburgerMenu>
            <Container>
                <Header> Add Questions here <Button primary floated="right" onClick={() => saveAndParse()} > <Icon name='save' /> Save </Button> <Button warning floated="right">Circulate</Button> </Header>
                <Form>
                    <label>Enter quiz timing </label>
                    <input style={buttonStyle} name="date" onChange={(e) => setDateAndTime(e)} type="date"></input>
                    <input style={buttonStyle} name="time" onChange={(e) => setDateAndTime(e)} type="time"></input> 
                    {renderQuestionInput()}
                </Form>
                <Button icon style={buttonStyle} labelPosition='left' floated="right" onClick={() => incrementAndRender()}>
                    <Icon name='add' />
                  Add
                </Button>
            </Container>
            </HamburgerMenu>
        </div>
    );
}

export default Create;