import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
    render() {
        return <Redirect from="/app/logout" to="/login" />
    }
}