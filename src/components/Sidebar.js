import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'

export default class Sidebar extends Component {
  render() {
    return (
      <div className="navbar-fixed-side sidebar">
        <NavLink className='sidebarList' activeClassName="dot" to="/app/dashboard"> 
          <div className="zxc">
            <div className='test'>
              <i className="fas fa-home fa-2x sidebar-i" style={{paddingLeft: '1px'}}></i><br/>
            </div>
          <p style={{paddingTop: '2px'}}> Pulpit </p>
          </div>

        </NavLink>
    
        <NavLink className='sidebarList' activeClassName="dot" to='/app/users'>
          <div className="zxc">
            <div className='test'>
              <i className="fas fa-users fa-2x sidebar-i" style={{paddingLeft: '5px'}}></i> <br/>
            </div>
            <p style={{paddingTop: '2px'}}> Pracownicy </p>
          </div>
        </NavLink>

          <NavLink className='sidebarList' activeClassName="dot" to="/app/projects">
            <div className="zxc">
              <div className='test'>
                <i className="fas fa-clipboard-list fa-2x sidebar-i" style={{paddingLeft: '5px'}}></i> <br/>
              </div>
              <p style={{paddingTop: '2px'}}> Projekty </p>
            </div>
          </NavLink>

        <NavLink className='sidebarList' activeClassName="dot" to="/app/salaries">
          <div className="zxc">
            <div className='test'>
              <i className="fas fa-wallet fa-2x sidebar-i" style={{paddingLeft: '2px'}}></i><br/>
            </div>
            <p style={{paddingTop: '2px'}}> Wypłaty </p>
          </div>
        </NavLink>
      </div>
    )
  }
}