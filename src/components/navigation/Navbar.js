import React, {Component} from 'react'
import logo from '../../logoSD.png'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
        <div className="navbar-default" style={{maxHeight: '80px', marginBottom: '0px', background: 'white' }}>
          <div className="container-fluid">
            <div>
              <div className="navbar-logo" style={{position: 'fixed'}}>
                <img alt="Brand" height={80} src={logo}/>
              </div>

              <div className="navbar-rightSide">
                
                <p className="navbar-text navbar-right navbar-list">
                  <Link to='/app/myprofile'>
                    Cześć, Robert
                  </Link>
                </p>

                <p className="navbar-text navbar-right navbar-list">
                  <Link to='/app/myprofile/myphoto'>
                      <img alt="Avatar" className='roundPhoto' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXFftHQVOVj4O2PYQzVBT1g92Oyxy9bh-0MTnODZ1VfPDWJ0p5'/>
                  </Link>
                </p>

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