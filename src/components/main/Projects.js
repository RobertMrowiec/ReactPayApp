import React, {Component} from 'react'
import { checkToken, checkStatus } from '../Common';
import Loader from '../navigation/Loader'
import {Link} from 'react-router-dom'
import bpcLogo from './bpc.png'

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
            <div className='mainDescription'>
                <div className='projectsCards'>
                    {this.state.projects.map((obj, i) => {
                        return (
                            <div className='card' style={{width: '18rem'}}>
                                <div className='card-body'>
                                    <img alt='' className='card-img-top' src={obj.photo}/>
                                    <h5 className='card-title'>{obj.name}</h5>
                                    <p className='card-text'>{obj.photo}</p>
                                    <Link to='/projects/' className='btn btn-projects btn-primary'> Check project </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
