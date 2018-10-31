import React, {Component} from 'react'
import logo from '../logoSD.png'
import {Link} from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
        <div className="navbar navbar-default" style={{maxHeight: '80px', marginBottom: '0px', background: 'white' }}>
          <div className="container-fluid">
            <div>
              <div className="navbar-logo" style={{position: 'fixed'}}>
                <img alt="Brand" height={80} src={logo}/>
              </div>

              <div className="navbar-rightSide">
                
                <p className="navbar-text navbar-right navbar-list">
                  <Link to='/app/myprofile'>
                    <a href="/" className="navbar-link navbar-words"> Cześć, Robert </a>
                  </Link>
                </p>

                <p className="navbar-text navbar-right navbar-list">
                  <Link to='/app/myphoto'>
                      <img alt="Avatar" className='roundPhoto' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXFftHQVOVj4O2PYQzVBT1g92Oyxy9bh-0MTnODZ1VfPDWJ0p5'/>
                  </Link>
                </p>

                <p className="navbar-text navbar-right navbar-list">
                  <Link to='/app/logout'>
                    <a href="/" className="navbar-link navbar-words" style={{paddingRight: '10px'}}> Wyloguj </a>
                    <i className="fas fa-power-off fa-lg"></i>
                  </Link>
                </p>

              </div>
            </div>
          </div>
        </div>
    )
  }
}