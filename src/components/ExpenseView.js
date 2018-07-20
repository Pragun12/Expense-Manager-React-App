import React, { Component } from 'react';
import axios from 'axios';
import setCurrentUser from './utils/setCurrentUser';

class ExpenseView extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            expenses:[]
        }
    }

  componentWillMount(){

    var self=this;
    const userId=setCurrentUser(localStorage.getItem('jwtToken')).currentUser.id;

    axios.get('http://localhost:3200/api/expenses',{
        params: {
          userid: userId
        }
      })
    .then(function (response) {
     self.setState({expenses:response.data})
    })
    .catch(function (error) {
      console.log(error);
    });

  

  }
  
  render() {

    let expense=this.state.expenses.map(expense=>{
        return(

            <div className="col-sm-3" key={expense._id}>
            <div className="well">
            <img src={`http://localhost:3200/images/${expense.file}`} width="200" height="200"  alt="receipt"/>
            <p><b>{expense.merchant}</b></p>
            </div>
            </div>

        )
    })
    
    return (

        
         <div className="row expense-grid">

            {expense}

            </div>
             
      
      
    );
  }
}

export default ExpenseView;
