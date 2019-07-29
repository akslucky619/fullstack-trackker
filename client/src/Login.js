import React from "react";
import {Redirect} from 'react-router-dom'

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    const data = { email, password };
    const url = "http://localhost:9000/users/login";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(user => {
        console.log(user, "in logi user");
        if (user !== null) {
          let jwt = `Token ${user.token}`
          localStorage.setItem("token", jwt);
          localStorage.setItem("user", { user });
          this.props.isLoggedIn();
          this.props.history.push("/");
          // this.forceUpdate();
          
        }
      });
  };

  render() {
    console.log(this.props.isLoggedIn)
    return (
      <>
      {!localStorage.token?(
      <div className="field">
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
            <button onClick={this.handleSubmit} class="button is-link">
              Login
            </button>
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

export default Login;
