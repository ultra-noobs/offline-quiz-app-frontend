import React from 'react'
// import { Container } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import Header from '../Navigation/index'

const Layout = (props) => <div><Header />{props.children}</div>;

export default Layout;