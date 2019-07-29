import React, { Component } from "react";
import {Redirect} from 'react-router-dom'


class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    user: null
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    const { email, password, username } = this.state;
    const data = { email, password, username };
    const url = "http://localhost:9000/users/register";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res=> res.json()).then(user=>{
        console.log(user, "in reg compo")
        this.setState({user:user})
    });
  };

  render() {
    return (
      <>
      {!localStorage.token?(
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input
            className="input"
            onChange={this.handleChange}
            type="text"
            placeholder="Text input"
            name="username"
          />
        </div>
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            onChange={this.handleChange}
            type="text"
            placeholder="Text input"
            name="email"
          />
        </div>
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            onChange={this.handleChange}
            type="password"
            placeholder="Text input"
            name="password"
          />
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button onClick={this.handleSubmit} class="button is-link">Register</button>
          </div>
        </div>
      </div>

      ):(
        <Redirect to="/" />
      )}
      </>
    );
  }
}

export default Register;
