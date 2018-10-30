import React, {Component} from 'react'
import logo from '../logoSD.png'

export default class Navbar extends Component {
  render() {
    return (
        <div>
        <nav className="navbar navbar-default" style={{maxHeight: '90px' }}>
          <div className="container-fluid">
            <div className="navbar-header">
              <img alt="Brand" height={90} src={logo}/>
            </div>

            <div className="navbar-rightSide">
              
              <p className="navbar-text navbar-right navbar-list">
                <a href="/myprofile" className="navbar-link navbar-words"> Cześć, IMIE </a>
              </p>

              <p className="navbar-text navbar-right navbar-list">
                <a href="/myphoto" className="navbar-link">
                  <img alt="Avatar" className='roundPhoto' src='https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-768x512.jpg'/>
                </a>
              </p>

              <p className="navbar-text navbar-right navbar-list">
                <a href="/logout" className="navbar-link navbar-words" style={{paddingRight: '10px'}}> Wyloguj </a>
                <i className="fas fa-power-off fa-lg"></i>
              </p>

            </div>
          </div>
          <div className="container-fluid sidebarPadding">
            <div className="row">
              <div className="col-sm-3 col-lg-2 sidebarWidth">
                <nav className="navbar navbar-default navbar-fixed-side sidebarLi">
                    <li>
                      Pulpit
                    </li>
                    
                    <li>
                      Pracownicy
                    </li>

                    <li>
                      Projekty
                    </li>

                    <li>
                      Wypłaty
                    </li>
                </nav>
              </div>
              <div className="col-sm-9 col-lg-10" style={{backgroundColor: 'grey'}}>
              {/* <!-- your page content --> */}
              something
              </div>
            </div>
          </div>

        </nav>
      </div>
    )
  }
}