import React, {Component} from 'react'
import { checkToken, checkStatus } from '../../Common';
import Loader from '../../navigation/Loader'
import {Link} from 'react-router-dom'

export default class Projects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            loading: false
        }
    }

    componentDidMount() {
        checkToken(this.props.history)
    }
    render() {
        const { loading } = this.state
        
        if (loading) {
            return <Loader/>
        }

        return (
            <div className='mainDescription'>
                <div className='dashboard dashboard-projects'>
                    <p className='page-title'> Projects </p>
                    <p className='page-undertitle'> You're currently on project creating page </p>
                </div>

                <div className='projectsCards' style={{height: '81vh', width: ''}}>
                    <div className='card' style={{width: '70rem'}}>
                        <div className='card-body'>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
