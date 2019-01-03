import React, {Component} from 'react'
import { checkToken, checkStatus } from '../../Common';
import Loader from '../../navigation/Loader'
import {Link} from 'react-router-dom'
import './Users.scss'

export default class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            loading: true
        }
    }

    componentDidMount() {
        checkToken(this.props.history)

        fetch('http://localhost:8002/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(checkStatus)
        .then(x => x.json())
        .then(data => this.setState({users: data, loading: false}))
        .catch(err => console.log(err))
    }

    remove = (id) => {
        fetch(`http://localhost:8002/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(x => x.json())
        .then(x => {
            let newList = this.state.users.filter(x => x.id !== id)
            this.setState({users: newList})
        })
    }

    render() {
        const { loading } = this.state
        
        if (loading) {
            return <Loader/>
        }

        return (
            <div className='mainDescription-list'>
                <div className='dashboard dashboard-list'>
                    <p className='page-title'> Users </p>
                    <p className='page-undertitle'> You're currently on users page </p>
                </div>

                <div className='addDiv'>
                    <Link to='/app/users/add' className='btn btn-projects btn-primary btn-projects-add'> Add </Link>
                </div>
                <div className='projectsCards'>
                    {this.state.users.map((obj, i) => {
                        return (
                            <div key={obj.id} className='card card-projects' style={{width: '18rem'}}>
                                <div className='card-body card-body-projects'>
                                    <div className="center-card-img">
                                        <div className='userShowName'>
                                            <p>{obj.name[0]}{obj.surname[0]}</p>
                                        </div>
                                    </div>
                                    <h5 className='card-title' >{obj.name + obj.surname}</h5>
                                    <p className='card-text-description'>{obj.email}</p>
                                    <div className='card-projects-buttons'>
                                        <Link to={`/app/users/edit/${obj.id}`} className='btn btn-edit btn-edit-projects'> <i className="far fa-edit fa-projects"></i> </Link>
                                        <p className='btn btn-danger' onClick={() => this.remove(obj.id)}> <i className="far fa-trash-alt fa-projects-delete"></i> </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
