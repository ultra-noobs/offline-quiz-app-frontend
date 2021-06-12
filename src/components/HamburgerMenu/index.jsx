import { useState, useEffect } from "react"
import "./HamburgerMenu.scss"
import {
  Grid,
  Icon,
  Menu,
  Segment,
  Sidebar,
  Button,
} from 'semantic-ui-react'
import { NavLink } from "react-router-dom"


const BurgerMenu = (props) => {
  const [visible, setVisible] = useState(false)

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
                  <Menu.Item as='a'>
                    <Icon name="question circle outline" />
                   OffQuiz
                </Menu.Item>

                <NavLink exact activeClassName="current" to={`/dashboard`}>
                  <Menu.Item as='a'>
                    <Icon name="dashboard" />
                  Dashboard
                </Menu.Item>
                </NavLink>

                <NavLink exact activeClassName="current" to={`/dashboard/create`}>
                  <Menu.Item as='a'>
                    <Icon name='file alternate outline' />
                    Create
                </Menu.Item>
                </NavLink>

                <NavLink exact activeClassName="current" to={`/dashboard/profile`}>
                <Menu.Item as='a'>
                  <Icon name='user' />
                Profile
              </Menu.Item>
              </NavLink>
              <NavLink exact activeClassName="current" to={`/dashboard/about`}>
                <Menu.Item as='a'>
                    <Icon name='search' />
                  About
                </Menu.Item>
              </NavLink>
                
              </Sidebar>

              <Sidebar.Pusher>
                <Segment basic style={{ overflow: 'auto' ,height: "88vh" }} >
                  {props.children}
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </Grid.Column>
        </Grid>
    </div>
  )
}

export default BurgerMenu;