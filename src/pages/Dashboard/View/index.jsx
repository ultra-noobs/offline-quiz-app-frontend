import React from "react"
import './View.scss'
import Question from '../../../components/Question/index'
import { Container, Divider, Button } from "semantic-ui-react";
import HamburgerMenu from '../../../components/HamburgerMenu/index'
import Loader from '../../../components/Loader/index'

const myQuestions = [
    {
      question: "Who invented JavaScript?",
      options: [
        "Douglas Crockford",
        "Sheryl Sandberg",
        "Brendan Eich"
      ],
      correctAnswer: "c"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      options: [
        "Node.js",
        "TypeScript",
        "npm"
      ],
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      options: [
        "Angular",
        "jQuery",
        "RequireJS",
        "ESLint"
      ],
      correctAnswer: "d"
    },
    {
        question: "Who invented JavaScript?",
        options: [
          "Douglas Crockford",
          "Sheryl Sandberg",
          "Brendan Eich"
        ],
        correctAnswer: "c"
      },
      {
        question: "Which one of these is a JavaScript package manager?",
        options: [
          "Node.js",
          "TypeScript",
          "npm"
        ],
        correctAnswer: "c"
      },
      {
        question: "Which tool can you use to ensure code quality?",
        options: [
          "Angular",
          "jQuery",
          "RequireJS",
          "ESLint"
        ],
        correctAnswer: "d"
      },
      {
        question: "Who invented JavaScript?",
        options: [
          "Douglas Crockford",
          "Sheryl Sandberg",
          "Brendan Eich"
        ],
        correctAnswer: "c"
      },
      {
        question: "Which one of these is a JavaScript package manager?",
        options: [
          "Node.js",
          "TypeScript",
          "npm"
        ],
        correctAnswer: "c"
      },
      {
        question: "Which tool can you use to ensure code quality?",
        options: [
          "Angular",
          "jQuery",
          "RequireJS",
          "ESLint"
        ],
        correctAnswer: "d"
      },
    
  ];


const renderQuestions = () => myQuestions.map((element, index)=> 
    <Question question={element.question} options={element.options} index={index+1}/>
);

const View = () => {
    return(
      <HamburgerMenu>
        <Container>
            <h2 className="heading">Quiz 1 for batch XXXX<Button floated="right">Circulate</Button> </h2>
            <Divider/>
            {renderQuestions()}
        </Container>
      </HamburgerMenu>
        
    );
}

export default View;