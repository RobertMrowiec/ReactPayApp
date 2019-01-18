import React, {Component} from 'react'
import { checkToken, checkStatus } from '../../Common'
import { Redirect } from 'react-router-dom'
import Alert from '../../navigation/Alert'
import Loader from '../../navigation/Loader'
import Select from 'react-select';
import './Users.scss'
import './Selector.scss'

export default class UsersEdit extends Component {
    constructor(props) {
        super(props)
        this.snackbar = React.createRef()
        this.state = {
            fetch: false,
            loading: true,
            redirect: false,
            selector: false,
            selectedOption: '',
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
        this.setState({
            name: res.name,
            previousName: res.name,
            surname: res.surname,
            salaryNetto: res.salaryNetto || 0,
            salaryBrutto: res.salaryBrutto || 0,
            settlementMethod: res.settlementMethod,
            email: res.email,
            role: res.role,
            loading: false
        })
    }

    editUser = () => {
        this.setState({loading: true})
        const body = (({name, surname, salaryNetto, salaryBrutton, settlementMethod, email, role}) => ({name, surname, salaryNetto, salaryBrutton, settlementMethod, email, role}))(this.state)

        if (this.state.previousName !== this.state.name){
            return this.setState({relog: true})
        }

        return fetch(`http://localhost:8002/users/${this.state.userId}`, {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(checkStatus)
        .then(x => x.json())
        .then(x => this.setState({loading: false, redirect: true}))
    }

    selectorChange = () => {        
        this.setState({selector: !this.state.selector})
    }
    
    selector = () => {
        if (this.state.selector){
            return (
                <div className='selector'>
                    <input name='B2B' label='B2B' type="text" value={this.state.b2b} onChange={this.handleChange('settlementMethod')}/>
                    <input name='UoP' label='UoP' type="text" value={this.state.uop} onChange={this.handleChange('settlementMethod')}/>
                </div>
            )
        }
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedOption });
    }
    
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    render() {

        const { loading, redirect, relog, selectedOption } = this.state

        const options = [
            { value: 'B2B', label: 'B2B' },
            { value: 'UoP', label: 'Umowa o pracę' },
        ]

        const customStyles = {
            control: (base, state) => ({
                ...base,
                '&:hover': { borderColor: 'gray', boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"},
                boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(0,123,255,.25)": 'none',
                borderColor: 'lightgray',
            }),
            option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? '#402887b0' : state.isFocused ? 'lightgray' : 'white'
            })
        };

        if (relog) {
            return <Alert/>
        }

        if (loading) {
            return <Loader/>
        }
        if (redirect) {
            return <Redirect to="/app/users"/>
        }

        return ( 
            <div className='mainDescription'>
                <div className='dashboard dashboard-list'>
                    <p className='page-title'> Users </p>
                    <p className='page-undertitle'> You're currently on user editing page </p>
                </div>

                <div className='buttonsDiv'>
                    <p className='btn btn-common btn-primary btn-common-return' onClick={() => this.setState({redirect: true}) }> <i className="fas fa-chevron-left"></i> </p>
                    <p className='btn btn-common btn-primary btn-common-add' onClick={this.editUser}> Edit </p>
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

                                    <div style={{ textAlign: 'right', width: '270px', marginRight: '10px' }}>
                                        Surname <input name='Surname' type="text" className="form-control" placeholder="Surname" value={this.state.surname} onChange={this.handleChange('surname')}/>
                                        Settlement Method <Select
                                            className="selectForm"
                                            value={selectedOption}
                                            onChange={this.handleChangeSelect}
                                            options={options}
                                            styles={customStyles}
                                        />
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