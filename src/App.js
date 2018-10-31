import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import {RedirectDefault} from './components/Redirect';
import Main from './components/Main'
import MyProfile from './components/MyProfile';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{height: '100vh'}}>

          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"/>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossOrigin="anonymous"/>
          <link href="css/navbar-fixed-side.css" rel="stylesheet" />

          <Route exact path="/" component={RedirectDefault} />
          <Route path="/app" component={Main} />
          <Route path="/app/dashboard" component={Dashboard} />
          <Route path="/app/myprofile" component={MyProfile} />

        </div>
      </Router>
    );
  }
}

export default App;
