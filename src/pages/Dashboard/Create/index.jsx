import { React, useState, useRef, useEffect } from "react"
import './Create.scss'
import { Icon, Button, Container, Header, Form } from 'semantic-ui-react'

const Create = () => {
    
    // var optionCount = new Array(100);
    // // for(let i=0;i<100;i++) {
    //     // optionCount[i] = new Array(100);
    // // }

    // var optionInput = new Array(100);
    // for(let i=0;i<100;i++) {
    //     optionInput[i] = new Array(100);
    // }

    let currentQuestionIndex = 0;
    const inputRef = useRef(null); 
    const [questionCount, setquestionCount] = useState(0);
    const [questionsInput, setquestionsInput] = useState([]);
    const [ optionCount, setOptionCount ] = useState(0);
    const [ optionInput, setOptionInput ] = useState([100][100]);

    // useEffect(() => {
    //     for(let i=0;i<100;i++) {
    //         optionCount[i] = 0;
    //     }
    // },[])
    
    const incrementAndRender = () => {
        questionsInput.push(questionCount);
        setquestionCount(questionCount + 1);
        setOptionCount(0);
        if(currentQuestionIndex != 0)
        optionInput[currentQuestionIndex+1].push(optionCount);
    }

    const incrementAndRenderOption = (index) => {
        optionInput[index].push(optionCount);
        setOptionCount(optionCount + 1);
        currentQuestionIndex = index;
    };

    const updateQuestions = (e) => {
        console.log(inputRef.current.value);
        // this will be called when save is clicked 
        // setQuestions(...questions, { question: e.target.value, options: e.target.value });
    };

    const renderOptionInput = (index) => optionInput[index].map((ele, index) =>
    <Form.Field>
        <label>Option {ele} </label>
        <input placeholder={"Enter option " + ele} />
    </Form.Field> );

    const renderQuestionInput = () => questionsInput.map((ele, index) =>  
    <Form.Field>
        <label>Question: {ele}</label>
        <input placeholder="Enter your question" ref={inputRef} name={"question" + ele } onChange={(e) => updateQuestions(e)} />
        <label> Input for Question {ele} options</label>
        {renderOptionInput(ele)}
        <Button icon style={buttonStyle} labelPosition="left" floated="left" onClick={() => incrementAndRenderOption(ele)}>
            <Icon name="add" />
            Option 
        </Button>
    </Form.Field>);

    const buttonStyle = { marginTop: "10px" }
    return(
        <div>
            <Container>
                <Header> Add Questions here <Button primary floated="right"> <Icon name='save' onClick={() => updateQuestions()} /> Save </Button> <Button warning floated="right">Circulate</Button> </Header>
                <Form> {renderQuestionInput()} </Form>
                <Button icon style={buttonStyle} labelPosition='left' floated="right" onClick={() => incrementAndRender()}>
                    <Icon name='add' />
                  Add
                </Button>
            </Container>
        </div>
    );
}

export default Create;