import React, {Component} from 'react'
import { checkToken, checkStatus } from '../../Common';
import Loader from '../../navigation/Loader'
import {Link} from 'react-router-dom'

export default class Projects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            loading: true
        }
    }

    componentDidMount() {
        checkToken(this.props.history)

        fetch('http://localhost:8002/projects', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(checkStatus)
        .then(x => x.json())
        .then(data => this.setState({projects: data, loading: false}))
        .catch(err => console.log(err))
    }
    render() {
        const { loading } = this.state
        
        if (loading) {
            return <Loader/>
        }

        return (
            <div className='mainDescription-projects'>
                <div className='dashboard dashboard-projects'>
                    <p className='page-title'> Projects </p>
                    <p className='page-undertitle'> You're currently on projects page </p>
                </div>

                <div className='addDiv'>
                    <Link to='/app/projects/add' className='btn btn-projects btn-primary btn-projects-add'> Add </Link>
                </div>
                <div className='projectsCards'>
                    {this.state.projects.map((obj, i) => {
                        return (
                            <div className='card' style={{width: '18rem'}}>
                                <div className='card-body'>
                                    <img alt='' className='card-img-top' src={obj.photo}/>
                                    <h5 className='card-title'>{obj.name}</h5>
                                    <p className='card-text'>{obj.photo}</p>
                                    <Link to='/projects/' className='btn btn-projects btn-primary'> Details </Link>
                                    <Link to='/projects/' className='btn btn-edit btn-edit-projects'> <i className="far fa-edit fa-projects"></i> </Link>
                                    <Link to='/projects/' className='btn btn-danger'> <i className="far fa-trash-alt fa-projects-delete"></i> </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}