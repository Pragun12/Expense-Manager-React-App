import React, { Component } from 'react';
import addExpenseLogo from '../add_expenses.svg';

import axios from 'axios';
import setCurrentUser from './utils/setCurrentUser';





class ModalBox extends Component {

    constructor(props) {
        super(props);
        
        this.state ={
          imageUrl:'',
         merchant:'',
          category:'',
          date:'',
          total:'',
          comment:'',
          file:{},
          formErrors:{merchant:'',category:'',date:'',total:'',comment:'',file:''},
          merchantValid:false,
          categoryValid:false,
          dateValid:false,
          totalValid:false,
          commentValid:false,
          fileValid:false,
          formValid: false
        }
        
    }
    
      static defaultProps={
        categories:['Grocery','Maintainance','Equipments','Electric Bills','Rent','Miscellaneous']
      };
    
 

      saveExpense(e){
        e.preventDefault();
  
       
        if(this.state.formValid){
         
        let userid=setCurrentUser(localStorage.getItem('jwtToken')).currentUser.id;
        
        var formData = new FormData();
        formData.append('userid',userid);
        formData.append('merchant',this.state.merchant);
        formData.append('date',this.state.date);
        formData.append('total',this.state.total);
        formData.append('category',this.state.category);
        formData.append('file',this.state.file);
        formData.append('comment',this.state.comment);
  
        axios.post('http://localhost:3200/api/expense',formData,{ 
          headers: {
          'Content-Type': 'multipart/form-data'
          }
      })
        .then(function (response) {
          window.location.href='/expense';
         
        });
      }
  
      }


      handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        
       this.setState({[name]: value}, 
                    () => { this.validateField(name, value) });
      }
  
      onFileChange(e){
        const name = e.target.name;
        const value = e.target.files[0].type;
        this.setState({file:e.target.files[0]},() => { this.validateField(name, value) }
        );
  
      }

      
      validateField(name,value){
        let merchantValid=this.state.merchantValid;
        let dateValid=this.state.dateValid;
        let totalValid=this.state.totalValid;
        let categoryValid=this.state.categoryValid;
        let fileValid=this.state.fileValid;
        
        let fieldValidationErrors = this.state.formErrors;
  
        switch(name){
          case 'merchant':
          merchantValid=value.length>0;
          fieldValidationErrors.merchant=merchantValid ? '' : 'Merchant Name is required.';
          break;
          case 'date':
          dateValid=!((new Date(value))>(new Date()));
          fieldValidationErrors.date=dateValid ? '' : 'Date must be before current date';
          break;
          case 'total':
          totalValid=value.match(/^(\d*\.)?\d+$/)!==null;
        
          fieldValidationErrors.total=totalValid ? '' : 'Total must be a number';
          break;
         case 'category':
         categoryValid=value.length>0;
         fieldValidationErrors.category=categoryValid ? '' : 'Category is required.';
         
         break;
         case 'file':
         if(value==='image/jpeg' || value==='image/jpg' || value==='image/png'){
          fileValid=true;
          
       }
       fieldValidationErrors.file=fileValid ? '' : 'Upload an Image file';
       break;
        default:
        break;
      }

      this.setState({
        formErrors: fieldValidationErrors,
       merchantValid:merchantValid,
       dateValid:dateValid,
       totalValid:totalValid,
       fileValid:fileValid,
       categoryValid:categoryValid
       }, this.validateForm);

    }


    validateForm() {
        this.setState({
          formValid: this.state.merchantValid && this.state.categoryValid && this.state.totalValid && this.state.fileValid && this.state.dateValid
        });
       
      }
  

  render() {

    let categoryOptions=this.props.categories.map(category=>{
        return <option key={category} value={category}>{category}</option>
      });
  

    return (

        <div className="center">
        <a  data-toggle="modal" data-target="#expenseformModal" >
        <img src={addExpenseLogo}  width='180' height='180' alt="add expense"/>
        </a>


        <div className="modal fade" id="expenseformModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">New Expense</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        
        
      <form className="form-horizontal" onSubmit={this.saveExpense.bind(this)}>
    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="merchant">Merchant:</label>
      <div className="col-sm-4">
        <input type="text" className="form-control" id="merchant" placeholder="Merchant Name" name="merchant" onChange={this.handleUserInput.bind(this)}/>
      </div>
      </div>
    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="date">Date:</label>
      <div className="col-sm-4">          
        <input type="date" className="form-control" id="date" placeholder="mm/dd/yyyy" name="date" onChange={this.handleUserInput.bind(this)}/>
      </div>
    </div>

    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="total">Total:</label>
      <div className="col-sm-4">          
        <input type="text" className="form-control" id="total" placeholder="Total" name="total" onChange={this.handleUserInput.bind(this)}/>
      </div>
    </div>

    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="category">Category:</label>
      <div className="col-sm-4">          
      <select className="form-control" id="category" name='category' onChange={this.handleUserInput.bind(this)}>
      <option>Select Category</option>
        {categoryOptions}
        
      </select>
      </div>
    </div>

     <div className="form-group">
     <label className="control-label col-sm-4 " htmlFor="receipt">Expense Receipt:</label>
     <div className="col-sm-4"> 
    <input type="file" className="form-control-file" id="receipt" name="file"  onChange={this.onFileChange.bind(this)}/>
    </div>
  </div>

    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="comment">Comment:</label>
      <div className="col-sm-8">          
        <input type="text" className="form-control" id="comment" placeholder="Comment" name="comment" onChange={this.handleUserInput.bind(this)}/>
      </div>
    </div>

     <div className="form-group">        
      <div className="col-sm-2">
        <button type="submit" className="btn btn-primary" >Save Expense</button>
      </div>
    </div>
    </form>

    
    </div>
     
     </div>
   </div>
 </div>
         </div>
      
    );
  }
}

export default ModalBox;
