import React, {Component} from 'react'
import { checkToken } from '../Common';

export default class Salaries extends Component {
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
                $$ $$   
            </div>
        )
    }
}
