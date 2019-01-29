import React, {Component} from 'react'
import logo from '../../logoSD.png'
import fetch from 'node-fetch'
import {Redirect} from 'react-router-dom'
import { checkStatus } from '../Common'
import './Login.scss'

export default class Password extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            loading: false,
            userId: this.props.match.params.id,
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    
    componentDidMount() {
        return fetch(`http://localhost:8002/users/${this.state.userId}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json'
            }
        }).then(checkStatus)
        .then(x => x.json())
        .then(user => {
            // if (user.activated){
            //     return <Redirect to='/login'/>
            // }
            this.setState({email: user.email})
        })
    }

    addPassword = async () => {
        const { email, password } = this.state

        this.setState({loading: true})

        const loginBody = JSON.stringify({
            email, 
            password
        })

        const userActivate = await fetch(`http://localhost:8002/users/activate/${this.state.userId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: loginBody
        }).then(checkStatus)
        .then(x =>  x.json())

        if (userActivate.status !== 'Account activated') {
            return 'Something went wrong, please try again'
        }

        const result = await fetch('http://localhost:8002/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: loginBody
        }).then(checkStatus)
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
        localStorage.setItem('userId', this.state.userId)
        this.setState({success: true, loading: false})
    }

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
                        <input name='password' type="password" className="form-control" placeholder="Password" value={this.state.value} onChange={this.handleChange('password')}/>
                    </div>
                    {/* {this.wrongPassword(this.state.wrongPassword)} */}
                    <button type="submit" className="btn btn-lg btn-login btn-block" onClick={this.addPassword}>Submit</button>
                    <p className="mt-5 mb-3 text-muted">© Robert Mrowiec </p>
                </div>
            </div>
        )
    }
}