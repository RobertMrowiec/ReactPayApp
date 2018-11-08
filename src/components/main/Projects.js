import React, {Component} from 'react'
import { checkToken } from '../Common';
import Loader from '../navigation/Loader'
import bpcLogo from './bpc.png'
import {Link} from 'react-router-dom'

export default class Projects extends Component {
    constructor(props) {
        super(props)
        this.state = {}
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
                <div className='card' style={{width: '18rem'}}>
                    <img alt='' className='card-img-top' src={bpcLogo}/>
                    <div className='card-body'>
                        <h5 className='card-title'>Card title</h5>
                        <p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <Link to='/projects/' className='btn btn-primary'> Go somewhere </Link>
                    </div>
                </div>

            </div>
        )
    }
}
