import React from 'react'
import HamburgerMenu from "../../../components/HamburgerMenu/index"
import {Container,Header} from 'semantic-ui-react'

const About = () => {
    return (
        <div className="container">
            <HamburgerMenu>
                <Container>
                    <Header>About OffQuiz</Header>
                </Container>
            </HamburgerMenu>
        </div>
    )
}