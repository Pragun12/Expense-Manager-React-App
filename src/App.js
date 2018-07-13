import React, { Component } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { Switch,BrowserRouter, Route } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <BrowserRouter>
        <Switch>
        <Route exact path="/" component={Login }/>
        <Route path="/register" component={Register}/>
        <Route path="/dashboard" component={Dashboard}/>
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
