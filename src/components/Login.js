import React, {Component} from 'react'
import logo from '../logoSD.png'

export default class Login extends Component {
    
    render() {
        return (
            <div className="login">
                <img alt="" className="loginLogo" height={170} src={logo}/> <br/>

                <h1 className="h3 mb-3 font-weight-normal "> Please Sign In </h1>

                <div className="form-group">
                    <input name="email" type="email" className="form-control" placeholder="Email address"/>
                    <input name='password' type="password" className="form-control" placeholder="Password"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        )
    }
}