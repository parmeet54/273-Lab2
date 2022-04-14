import React , {Component} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router';
import { Link } from 'react-router-dom';
import { CForm, CFormLabel, CFormInput, CCol, CButton, CRow, CContainer, CTabContent } from '@coreui/react';
import jwt_decode from 'jwt-decode';
import { login } from '../../redux/actions';
import { connect } from "react-redux";


class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            auth:false,
            message: "",
            token:"" 
        }

        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHander = this.passwordChangeHander.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        });
    }
    passwordChangeHander = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    submitLogin = (e) => {
        const data = {
            username: this.state.username,
            password: this.state.password,
        }
        
        axios.post("http://localhost:3001/api/v1/auth/login", data)
            .then(response => {
                console.log("Status code" , response.status);
                if(response.status === 200){

                    //sessionStorage.setItem("token", data.username);

                    const resToken = response.data.token; 
                    this.setState({
                        token: resToken
                    })

                    const decoded = jwt_decode(resToken.split('.')[1], { header: true });

                    console.log(decoded);
                    console.log("Login Successful:",decoded.username)

                    sessionStorage.setItem("user_id", decoded._id);
                    sessionStorage.setItem("token", decoded.username);


                    this.setState({
                        auth: true
                    })
                    this.props.login()

                    axios.get("http://localhost:3001/api/v1/shops/usershop/"+data.username)
                    .then(response => {
                    if(response){
                        sessionStorage.setItem("shop",response.data.shop_ID);
                    }
            })  
                }
                else{
                    this.setState({
                        message: "Could Not Sign In"
                    })
                }
            })
    }

    render(){
        let redirectVar = null;
        if(this.state.auth === true){
           redirectVar = <Navigate to= "/"/>
        }
        return(
            <><div className='App'>
                {redirectVar}

                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
                <CContainer className="mx-auto">

                    <h1>Login to <img className='logo-center' src="/Etsy_logo.png" alt="Etsy Nav logo" width={120} height={60} style={{marginRight:50}}></img> </h1>
                    <CRow style={{ marginLeft: 1000 }} className="mb-3">
                        <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">Username</CFormLabel>
                        <CCol xs="auto">
                            <CFormInput onChange={this.usernameChangeHandler} type="text" id="username" />
                        </CCol>
                    </CRow>
                    <CRow className="mb-3">
                        <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</CFormLabel>
                        <CCol xs="auto">
                            <CFormInput onChange={this.passwordChangeHander} type="password" id="password" />
                        </CCol>
                    </CRow>
                    <CButton style={{ width: 420 }} onClick={this.submitLogin} type="submit">Login </CButton>
                    <br/>
                    <br/>
                    <Link to="/signup">Create an account</Link>
                </CContainer></>
                   
        );
    }
}

//connect()(Login)

//export default connect()(Login);
export default connect(null, { login })(Login)
