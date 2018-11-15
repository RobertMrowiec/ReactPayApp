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
        // .then(tempData => {
        //     for(let i = 0; i < tempData.length; i++) {
        //         if (tempData[i].description.length > 23) {
        //             tempData[i].description = tempData[i].description.substring(0,23)
        //         }
        //     }
        .then(data => this.setState({projects: data, loading: false}))
        .catch(err => console.log(err))
    }

    descriptionFunction = (obj) => {
        if (obj.description.length > 26) {
            return (<p className='card-text'>{obj.description.substr(0, 23) + '...'}</p>)
        }
        return (<p className='card-text'>{obj.description}</p> )
    }

    remove = (id) => {
        fetch(`http://localhost:8002/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(x => x.json())
        .then(x => {
            let newList = this.state.projects.filter(x => x.id !== id)
            this.setState({projects: newList})
        })
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
                                    {this.descriptionFunction(obj)}
                                    {/* <p className='card-text'>{obj.description}</p> */}
                                    <p className='btn btn-projects btn-primary'> Details </p>
                                    <p className='btn btn-edit btn-edit-projects'> <i className="far fa-edit fa-projects"></i> </p>
                                    <p className='btn btn-danger' onClick={() => this.remove(obj.id)}> <i className="far fa-trash-alt fa-projects-delete"></i> </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
