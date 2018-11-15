import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Navbar from './navigation/Navbar'
import Sidebar from './navigation/Sidebar'

export default class Main extends Component {
    render() {
        return (
            <div style={{height: '9vh'}}>

                <div className="App">
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossOrigin="anonymous"></script>
                    <Navbar />
                </div>
        
                <Sidebar />
            </div>
        )
    }
}