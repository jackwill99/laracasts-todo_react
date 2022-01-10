import React, { Component } from "react";

export default class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          title: "Finish React Series",
          isComplete: false,
        },
        {
          id: 2,
          title: "Go Grocery",
          isComplete: true,
        },
        {
          id: 3,
          title: "Take over world",
          isComplete: false,
        },
      ],

      inputValue: "",
      idForTodo: 4,
    };
  }

  addTodo = (event) => {
    event.preventDefault();
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: this.state.idForTodo,
          title: this.state.inputValue,
          isComplete: false,
        },
      ],
    });

    this.setState({ inputValue: "" });
    this.setState({ idForTodo: this.state.idForTodo + 1 });
  };

  inputHandler = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  deleteTodo = (id) => {
    this.setState({
      todos: [...this.state.todos].filter((todo) => todo.id !== id),
    });
  };

  render() {
    return (
      <div className="todo-app-container">
        <div className="todo-app">
          <h2>Todo App</h2>
          <form action="#" onSubmit={this.addTodo}>
            <input
              type="text"
              className="todo-input"
              value={this.state.inputValue}
              onChange={this.inputHandler}
              placeholder="What do you need to do?"
            />
          </form>

          <ul className="todo-list">
            {this.state.todos.map((todo, index) => (
              <li className="todo-item-container">
                <div className="todo-item">
                  <input type="checkbox" />
                  <span className="todo-item-label">{todo.title}</span>
                  {/* <input type="text" className="todo-item-input" value="Finish React Series" /> */}
                </div>
                <button
                  className="x-button"
                  onClick={() => this.deleteTodo(todo.id)}
                >
                  <svg
                    className="x-button-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <div className="check-all-container">
            <div>
              <div className="button">Check All</div>
            </div>

            <span>3 items remaining</span>
          </div>

          <div className="other-buttons-container">
            <div>
              <button className="button filter-button filter-button-active">
                All
              </button>
              <button className="button filter-button">Active</button>
              <button className="button filter-button">Completed</button>
            </div>
            <div>
              <button className="button">Clear completed</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
