import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import { bounceInLeft } from "animate.css";
import axios from "axios";

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      responsible: "",
      priority: "",
      completed: false
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleCheck = () => {
    this.setState({
      completed: !this.state.completed
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { description, responsible, priority, completed } = this.state;
    const newTodo = { description, responsible, priority, completed };
    axios
      .post("http://localhost:9000/todos/add", newTodo)
      .then(res => console.log(res.data));
    this.setState({
      description: "",
      responsible: "",
      priority: "",
      completed: false
    });
    // this.props.history.push("/todos");
  };
  render() {
    return (
      <>
        {localStorage.token ? (
          <div className="animated bounceInLeft faster" style={{ marginTop: 10 }}>
            <h3>Set a Task</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Description: </label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Responsible: </label>
                <input
                  type="text"
                  className="form-control"
                  name="responsible"
                  value={this.state.responsible}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priority"
                    id="priorityLow"
                    value="Low"
                    checked={this.state.priority === "Low"}
                    onChange={this.handleChange}
                  />
                  <label className="form-check-label">Low</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priority"
                    id="priorityMedium"
                    value="Medium"
                    checked={this.state.priority === "Medium"}
                    onChange={this.handleChange}
                  />
                  <label className="form-check-label">Medium</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priority"
                    id="priorityHigh"
                    value="High"
                    checked={this.state.priority === "High"}
                    onChange={this.handleChange}
                  />
                  <label className="form-check-label">High</label>
                </div>
              </div>

              <br />

              <div className="form-group">
                <input
                  type="submit"
                  value="Create Todo"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        ) : (
          <Redirect to="/login" />
        )}
      </>
    );
  }
}
