import React, {Component} from 'react'
import { checkStatus, checkToken } from '../Common'
import fetch from 'node-fetch'
import Loader from '../navigation/Loader'

export default class Userss extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            users: []
        }
    }

    componentDidMount() {
        checkToken(this.props.history)

        return fetch('http://localhost:8002/users', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(checkStatus)
        .then(x => x.json())
        .then(users => this.setState({users, loading: false}))
        .catch(err => console.log('Error: ', err))

    }

    render() {
        const { loading } = this.state
        
        if (loading) {
            return <Loader/>
        }
        return (
            <div className='mainDescription'>
                Juser tutaj 
            </div>
        )
    }
}
