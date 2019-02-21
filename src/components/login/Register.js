import React, {Component} from 'react'
import logo from '../../logoSD.png'
import fetch from 'node-fetch'
import {Redirect} from 'react-router-dom'
import {checkStatus} from '../Common'
import './Login.scss'

export default class Register extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: '',
            surname: '',
            loading: false,
            wrongEmail: false
        }
    }

    register = async () => {
        this.setState({loading: true})
        let body = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            surname: this.state.surname
        }
        const result = await fetch('http://localhost:8002/users', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        }).then(checkStatus)
        .then(x => x.json())
        .catch(err => console.log('Error: ', err))

        result ? this.setState({success: true, loading: false}) : this.setState({wrongEmail: true, loading: false})
    }

    wrongEmail = status => {
        if (status) {
            return <p className='credentials'> Invalid email </p>
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    
    signLoading = state => {
        if (state) {
            return (
                <div style={{width: '100%'}}>
                    <div style={{marginTop: '10px', marginLeft: '-75px'}}>
                        <div id="loader"></div>
                    </div>
                </div>
            )
        }
    }
    login = () => this.setState({success: true})
    // snackbarRender = form => {
    //     this.setState({snackbarText: `You forgot to add ${form}`})
    //     const snackbar = this.snackbar.current
    //     snackbar.className = 'show'
    //     setTimeout(() => snackbar.className = '', 3000)
    // }

    
    render() {
        const { success } = this.state
        if (success) {
            // this.snackbarRender('EMAIL')
            return <Redirect to="/login" />
        }

        return (
            <div className='backgroundLogin'>
                <div className="login">
                    <img alt="" className="loginLogo" height={170} src={logo}/> <br/>

                    <h1 className="h3 mb-3 font-weight-normal"> Create account </h1>
                    <div className="form-group">
                        <input name="name" type="name" className="form-control" placeholder="Name" value={this.state.name} onChange={this.handleChange('name')}/>
                        <input name='surname' type="surname" className="form-control" placeholder="Surname" value={this.state.surname} onChange={this.handleChange('surname')}/>
                        <input name="email" type="email" className="form-control" placeholder="Email address" value={this.state.value} onChange={this.handleChange('email')}/>
                        <input name='password' type="password" className="form-control" placeholder="Password" value={this.state.value} onChange={this.handleChange('password')}/>
                    </div>
                    {this.signLoading(this.state.loading)}
                    {this.wrongEmail(this.state.wrongEmail)}
                    <div className='loginButtons'>
                        <button type="submit" className="btn btn-lg btn-block btn-150" abbr='fuck you' onClick={this.login}>Return</button>
                        <button type="submit" className="btn btn-lg btn-login btn-150" onClick={this.register}>Sign Up</button>
                    </div>
                    <p className="mt-5 mb-3 text-muted">© Robert Mrowiec </p>
                </div>
            </div>
        )
    }
}