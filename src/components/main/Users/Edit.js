import React, {Component} from 'react'
import { checkToken, checkStatus } from '../../Common'
import { Redirect } from 'react-router-dom'
import Loader from '../../navigation/Loader'
import './Users.scss'

export default class UsersEdit extends Component {
    constructor(props) {
        super(props)
        this.snackbar = React.createRef()
        this.state = {
            fetch: false,
            loading: true,
            redirect: false,
            userId: this.props.match.params.id
        }
    }

    async componentDidMount() {
        checkToken(this.props.history)

        let res = await fetch(`http://localhost:8002/users/${this.state.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        res = await res.json()
        this.setState(({name, surname, salaryNetto, salaryBrutto, email, role}) => res)
        this.setState({ loading: false })
    }

    editUser = () => {
        const body = (({name, surname, salaryNEtto, salaryBrutton, email, role}) => ({name, surname, salaryNEtto, salaryBrutton, email, role}))(this.state)
        console.log(body)
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    render() {

        const { loading, redirect } = this.state
        
        if (loading) {
            return <Loader/>
        }
        if (redirect) {
            return <Redirect to="/app/users" />
        }

        return ( 
            <div className='mainDescription'>
                <div className='dashboard dashboard-list'>
                    <p className='page-title'> Users </p>
                    <p className='page-undertitle'> You're currently on user editing page </p>
                </div>

                <div className='buttonsDiv'>
                    <p className='btn btn-common btn-primary btn-common-return' onClick={() => this.setState({redirect: true}) }> <i className="fas fa-chevron-left"></i> </p>
                    <p className='btn btn-common btn-primary btn-common-add' onClick={this.editUser}> Add </p>
                </div>
    
                <div className='recordCards recordCards-add'>
                    <div className='card' style={{ width: '100%' }}>
                        <div className='card-body' style={{ display: 'flex' }}>
                            <div className="form-group form-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <div style={{ textAlign: 'left', width: '270px'}}>
                                        Name <input name='Name' type="text" label='test' className="form-control" value={this.state.name} onChange={this.handleChange('name')}/>
                                        Email <input name='Email' type="text" className="form-control" placeholder='Email' value={this.state.email} onChange={this.handleChange('email')}/>
                                        Salary Netto <input name='SalaryNetto' type="number" className="form-control" placeholder={0} onChange={this.handleChange('salaryNetto')}/>
                                        Role <input name='Role' type="text" className="form-control" placeholder='Role' value={this.state.role} onChange={this.handleChange('role')}/>
                                    </div>

                                    <div style={{ textAlign: 'right', width: '270px' }}>
                                        Surname <input name='Surname' type="text" className="form-control" placeholder="Surname" value={this.state.surname} onChange={this.handleChange('surname')}/>
                                        Settlement method <input name='SettlementMethod' type="text" className="form-control" placeholder="Settlement method" value={this.state.settlementMethod} onChange={this.handleChange('settlementMethod')}/>
                                        Salary Brutto <input name='SalaryBrutto' type="number" className="form-control" placeholder={0} value={this.state.salaryBrutto} onChange={this.handleChange('salaryBrutto')}/>
                                        CV/Resume <input name='Resume' type="file" />
                                    </div>
                                </div>
                            </div>

                            <div className='uploadPhoto' style={{marginBottom: '220px', marginTop: '5px'}}>
                                <div className='selectedImage' >
                                    <div className='userShowName'>
                                        <p>{this.state.name[0]}{this.state.surname[0]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="snackbar" ref={this.snackbar}>{this.state.snackbarText}</div>
            </div>
        )
    }
}