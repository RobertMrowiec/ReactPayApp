import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { checkToken, checkStatus } from '../../Common';
import Loader from '../../navigation/Loader'
import './Users.scss';
import Select from 'react-select';

export default class UsersAdd extends Component {
    constructor(props) {
        super(props)
        this.snackbar = React.createRef()
        this.state = {
            fetch: false,
            checkedSalary: false,
            loading: false,
            name: '',
            email: '',
            surname: '',
            salaryBrutto: 0,
            salaryNetto: 0,
            settlementMethod: '',
            role: '',
            redirect: false,
        }
    }

    componentDidMount() {
        checkToken(this.props.history)
    }

    addUser = () => {
        const { name, surname, salaryNetto, settlementMethod, salaryBrutto, email, role } = this.state
        
        switch(true) {
            case !this.state.name :
                return this.snackbarRender('name')
            case !this.state.surname: 
                return this.snackbarRender('surname')
            case !this.state.email: 
                return this.snackbarRender('email')
            case !this.state.role: 
                return this.snackbarRender('role')
            case !this.state.settlementMethod: 
                return this.snackbarRender('settlement method')

            default:
        }

        const body = {
            name,
            surname,
            salaryNetto,
            salaryBrutto,
            settlementMethod: settlementMethod.value,
            email,
            role,
        }

        this.setState({loading: true})
        return fetch('http://localhost:8002/users', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(x => x.json())
        .then(x => this.setState({ userId: x.id, loading: false, redirect: true}))
    }
    
    handleChange = name => event => {
        if (name === 'settlementMethod') return this.setState({[name]: event.value.toString()})
        if (name === 'salaryNetto') {
            this.setState({
                [name]: (Number(event.target.value)).toFixed(2),
                salaryBrutto: (Number(event.target.value * 1.23)).toFixed(2)
            });
        } else if (name === 'salaryBrutto') {
            this.setState({
                [name]: (Number(event.target.value)).toFixed(2),
                salaryNetto: (Number(event.target.value / 1.23)).toFixed(2)
            });
        }
        this.setState({
            [name]: event.target.value,
        });
    };

    changeDescription = value => {
        this.setState({ description: value })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({ settlementMethod: selectedOption });
    }

    handleSelectedFile = event => {
        return this.setState({
            file: event.target.files[0],
            fileUrl: URL.createObjectURL(event.target.files[0]),
            loaded: 0,
        })
    }
    
    snackbarRender = form => {
        this.setState({snackbarText: `You forgot to add ${form}`})
        const snackbar = this.snackbar.current
        snackbar.className = 'show'
        setTimeout(() => snackbar.className = '', 3000)
    }

    salaryNetto = () => {
        if (this.state.checkedSalary) return (
            <div> Salary Netto <input name='SalaryNetto' type="number" className="form-control" placeholder={0} onChange={this.handleChange('salaryNetto')}/> </div>
        )
    }

    salaryBrutto = () => {
        if (this.state.checkedSalary) return (
            <div> Salary Brutto <input name='SalaryBrutto' type="number" className="form-control" placeholder={0} value={this.state.salaryBrutto} onChange={this.handleChange('salaryBrutto')}/> </div>
        )
    }

    render() {
        
        const { loading, redirect } = this.state
        
        const options = [
            { value: 'None', label: 'Brak'},
            { value: 'B2B', label: 'B2B' },
            { value: 'UoP', label: 'Umowa o pracę' }
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

        
        if (this.checkedSalary) {
            return 
        }
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
                    <p className='page-undertitle'> You're currently on user adding page </p>
                </div>

                <div className='buttonsDiv'>
                    <p className='btn btn-common btn-primary btn-common-return' onClick={() => this.setState({redirect: true}) }> <i className="fas fa-chevron-left"></i> </p>
                    <p className='btn btn-common btn-primary btn-common-add' onClick={this.addUser}> Add </p>
                </div>

                <div className='recordCards recordCards-add'>
                    <div className='card' style={{ width: '100%' }}>
                        <div className='card-body' style={{ display: 'flex' }}>
                            <div className="form-group form-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <div style={{ textAlign: 'left', width: '270px'}}>
                                        Name <input name='Name' type="text" label='test' className="form-control" value={this.state.name} onChange={this.handleChange('name')}/>
                                        Email <input name='Email' type="text" className="form-control" placeholder='Email' value={this.state.email} onChange={this.handleChange('email')}/>
                                        Salary <input type="checkbox" onClick={() => this.setState({checkedSalary: !this.state.checkedSalary})}/> <br />
                                        {this.salaryNetto()}
                                        Role <input name='Role' type="text" className="form-control" placeholder='Role' value={this.state.role} onChange={this.handleChange('role')}/>
                                    </div>

                                    <div style={{ textAlign: 'right', width: '270px', marginRight: '10px' }}>
                                        Surname <input name='Surname' type="text" className="form-control" placeholder="Surname" value={this.state.surname} onChange={this.handleChange('surname')}/>
                                        Settlement Method <Select
                                            className="selectForm"
                                            value={this.state.settlementMethod}
                                            onChange={this.handleChangeSelect}
                                            options={options}
                                            styles={customStyles}
                                        /> <br />
                                        {this.salaryBrutto()}
                                        CV/Resume <input name='Resume' type="file" />
                                    </div>
                                </div>
                            </div>

                            <div className='uploadPhoto' style={{marginBottom: '220px', marginTop: '5px'}}>
                                <div className='selectedImageUsers' >
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
