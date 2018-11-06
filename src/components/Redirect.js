import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export class RedirectDefault extends Component {
    render() {
        return (
            <Redirect from="/" to="/login" />
        )
    }
}
