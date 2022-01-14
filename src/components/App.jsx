import { useState, useRef } from "react";
import "../reset.css";
import "../App.css";
import NoTodo from "./NoTodo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Finish React Series",
      isComplete: false,
      isEditting: false,
    },
    {
      id: 2,
      title: "Go Grocery",
      isComplete: false,
      isEditting: false,
    },
    {
      id: 3,
      title: "Take over world",
      isComplete: false,
      isEditting: false,
    },
  ]);
  let [inputValue, setInputValue] = useState("");
  let [idForTodo, setIdForTodo] = useState(4);
  let inputTitle = useRef();

  let addTodo = (event) => {
    event.preventDefault();

    if (inputValue.trim().length === 0) {
      return;
    }

    setTodos([
      ...todos,
      { id: idForTodo, title: inputValue, isComplete: false },
    ]);
    setInputValue(" ");
    setIdForTodo((previousId) => previousId + 1);
  };

  let onInputHandle = (event) => {
    setInputValue(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  let completeTodo = (id) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    setTodos(updateTodos);
  };

  let markAsEditting = (id) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditting = !todo.isEditting;
      }
      return todo;
    });

    setTodos(updateTodos);
  };

  let updateTodo = (id) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (inputTitle.current.value.length === 0) {
          todo.isEditting = !todo.isEditting;
          return todo;
        }
        todo.title = inputTitle.current.value;
        todo.isEditting = !todo.isEditting;
      }
      return todo;
    });

    setTodos(updateTodos);
  };

  const cancelEdit = (id) => {
    let updateTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditting = !todo.isEditting;
      }
      return todo;
    });
    setTodos(updateTodo);
  };

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        <TodoForm
          addTodo={addTodo}
          inputValue={inputValue}
          onInputHandle={onInputHandle}
        />

        {todos.length > 0 ? (
          <>
            <ul className="todo-list">
              {todos.map((todo, index) => (
                <TodoList
                  todo={todo}
                  completeTodo={completeTodo}
                  markAsEditting={markAsEditting}
                  updateTodo={updateTodo}
                  cancelEdit={cancelEdit}
                  inputTitle={inputTitle}
                  deleteTodo={deleteTodo}
                  key={todo.id}
                />
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
          </>
        ) : (
          <NoTodo />
        )}
      </div>
    </div>
  );
}

export default App;
