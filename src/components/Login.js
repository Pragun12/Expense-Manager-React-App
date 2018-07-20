import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwt from "jsonwebtoken";
import axios from 'axios';
import config from '../config';
import setAuthorizationToken from './utils/setAuthorizationToken';
import setCurrentUser from './utils/setCurrentUser';

class Login extends Component {

  constructor (props) {
    super(props);
    this.state = {
      email: '',
      pwd: '',
      formErrors: {email: '', password: ''},
 
      emailValid:false,
      passwordValid:false,
     
      formValid: false
    }
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.state.formValid){

      axios.post('http://localhost:3200/api/auth', {
        email: this.state.email,
        password: this.state.pwd
        
      })
      .then(function (response) {

       const token=jwt.sign({
         id:response.data[0]._id,
         username:response.data[0].email
       },config.jwtSecret
      );
       localStorage.setItem('jwtToken',token);
       setAuthorizationToken(token);
       setCurrentUser(localStorage.getItem('jwtToken'));

       window.location.href='/dashboard';
        
      })
      .catch(function (error) {
        
      });

      
    }
    else{
      alert('error');
    }
    
}

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, 
                  () => { this.validateField(name, value) });
  }

  validateField(name,value){
   
    let emailValid=this.state.emailValid;
    let passwordValid=this.state.passwordValid;
    let fieldValidationErrors = this.state.formErrors;

    switch(name){
      case 'email':
      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
      break;
      case 'pwd':
     passwordValid=value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
     fieldValidationErrors.password = passwordValid ? '' : 'Password should have at least one numeric digit, one uppercase and one lowercase letter';
     break;
     default:
     break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      emailValid:emailValid,
      passwordValid:passwordValid,
    
     }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid    });
   
  }

  render() {


    return (

      
      <div id="sign-in" >
      <div className="container row">
      <div className="col-sm-4 well login-box">
      <div className="content-wrapper">
      <h3>Expense Manager</h3>
          <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
         
          <input type="email" className="form-control" id="email" placeholder="Email Address" onChange={this.handleUserInput.bind(this)} name="email"/>
        </div>
        <div className="form-group">
          
          <input type="password" className="form-control" id="pwd" placeholder="Password" onChange={this.handleUserInput.bind(this)} name="pwd"/>
        </div>
        <div className="checkbox">
          <label><input type="checkbox" name="remember"/> Remember me</label>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <span> OR </span>
        <Link to="/register" className="btn btn-success">Sign up</Link>
      </form>

    
      </div>
      </div>
      </div>

      </div>
    );
  }
}

export default Login;
