import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Spring } from "react-spring/renderprops";
import axios from "axios";

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isUpdated: false
    };
  }
  componentDidMount() {
    axios.get("http://localhost:9000/todos").then(res => {
      console.log(res.data, "res");
      this.setState({
        todos: res.data
      });
    });
  }

  //   componentDidUpdate =()=>{
  //     this.forceUpdate();
  //   }
  //   isUpdated =()=>{
  //       this.setState({isUpdated: !this.state.isUpdated})
  //   }

  todoList() {
    return this.state.todos.map((currentTodo, i) => {
      return <Todo todo={currentTodo} key={i} />;
    });
  }

  render() {
    return (
      <>
      {localStorage.token?(
        <Spring
          from={{opacity: 0, marginTop: -500}}
          to={{opacity: 1, marginTop: 0}}
          >
          {props => (
            <div style={props}>
              <div>
                <h3>Task List</h3>
                <table
                  className="table table-striped"
                  style={{ marginTop: 20 }}
                >
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Responsible</th>
                      <th>Priority</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{this.todoList()}</tbody>
                </table>
              </div>
            </div>
          )}
        </Spring>

      ):(
        <Redirect to="/login" />
      )}
      </>
    );
  }
}

const Todo = props => (
  <tr>
    <td className={props.todo.completed ? "completed" : ""}>
      {props.todo.description}
    </td>
    <td className={props.todo.completed ? "completed" : ""}>
      {props.todo.responsible}
    </td>
    <td className={props.todo.completed ? "completed" : ""}>
      {props.todo.priority}
    </td>
    <td>
      <Link
        to={{
          pathname: "/edit/" + props.todo._id,
          state: {}
        }}
      >
        Edit
      </Link>
    </td>
  </tr>
);
