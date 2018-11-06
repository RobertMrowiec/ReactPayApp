import React, {Component} from 'react'
import { checkToken } from '../Common';

export default class MyProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        checkToken(this.props.history)
    }

    render() {
        console.log(123);
        return(
            <div className='mainDescription'>
                Some profile settings
            </div>
        )
    }
}