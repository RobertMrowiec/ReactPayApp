import React, {Component} from 'react'
import logo from '../../logoSD.png'
// import fetch from 'node-fetch'
import {Redirect} from 'react-router-dom'

const success = () => {
    return <Redirect from="/login" to="/app" />
}
const fail = () => {
    return <Redirect from="/" to="/logout" />
}
export default class Login extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    
    login = async () => { // will be async 
        let body = {
            email: this.state.email,
            password: this.state.password
        }
        const result = await fetch('http://localhost:8002/auth/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        }).then(x => x.json())

        result.token ? success() : fail()
    }
    
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    
    render() {
        const { success } = this.state
        if (success) {
            return <Redirect from="/login" to="/app" />
        }

        return (
            <div className='backgroundLogin'>
                <div className="login">
                    <img alt="" className="loginLogo" height={170} src={logo}/> <br/>

                    <h1 className="h3 mb-3 font-weight-normal "> Please Sign In </h1>

                    <div className="form-group">
                        <input name="email" type="email" className="form-control" placeholder="Email address" value={this.state.value} onChange={this.handleChange('email')}/>
                        <input name='password' type="password" className="form-control" placeholder="Password" value={this.state.value} onChange={this.handleChange('password')}/>
                    </div>

                    <button type="submit" className="btn btn-lg btn-primary btn-block" onClick={this.login}>Submit</button>
                    <p className="mt-5 mb-3 text-muted">© Surprise.Design </p>
                </div>
            </div>
        )
    }
}