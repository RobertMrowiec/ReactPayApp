import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import { checkToken, checkStatus } from '../../Common';
import Loader from '../../navigation/Loader'
import axios from 'axios'
import * as ReactQuill from 'react-quill'; 

export default class ProjectsEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: '',
            fileUrl: 'http://inteligenciamm.com.br/wp-content/uploads/2015/10/Logo-Default.png',
            fetch: false,
            loading: true,
            redirect: false,
            users: [],
            photo: '',
            projectId: this.props.match.params.id,
            files: ['index.html']
        }
    }

    componentDidMount() {
        
        checkToken(this.props.history)

        return fetch(`http://localhost:8002/projects/${this.state.projectId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(x => x.json())
        .then(x => {
            this.setState({
                name: x.name,
                description: x.description,
                priceNetto: x.priceNetto || 0,
                priceBrutto: x.priceBrutto || 0,
                fileUrl: x.photo
            })
        }).then(x => this.setState({loading: false}))
    }

    editProject = () => {
        const body = {
            name: this.state.name,
            priceNetto: this.state.priceNetto,
            priceBrutto: this.state.priceBrutto,
            description: this.state.description || 'No description'
        }
        this.setState({loading: true})
        return fetch(`http://localhost:8002/projects/${this.state.projectId}`, {
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
    }

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
        this.setState({loading: true})
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
            this.setState({loading: false})
            console.log(res.statusText)
        })
    }

    uploadButton() {
        if (this.state.file) {
            return <p className='btn btn-common btn-primary btn-uploadFile' onClick={this.handleUpload}> Upload </p>
        }
    }

    handleInit() {
        console.log('FilePond instance has initialised', this.pond);
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
                    <p className='btn btn-common btn-primary btn-common-add' onClick={this.editProject}> Edit </p>
                </div>

                <div className='projectsCards projectsCards-add'>
                    <div className='card' style={{ width: '100%' }}>
                        <div className='card-body' style={{ display: 'flex' }}>
                            <div className="form-group form-card">
                                        
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <div style={{ textAlign: 'left', width: '270px'}}>
                                        Name <input name='name' type="text" className="form-control" placeholder={this.state.name} value={this.state.name} onChange={this.handleChange('name')}/>
                                        Netto price <input name='priceNetto' type="number" className="form-control"  placeholder={this.state.priceNetto} onChange={this.handleChange('priceNetto')}/>
                                    </div>

                                    <div style={{ textAlign: 'right', width: '270px' }}>
                                        Client <input name='name' type="select" className="form-control" placeholder="Client" value={this.state.client} onChange={this.handleChange('client')}/>
                                        Brutto price <input name='priceBrutto' type="number" className="form-control" placeholder="Price Brutto" value={this.state.priceBrutto} onChange={this.handleChange('priceBrutto')}/>
                                    </div>
                                </div>

                                <ReactQuill
                                    value={this.state.description}
                                    onChange={this.changeDescription}
                                    className="quillMain"
                                    style={{ paddingTop: '10px'}}
                                />

                            </div>

                            <div className='uploadPhoto' style={{marginBottom: '220px' }}>
                                {/* <FilePond
                                    allowImagePreview={true}
                                    ref={ref => this.pond = ref}
                                    allowMultiple={true}
                                    maxFiles={3}
                                    server='/api'
                                    onupdatefiles={(fileItems) => this.setState({
                                        files: fileItems.map(fileItem => fileItem.file)
                                    })}>
                                    
                                    {this.state.files.map(file => (
                                        <File key={file} src={file} origin="local" />
                                    ))}
                                </FilePond> */}
                                <div className='selectedImage' >
                                    <img alt='' src={this.state.fileUrl}/>
                                </div>
                                <div>
                                    <input type='file' accept='.png' name='projectPhoto' style={{ width: '240px', paddingTop: '20px'}} onChange={this.handleSelectedFile}/>
                                </div>
                                {this.uploadButton()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
