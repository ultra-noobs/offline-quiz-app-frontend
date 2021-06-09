import React from "react"
import "./Dashboard.scss"
import {   
    Grid,
    Header,
    Icon,
    Menu,
    Segment,
    Sidebar,
    Button,
 }  from 'semantic-ui-react'
import Card from '../../components/Card/index'
import { NavLink } from "react-router-dom"


 const Dashboard = () => {
    const [visible, setVisible] = React.useState(false)
    return (
        <div className="container">
      <Grid columns={1}>
        <Grid.Column>
            <Button icon primary onClick={() => setVisible(true)}>
                <Icon name='tasks' />
            </Button>
        </Grid.Column>
  
        <Grid.Column>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              onHide={() => setVisible(false)}
              vertical
              visible={visible}
              width='thin'
            >
            <NavLink exact activeClassName="current" to={`/dashboard/create`}>
                <Menu.Item as='a'>
                    <Icon name='home' />
                    Create
                </Menu.Item>
            </NavLink>
              
              <Menu.Item as='a'>
                <Icon name='gamepad' />
                Profile
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='camera' />
                About
              </Menu.Item>
            </Sidebar>
  
            <Sidebar.Pusher>
              <Segment basic style={{height: "77vh"}} >
                <Header as='h3'>Your Quizes</Header>
                <Grid columns='five' divided>
                    <Grid.Row>
                        {[0,1,2,3,4].map((ele, index) => {
                            return(
                        <Grid.Column>
                            <NavLink exact activeClassName="current" to={`/dashboard/view/${ele}`}>
                                <Card />
                            </NavLink>
                        </Grid.Column>                            
                        )})}
                    </Grid.Row>
                </Grid>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Column>
      </Grid>
      </div>
    )
  }
  
export default Dashboard;