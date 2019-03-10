import React, { Component } from 'react'
import logo from '../../logoSD.png'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fail: false,
      name: '',
      surname: '',
      userId: localStorage.getItem('userId'),
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
    
    return fetch(`http://localhost:8002/users/${this.state.userId}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(x => x.json())
    .then(x => this.setState({name: x.name, surname: x.surname}))
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    let tempTokenDate = Date.parse(localStorage.getItem('tokenDate'))
    let actualDate = Date.parse(new Date())
    let between = actualDate - tempTokenDate
    this.setState({between})

    if (between >= 900000) {
      return this.setState({fail: true})
    }
  }

  loginTime = () => {
    if (this.state.between){
      let timeRemaining = this.state.between / 1000
      let minutes = (parseInt(15 - timeRemaining / 60) < 10) ? '0' + parseInt(15 - timeRemaining / 60) : parseInt(15 - timeRemaining / 60)
      timeRemaining = (timeRemaining % 60);
      let seconds = (parseInt(60 - timeRemaining) < 10) ? '0' + parseInt(60 - timeRemaining) : parseInt(60 - timeRemaining)
      return (
        <div className='tokenTime'>
          {minutes + ':' + seconds}
        </div>
      )
    }
  }

  myprofile = () => {
    const userId = localStorage.getItem('userId')
    console.log(userId);
    
    
    if (window.location.href === `http://localhost:3000/app/users/edit/${userId}`) console.log('actually on my profile edit page');
    else this.props.history.push(`/app/users/edit/${userId}`)
  }

  dayTime = () => {
      const actualDate = new Date()
      if ( 7 < actualDate.getHours() && actualDate.getHours() < 18) return `Dzień dobry, ${this.state.name}`
      return `Dobry wieczór, ${this.state.name}`
  }

  render() {
    const { fail } = this.state

    if (fail) {
      return <Redirect to="/login" />
    }

    return (
      <div className="navbar-default" style={{maxHeight: '80px', marginBottom: '0px', background: 'white' }}>
        <div className="container-fluid">
          <div>
            <div className="navbar-logo" style={{position: 'fixed'}}>
              <img alt="Brand" height={80} src={logo}/>
            </div>

            <div className="navbar-rightSide">
              <p onClick={this.myprofile} className="navbar-text navbar-right navbar-list">
                {this.dayTime()}
              </p>

              <p className="navbar-text navbar-right navbar-list">
                  <div className='roundAvatar'>
                    <p className='avatarName'>{this.state.name[0]+this.state.surname[0]}</p>
                  </div>
              </p>

              {this.loginTime()}

              <div className='navbar-logout' onClick={() => console.log('refreshing token')} style={{ cursor: 'pointer'}}> 
                <i class="fa fa-random" aria-hidden="true" style={{marginRight: '10px'}}></i>
              </div>

              <div style={{paddingRight: '10px'}}>
                <Link to='/app/logout'>
                  <div className='navbar-logout'>
                    <p className="navbar-link navbar-words" style={{paddingRight: '10px', fontSize: '16px'}}> Wyloguj </p>
                    <i className="fas fa-power-off fa-lg"></i>
                  </div>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Navbar);
