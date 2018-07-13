import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

class Register extends Component {

    constructor (props) {
        super(props);
        this.state = {
        
          firstname:'',
          lastname:'',
          email: '',
          pwd: '',
          confpwd:'',
          formErrors: {firstname:'',lastname:'', email: '', password: ''},
          firstnameValid:false,
          lastnameValid:false,
          emailValid:false,
          passwordValid:false,
          confPasswordValid:false,
          formValid: false
        }
      }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.formValid){
         

          
          axios.post('http://localhost:3200/api/user', {
            firstName: this.state.firstname,
            lastName:  this.state.lastname,
            email: this.state.email,
            password: this.state.pwd,
            type:0
          })
          .then(function (response) {

           
           
            if(response.status===200){
             window.location.href="/";
            }
          })
          .catch(function (error) {
            //console.log(error);
          });

       

        }
        else{
         
        }
        
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, 
                      () => { this.validateField(name, value) });
      }

      validateField(name,value){
          let firstnameValid=this.state.firstnameValid;
          let lastnameValid=this.state.lastnameValid;
          let emailValid=this.state.emailValid;
          let passwordValid=this.state.passwordValid;
          let confPasswordValid=this.state.confPasswordValid;
          let fieldValidationErrors = this.state.formErrors;
          let passw =this.state.pwd;
       switch(name){
        case 'firstname':
        firstnameValid=value.length>0;
        fieldValidationErrors.firstname=firstnameValid ? '' : 'Firstname is required.';
        break;
        case 'lastname':
        lastnameValid=value.length>0;
        fieldValidationErrors.lastname=lastnameValid ? '' : 'Lastname is required.';
        break;
        case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
        break;
        case 'pwd':
       passwordValid=value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
       fieldValidationErrors.password = passwordValid ? '' : 'Password should have at least one numeric digit, one uppercase and one lowercase letter';
       break;
        case 'confpwd':
        confPasswordValid=value.match(passw);
        fieldValidationErrors.password=confPasswordValid?'':'Password did not match';
        break;
        default:
        break;
       }

       this.setState({
         formErrors: fieldValidationErrors,
         firstnameValid:firstnameValid,
         lastnameValid:lastnameValid,
         emailValid:emailValid,
         passwordValid:passwordValid,
         confPasswordValid:confPasswordValid


        }, this.validateForm);

      }

      validateForm() {
        this.setState({
          formValid: this.state.emailValid && this.state.passwordValid && this.state.firstnameValid && this.state.lastnameValid && this.state.confPasswordValid
        });
       
      }

  render() {
    return (
        <div id="sign-in" >
        <div className="container row">
        <div className="col-sm-4 well">
        <div className="content-wrapper">
        <h3>Expense Manager</h3>

         <form  onSubmit={this.handleSubmit.bind(this)}>
         <div className="form-group">
         
          <input type="text" className="form-control" onChange={this.handleUserInput.bind(this)} placeholder="First Name" name="firstname"/>
        </div>
        <div className="form-group">
         
         <input type="text" className="form-control" onChange={this.handleUserInput.bind(this)} placeholder="Last Name" name="lastname"/>
       </div>
        <div className="form-group">
         
          <input type="email" className="form-control" onChange={this.handleUserInput.bind(this)} placeholder="Email Address" name="email"/>
        </div>
        <div className="form-group">
          
          <input type="password" className="form-control" onChange={this.handleUserInput.bind(this)}  placeholder="Password" name="pwd"/>
        </div>

         <div className="form-group">
          
          <input type="password" className="form-control" onChange={this.handleUserInput.bind(this)} placeholder="Confirm Password" name="confpwd"/>
        </div>
        
        <button type="submit" className="btn btn-primary"  >Register</button>
        <span>  </span>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>


        </div>
        </div>
        </div>
        </div>
    );
  }
}

export default Register;
