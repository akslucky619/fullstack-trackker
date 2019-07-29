import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      responsible: "",
      priority: "",
      completed: false
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/todos/" + this.props.match.params.id)
      .then(response => {
        console.log(response);
        this.setState({
          description: response.data.description,
          responsible: response.data.responsible,
          priority: response.data.priority,
          completed: response.data.completed
        });
      })
      .catch(function(error) {
        console.log(error);
      });
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
    const updateTodo = { description, responsible, priority, completed };
    console.log(updateTodo);
    axios
      .post(
        `http://localhost:9000/todos/${this.props.match.params.id}/update`,
        updateTodo
      )
      .then(res => {
        if (res.data) {
          this.props.history.push("/todos");
        }
      });
  };

  handleDelete = () => {
    const { description, responsible, priority, completed } = this.state;
    const deleteTodo = { description, responsible, priority, completed };

    axios
      .get(
        `http://localhost:9000/todos/${this.props.match.params.id}/delete`,
        deleteTodo
      )
      .then(res => console.log(res.data));
    this.props.history.push("/todos");
  };

  render() {
    return (
      <>
        {localStorage.token ? (
          <div className="animated slideInUp faster">
            <h3 align="center">Update The Task</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Description: </label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Responsible: </label>
                <input
                  type="text"
                  name="responsible"
                  className="form-control"
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
              <div className="form-check">
                <input
                  className="form-check-input"
                  id="completedCheckbox"
                  type="checkbox"
                  name="completed"
                  onChange={this.handleCheck}
                  checked={this.state.completed}
                  value={this.state.completed}
                />
                <label className="form-check-label" htmlFor="completedCheckbox">
                  Completed
                </label>
              </div>

              <br />

              <div className="form-group">
                <input
                  type="submit"
                  value="Update Todo"
                  className="btn btn-primary"
                />
              </div>
              <div className="form-group">
                <button
                  onClick={this.handleDelete}
                  type="submit"
                  value="Delete Todo"
                  className="btn btn-primary"
                >
                  Delete Todo{" "}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </>
    );
  }
}
