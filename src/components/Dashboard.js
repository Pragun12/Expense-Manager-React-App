import React, { Component } from 'react';
import logo from '../hg.jpg';


class Dashboard extends Component {
  render() {
    return (

        <div className="container-fluid">
  <div className="row content">
    <div className="col-sm-2 sidenav">
    <div className="intro-section">
        <div className='row img-holder'>
        <div className="col-sm-12">
        <img src={logo}  width='100' height='100' className="img-circle" alt="Cinque Terre"/>
        </div>
        </div>

        <div className='row user-holder'>
        <div className="col-sm-12">
        pragse_p@live.com
        </div>
        </div>
    </div>

    <div className="menu-section">
    <ul class="nav nav-pills nav-stacked">
        <li class="active"><a href="#section1">Home</a></li>
        <li><a href="#section2">Expense</a></li>
        <li><a href="#section3">Report</a></li>
        <li><a href="#section3">Sign out</a></li>
      </ul>
    </div>
      
      </div>
      </div>
      </div>
      
    );
  }
}

export default Dashboard;
