import React, {Component} from 'react'

export default class Sidebar extends Component {
    render() {
        return (
          <div className="container-fluid sidebarPadding">
            <div className="sidebarWidth">
              <nav className="navbar-default navbar-fixed-side sidebarLi">
                  <li>
                    Pulpit
                  </li>
                  
                  <li>
                    Devs
                  </li>

                  <li>
                    Projekty
                  </li>

                  <li>
                    Wypłaty
                  </li>
              </nav>
            </div>
          </div>
        )
    }
}