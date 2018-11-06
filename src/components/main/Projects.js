import React, {Component} from 'react'
import { checkToken } from '../Common';

export default class Projects extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        checkToken(this.props.history)
    }

    render() {
        return (
            <div className='mainDescription'>
                Projekty  
            </div>
        )
    }
}
