import React, {Component} from 'react'
import { checkToken } from '../Common';
import Loader from '../navigation/Loader'

export default class MyProfile extends Component {
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

        return(
            <div className='mainDescription'>
                Some profile settings
            </div>
        )
    }
}