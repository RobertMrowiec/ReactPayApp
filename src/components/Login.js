import React, {Component} from 'react'
import logo from '../logoSD.png'
// import fetch from 'node-fetch'
import {Redirect} from 'react-router-dom'

const success = () => {
    return <Redirect from="/" to="/login" />
}
export default class Login extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    

    login = () => { // will be async 
        const result = true
        // const result = fetch('http://localhost:80/login', {
        //     method: 'POST',
        //     body: {}
        // })
        // .then(x => x.json())

        result === true ? this.setState({ success: true }) : this.setState({ success: false })
    }
    

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
                        <input name="email" type="email" className="form-control" placeholder="Email address" value={this.state.value} onChange={this.handleChange}/>
                        <input name='password' type="password" className="form-control" placeholder="Password" value={this.state.value} onChange={this.handleChange}/>
                    </div>

                    <button type="submit" className="btn btn-lg btn-primary btn-block" onClick={this.login}>Submit</button>
                    <p class="mt-5 mb-3 text-muted">© Surprise.Design </p>
                </div>
            </div>
        )
    }
}