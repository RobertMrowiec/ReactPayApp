import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'

export default class Sidebar extends Component {
    render() {
        return (
          <div className="navbar-fixed-side sidebar">
            <div className='sidebarList'>
              <ul>
                <NavLink className="hover-container" activeClassName="dot" to="/app/dashboard"> 
                  <div className='test'>
                    <i className="fas fa-home fa-2x"></i><br/>
                  </div>
                  <p style={{paddingTop: '10px'}}> Pulpit </p>
                </NavLink>
              </ul>
            </div>
            
            <div className='sidebarList'>
              <ul>
                <NavLink className="hover-container" activeClassName="dot" to='/app/users'>
                  <div className='test'>
                    <i className="fas fa-users fa-2x"></i> <br/>
                  </div>
                  <p style={{paddingTop: '10px'}}> Pracownicy </p>
                </NavLink>
              </ul>
            </div>

            <div className='sidebarList'>
              <ul>
                <NavLink className="hover-container" activeClassName="dot" to="/app/projects">
                  <div className='test'>
                    <i className="fas fa-clipboard-list fa-2x"></i> <br/>
                  </div>
                  <p style={{paddingTop: '10px'}}> Projekty </p>
                </NavLink>
              </ul>
            </div>

            <div className='sidebarList'>
              <ul>
                <NavLink className="hover-container" activeClassName="dot" to="/app/salaries">
                  <div className='test'>
                    <i className="fas fa-wallet fa-2x"></i><br/>
                  </div>
                  <p style={{paddingTop: '10px'}}> Wypłaty </p>
                </NavLink>
              </ul>
            </div>
          </div>
        )
    }
}