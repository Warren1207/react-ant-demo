import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import './App.css';
import './assets/font/iconfont.css';
import Login from './routes/Login/index';
import HomeLayout from './routes/Layout/index';

class App extends Component {
  render() {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={HomeLayout} />
        </Switch>
    );
  }
}

export default App;
