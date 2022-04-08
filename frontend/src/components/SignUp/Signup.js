import React , {Component} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router';
import { Link } from 'react-router-dom';
import { CForm, CFormLabel, CFormInput, CCol, CButton, CRow, CContainer, CTabContent, CLink } from '@coreui/react';

class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            name: "",
            image:"default.jpeg",
            created:false,
            message: ""
        }

        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHander = this.passwordChangeHander.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
    }

    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        });
    }
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        });
    }
    passwordChangeHander = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    submitSignup = (e) => {

        //prevent page from refresh
        e.preventDefault();

        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            image:"/default.jpeg"
        }
        
        axios.post("http://localhost:3001/api/v1/users", data)
            .then(response => {
                console.log("Status code" , response.status);

                if(response.status === 200){
                    this.setState({
                        created: true
                    })
                }
                else{
                    this.setState({
                        message: "Could Not Sign Up"
                    })
                }
            })
    }

    render(){
        let redirectVar = null;
        if(this.state.created === true){
           redirectVar = <Navigate to= "/login"/>
        }
        return(
            <><div className='App'>
                {redirectVar}
                <br />
                <br />
                <br />
                <br />
            </div>
            <CContainer className="mx-auto" >
            
            <h1>Sign Up <img className='logo-center' src="/Etsy_logo.png" alt="Etsy Nav logo" width={120} height={60} style={{marginRight:50}}></img> </h1>

                <CRow style={{marginLeft:1000}} className="mb-3">
                    <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">Username</CFormLabel>
                    <CCol xs="auto">
                        <CFormInput onChange={this.usernameChangeHandler} type="text" id="username" />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">Name</CFormLabel>
                    <CCol xs="auto">
                        <CFormInput onChange={this.nameChangeHandler} type="text" id="name" />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</CFormLabel>
                    <CCol xs="auto">
                        <CFormInput onChange={this.emailChangeHandler} type="email" id="email" />
                    </CCol>
                </CRow>
                <CRow className="mb-3">
                    <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</CFormLabel>
                    <CCol xs="auto">
                        <CFormInput onChange={this.passwordChangeHander} type="password" id="password" />
                    </CCol>
                </CRow>
                <CButton style={{width:420}} onClick={this.submitSignup} type="submit">Sign Up</CButton>
                <br/>
                <br/>
                <Link to="/login">Have an account? Login Here</Link>

            </CContainer>

                
            </>

                
        );
    }
}

export default Signup;