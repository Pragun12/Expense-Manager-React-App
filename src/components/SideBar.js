
import React, { Component } from 'react';
import logo from '../hg.jpg';
import { Link } from 'react-router-dom';
import setAuthorizationToken from './utils/setAuthorizationToken';
import setCurrentUser from './utils/setCurrentUser';

class SideBar extends Component {

logout(){
  localStorage.removeItem('jwtToken');
  setAuthorizationToken( false);
  setCurrentUser({});

  
  window.location.href='/';
}

render() {
      return (

 <div className="col-sm-2 sidenav">
 <div className="intro-section">
     <div className='row img-holder'>
     <div className="col-sm-12">
     <img src={logo}  width='100' height='100' className="img-circle" alt="Cinque Terre"/>
     </div>
     </div>

     <div className='row user-holder'>
     <div className="col-sm-12">
     {setCurrentUser(localStorage.getItem('jwtToken')).currentUser.username}
     </div>
     </div>
 </div>

 <div className="menu-section">
 <ul className="nav nav-pills nav-stacked">
     <li className="active"><Link to='/dashboard'>Home</Link></li>
     <li><Link to="/expense">Expense</Link></li>
     <li><a href="#section3">Report</a></li>
     <li><a onClick={this.logout.bind(this)}>Sign out</a></li>
   </ul>
 </div>
   
   </div>
      )
    }
}

export default SideBar;