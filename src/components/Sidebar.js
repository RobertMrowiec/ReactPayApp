import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default class Sidebar extends Component {
    render() {
        return (
          <div className="navbar-default navbar-fixed-side sidebar">
            <div className='sidebarList'>
              <ul>
                <Link to="/app/dashboard"> 
                  <i className="fas fa-home fa-2x"></i><br/>
                  Pulpit
                </Link>
              </ul>
            </div>
            
            <div className='sidebarList'>
              <ul>
                <Link to='/app/users'>
                  <i className="fas fa-users fa-2x"></i> <br/>
                  Pracownicy
                </Link>
              </ul>
            </div>

            <div className='sidebarList'>
              <ul>
                <Link to="/app/projects">
                  <i className="fas fa-clipboard-list fa-2x"></i> <br/>
                  Projekty
                </Link>
              </ul>
            </div>

            <div className='sidebarList'>
              <ul>
                <Link to="/app/salaries">
                  <i className="fas fa-wallet fa-2x"></i><br/>
                  Wypłaty
                </Link>
              </ul>
            </div>
          </div>
        )
    }
}