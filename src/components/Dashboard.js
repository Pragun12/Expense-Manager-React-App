import React, { Component } from 'react';

import Sidebar from './SideBar';


class Dashboard extends Component {
  render() {
    return (

        <div className="container-fluid">
        <div className="row content">
        <Sidebar/>
        </div>
       </div>
      
    );
  }
}

export default Dashboard;
