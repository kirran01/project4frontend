import React from 'react';
import './App.css';
import Login from './Login'
import Signup from './Signup'
import Navbar from './Nav'
import Home from './Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';




class App extends React.Component {

  //posts werent saved in user: in put requests, we have to specify what type of information we are sending to backend to load it

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Router>
      </div >
    )
  }
}

export default App;
