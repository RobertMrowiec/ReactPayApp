import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { checkToken, checkStatus } from '../../Common';
import Loader from '../../navigation/Loader'
import * as ReactQuill from 'react-quill';
import axios from 'axios'
import './Projects.scss';

export default class ProjectsAdd extends Component {
    constructor(props) {
        super(props)
        this.snackbar = React.createRef()
        this.state = {
            fetch: false,
            loading: false,
            name: '',
            description: '',
            priceBrutto: 0,
            priceNetto: 0,
            redirect: false,
            users: [],
            fileUrl: 'http://inteligenciamm.com.br/wp-content/uploads/2015/10/Logo-Default.png',
            photo: ''
        }
    }

    componentDidMount() {
        checkToken(this.props.history)
    }

    addProject = () => {
        const { name, priceNetto, priceBrutto, description, fileUrl } = this.state
        
        if ( !name ) {
            return this.snackbarRender('name')
        }
        if ( !description ) {
            return this.snackbarRender('description')
        }
        
        const body = {
            name,
            priceNetto,
            priceBrutto,
            description,
            photo: fileUrl.substring(5)
        }
        
        this.setState({loading: true})
        return fetch('http://localhost:8002/projects', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(checkStatus)
        .then(x => x.json())
        .then(x => this.setState({ projectId: x.id}))
        .then(() => {
            if (this.state.fileUrl !== 'http://inteligenciamm.com.br/wp-content/uploads/2015/10/Logo-Default.png') {
                this.handleUpload()
            } else {
                this.setState({ loading: false, redirect: true })
            }
        })
    }
    
    handleChange = name => event => {
        if (name === 'priceNetto') {
            this.setState({
                [name]: (Number(event.target.value)).toFixed(2),
                priceBrutto: (Number(event.target.value * 1.23)).toFixed(2)
            });
        } else if (name === 'priceBrutto') {
            this.setState({
                [name]: (Number(event.target.value)).toFixed(2),
                priceNetto: (Number(event.target.value / 1.23)).toFixed(2)
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
    
    handleUpload = () => {
        const data = new FormData()
        data.append('file', this.state.file, this.state.file.name)

        axios
        .put(`http://localhost:8002/projects/${this.state.projectId}/upload`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            onUploadProgress: ProgressEvent => {
                this.setState({
                    loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                })
            },
        })
        .then(res => {
            console.log(res.statusText)
        })
        .then(() => this.setState({ loading: false, redirect: true }))
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
            return <Redirect to="/app/projects" />
        }

        return (
            <div className='mainDescription'>
                <div className='dashboard dashboard-list'>
                    <p className='page-title'> Projects </p>
                    <p className='page-undertitle'> You're currently on project creating page </p>
                </div>

                <div className='buttonsDiv'>
                    <p className='btn btn-common btn-primary btn-common-return' onClick={() => this.setState({redirect: true}) }> <i className="fas fa-chevron-left"></i> </p>
                    <p className='btn btn-common btn-primary btn-common-add' onClick={this.addProject}> Add </p>
                </div>

                <div className='recordCards recordCards-add'>
                    <div className='card' style={{ width: '100%' }}>
                        <div className='card-body' style={{ display: 'flex' }}>
                            <div className="form-group form-card">
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '30%'}}>
                                    <div style={{ textAlign: 'left', width: '270px'}}>
                                        <div style={{ height: '50%' }}>
                                            Name <input required name='name' type="text" label='test' className="form-control" placeholder={this.state.name} value={this.state.name} onChange={this.handleChange('name')}/>
                                        </div>
                                        <div style={{ height: '50%' }}>
                                            Netto price <input required name='priceNetto' type="number" className="form-control"  placeholder={this.state.priceNetto} onChange={this.handleChange('priceNetto')}/>
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'right', width: '270px', paddingRight: '10px' }}>
                                    <div style={{ height: '50%' }}>
                                        Client <select className="form-control" id="exampleFormControlSelect1">
                                            {this.state.clients}
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                    <div style={{ height: '50%' }}>
                                        {/* Client <input name='name' type="select" className="form-control" placeholder="Client" value={this.state.client} onChange={this.handleChange('client')}/> */}
                                        Brutto price <input name='priceBrutto' type="number" className="form-control" placeholder="Price Brutto" value={this.state.priceBrutto} onChange={this.handleChange('priceBrutto')}/>
                                    </div>
                                    </div>
                                </div>

                                <ReactQuill
                                    value={this.state.description}
                                    onChange={this.changeDescription}
                                    className="quillMain"
                                    style={{ paddingTop: '10px', paddingRight: '10px', height: '69%'}}
                                />
                            </div>

                            <div className='uploadPhoto' style={{marginTop: '5px'}}>
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
