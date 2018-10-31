import React, {Component} from 'react'

export default class Sidebar extends Component {
    render() {
        return (
          <div className="navbar-default navbar-fixed-side sidebar">
            <div className='sidebarList'>
              <ul>
                <a href="/dashboard"> 
                  <i className="fas fa-home fa-2x"></i><br/>
                  Pulpit
                </a>
              </ul>
            </div>
            
            <div className='sidebarList'>
              <ul>
                <a href="/users">
                  <i className="fas fa-users fa-2x"></i> <br/>
                  Devs
                </a>
              </ul>
            </div>

            <div className='sidebarList'>
              <ul>
                <a href="/projects">
                  <i className="fas fa-clipboard-list fa-2x"></i> <br/>
                  Projekty
                </a>
              </ul>
            </div>

            <div className='sidebarList'>
              <ul>
                <a href="/salaries">
                  <i className="fas fa-wallet fa-2x"></i><br/>
                  Wypłaty
                </a>
              </ul>
            </div>
          </div>
        )
    }
}