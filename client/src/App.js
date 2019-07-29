import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import TodoList from "./TodoList";
import EditTodo from "./EditTodo";
import CreateTodo from "./CreateTodo";

class App extends React.Component {
constructor(){
  super()
  this.state = {
    isLoggedIn: false,
  }
}

  handleLogout = () => {
    localStorage.removeItem("token");
    this.forceUpdate();
  };

  verifyLogIn = () => {
    console.log('user logged in')
    this.setState({isLoggedIn: !this.state.isLoggedIn})
  }
  

  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <img
                src={logo}
                width="30"
                height="30"
                alt="CodingTheSmartWay.com"
              />

              <Link to="/" className="navbar-brand">
                Tasker
              </Link>
              <div className="collpase navbar-collapse">
                {localStorage.token?(
                  <>
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/todos" className="nav-link">
                      Tasks
                    </Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/create" className="nav-link">
                      Create A Task
                    </Link>
                  </li>
                </ul>
                 <span class="navbar-text">
                 <button onClick={this.handleLogout} type="button" class="btn btn-primary">Logout</button>
               </span>
               </>
                ):(
                  <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                </ul>
                )}
              </div>
            </nav>
            <br />
            <h1 className="animated fadeIn slower">Taskerrr</h1>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login"  render={(props)=>(<Login {...props} isLoggedIn={this.verifyLogIn} />)} />
            <Route exact path="/todos" component={TodoList} />
            <Route exact path="/edit/:id" component={EditTodo} />
            <Route exact path="/create" component={CreateTodo} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
