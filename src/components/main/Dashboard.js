import React, {Component} from 'react'
import { checkToken } from '../Common';
import Loader from '../navigation/Loader'

export default class DashboardMain extends Component {
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
                ELO HERE DASHBOARD 
            </div>
        )
    }
}
