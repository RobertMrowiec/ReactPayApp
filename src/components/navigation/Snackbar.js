import React, {Component} from 'react'

export default class Snackbar extends Component {
    render(){
        return (
            <div id="snackbar" ref={this.snackbar}>Some text some message..</div>
        )
    }
}