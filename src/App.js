import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Dashboard from './components/main/Dashboard'
import {RedirectDefault} from './components/Redirect'
import Main from './components/Main'
import MyProfile from './components/main/MyProfile'
import './App.scss'
import Login from './components/login/Login'
import Logout from './components/login/Logout'
import Users from './components/main/Users';
import Projects from './components/main/Projects';
import Salaries from './components/main/Salaries';

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{height: '100vh'}}>

          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>          
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossOrigin="anonymous"/>
          <link href="css/navbar-fixed-side.css" rel="stylesheet" />

          <Route exact path="/" component={RedirectDefault} />
          <Route exact path="/login" component={Login} />
          <Route path="/app" component={Main} />
          <Route path="/app/logout" component={Logout} />
          <Route path="/app/dashboard" component={Dashboard} />
          <Route exact path="/app/myprofile" component={MyProfile} />
          <Route path="/app/myprofile/myphoto" component={MyProfile} />
          <Route path="/app/users" component={Users} />
          <Route path="/app/projects" component={Projects} />
          <Route path="/app/salaries" component={Salaries} />

        </div>
      </Router>
    );
  }
}

export default App;
