import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Dashboard from './components/main/Dashboard'
import {RedirectDefault} from './components/Redirect'
import Main from './components/Main'
import MyProfile from './components/main/MyProfile'
import './App.scss'
import './components/main/Projects/Projects.scss'
import './components/navigation/Snackbar.scss'
import Login from './components/login/Login'
import Password from './components/login/Password'
import Logout from './components/login/Logout'
import Users from './components/main/Users/Get';
import UsersAdd from './components/main/Users/Add';
import UsersEdit from './components/main/Users/Edit';
import Projects from './components/main/Projects/Get'
import ProjectsAdd from './components/main/Projects/Add'
import ProjectsEdit from './components/main/Projects/Edit';
import Salaries from './components/main/Salaries';

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{height: '100vh'}}>

          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>          
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossOrigin="anonymous"/>
          <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"/>
          <link href="css/navbar-fixed-side.css" rel="stylesheet" />

          <Route exact path="/" component={RedirectDefault} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/password/:id" component={Password} />
          <Route path="/app" component={Main} />
          <Route path="/app/logout" component={Logout} />
          <Route path="/app/dashboard" component={Dashboard} />
          <Route exact path="/app/myprofile" component={MyProfile} />
          {/* <Route path="/app/myprofile/myphoto" component={MyPhoto} /> */}
          <Route path="/app/users" component={Users} />
          <Route path="/app/users/add" component={UsersAdd} />
          <Route path="/app/users/edit/:id" component={UsersEdit} />
          <Route exact path="/app/projects" component={Projects} />
          <Route exact path="/app/projects/add" component={ProjectsAdd} />
          <Route exact path="/app/projects/edit/:id" component={ProjectsEdit} />
          <Route path="/app/salaries" component={Salaries} />

        </div>
      </Router>
    );
  }
}

export default App;
