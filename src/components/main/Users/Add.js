import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { checkToken, checkStatus } from '../../Common';
import Loader from '../../navigation/Loader'
import axios from 'axios'

export default class ProjectsAdd extends Component {
    constructor(props) {
        super(props)
        this.snackbar = React.createRef()
        this.state = {
            fetch: false,
            loading: false,
            name: '',
            surname: '',
            salaryBrutto: 0,
            salaryNetto: 0,
            redirect: false,
            users: []
        }
    }

    componentDidMount() {
        checkToken(this.props.history)
    }

    addProject = () => {
        const { name, surname, salaryNetto, salaryBrutto, description, fileUrl } = this.state
        
        if ( !name ) {
            return this.snackbarRender('name')
        }
        if ( !description ) {
            return this.snackbarRender('description')
        }

        const body = {
            name,
            surname,
            salaryNetto,
            salaryBrutto,
            description,
            photo: fileUrl.substring(5)
        }
        
        this.setState({loading: true})
        return fetch('http://localhost:8002/users', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(checkStatus)
        .then(x => x.json())
        .then(x => this.setState({ alert: true, projectId: x.id, loading: false, redirect: true}))
    }
    
    handleChange = name => event => {
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
                    <p className='page-undertitle'> You're currently on user adding page </p>
                </div>

                <div className='addDiv'>
                    <p className='btn btn-projects btn-primary btn-projects-return' onClick={() => this.setState({redirect: true}) }> <i className="fas fa-chevron-left"></i> </p>
                    <p className='btn btn-projects btn-primary btn-projects-add' onClick={this.addProject}> Add </p>
                </div>

                <div className='projectsCards projectsCards-add'>
                    <div className='card' style={{ width: '100%' }}>
                        <div className='card-body' style={{ display: 'flex' }}>
                            <div className="form-group form-card">
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <div style={{ textAlign: 'left', width: '270px'}}>
                                        Name <input name='Name' type="text" label='test' className="form-control" value={this.state.name} onChange={this.handleChange('name')}/>
                                        Email <input name='Email' type="text" className="form-control" placeholder='Email' value={this.state.email} onChange={this.handleChange('email')}/>
                                        Salary Netto <input name='SalaryNetto' type="number" className="form-control" placeholder={0} onChange={this.handleChange('SalaryNetto')}/>
                                        Role <input name='Role' type="text" className="form-control" placeholder='Role' value={this.state.role} onChange={this.handleChange('Role')}/>
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
                                    <img alt='' src={this.state.fileUrl}/>
                                </div>
                                <div>
                                    <input type='file' accept='.png' name='projectPhoto' style={{ width: '240px', paddingTop: '30px'}} onChange={this.handleSelectedFile}/>
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
