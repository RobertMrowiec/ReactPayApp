import React, {Component} from 'react'
import Loader from '../navigation/Loader'
import logo from '../../logoSD.png'
import fetch from 'node-fetch'
import {Redirect} from 'react-router-dom'
import {checkStatus} from '../Common'

export default class Login extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    login = async () => {
        this.setState({loading: true})
        let body = {
            email: this.state.email,
            password: this.state.password
        }
        
        const result = await fetch('http://localhost:8002/auth/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(x => x.json())
        .catch(err => console.log('Error: ', err))

        result ? this.success(result.token) : this.setState({wrongPassword: true})
    }

    wrongPassword = status => {
        if (status) {
            return <p className='credentials'> Invalid credentials </p>
        }
    }

    success = (token) => {
        localStorage.setItem('tokenDate', new Date())
        localStorage.setItem('token', token)
        this.setState({success: true, loading: false})
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    
    signLoading = state => {
        if (state) {
            return (
                <div style={{height: '58px', width: '100%', marginBottom: '1px'}}>
                    <div style={{marginTop: '50px', marginLeft: '-75px'}}>
                        <div id="loader"></div>
                    </div>
                </div>
            )
        }
        return <h1 className="h3 mb-3 font-weight-normal"> Please Sign In </h1>
    }

    render() {
        const { success } = this.state
        if (success) {
            return <Redirect to="/app/dashboard" />
        }


        return (
            <div className='backgroundLogin'>
                <div className="login">
                    <img alt="" className="loginLogo" height={170} src={logo}/> <br/>

                    {this.signLoading(this.state.loading)}

                    <div className="form-group">
                        <input name="email" type="email" className="form-control" placeholder="Email address" value={this.state.value} onChange={this.handleChange('email')}/>
                        <input name='password' type="password" className="form-control" placeholder="Password" value={this.state.value} onChange={this.handleChange('password')}/>
                    </div>
                    {this.wrongPassword(this.state.wrongPassword)}
                    <button type="submit" className="btn btn-lg btn-login btn-block" onClick={this.login}>Submit</button>
                    <p className="mt-5 mb-3 text-muted">© Surprise.Design </p>
                </div>
            </div>
        )
    }
}