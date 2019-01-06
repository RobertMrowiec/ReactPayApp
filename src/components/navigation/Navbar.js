import React, {Component} from 'react'
import logo from '../../logoSD.png'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      fail: false,
      userId: localStorage.getItem('userId')
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
    .then(x => this.setState({name: x.name}))
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

  dayTime = () => {
      const actualDate = new Date()
      if ( 7 < actualDate.getHours() && actualDate.getHours() < 18) return `Dzień dobry, ${this.state.name}`
      return `Dobry wieczór, ${this.state.name}`
  }
  render() {
    const res = `users/edit/${this.state.userId}`
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

                <p className="navbar-text navbar-right navbar-list">
                  <Link to={res}>
                    {this.dayTime()}

                  </Link>
                </p>

                <p className="navbar-text navbar-right navbar-list">
                  <Link to='/app/myprofile/myphoto'>
                      <img alt="Avatar" className='roundPhoto' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXFftHQVOVj4O2PYQzVBT1g92Oyxy9bh-0MTnODZ1VfPDWJ0p5'/>
                  </Link>
                </p>

                {this.loginTime()}

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