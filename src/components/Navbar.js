import React, {Component} from 'react'
import logo from '../logoSD.png'

export default class Navbar extends Component {
  render() {
    return (
        <div className="navbar navbar-default" style={{maxHeight: '80px' }}>
          <div className="container-fluid">
            <div className="navbar-header">
              <img alt="Brand" height={80} src={logo}/>
            </div>

            <div className="navbar-rightSide">
              
              <p className="navbar-text navbar-right navbar-list">
                <a href="/myprofile" className="navbar-link navbar-words"> Cześć, Robert </a>
              </p>

              <p className="navbar-text navbar-right navbar-list">
                <a href="/myphoto" className="navbar-link">
                  <img alt="Avatar" className='roundPhoto' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXFftHQVOVj4O2PYQzVBT1g92Oyxy9bh-0MTnODZ1VfPDWJ0p5'/>
                </a>
              </p>

              <p className="navbar-text navbar-right navbar-list">
                <a href="/logout" className="navbar-link navbar-words" style={{paddingRight: '10px'}}> Wyloguj </a>
                <i className="fas fa-power-off fa-lg"></i>
              </p>

            </div>
          </div>
        </div>
    )
  }
}