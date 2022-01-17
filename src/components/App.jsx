import { useContext } from "react";
import "../reset.css";
import "../App.css";
import NoTodo from "./NoTodo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { TodoContext } from "./../context/TodoContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function App() {
    let {
        name,
        addTodo,
        onInputHandle,
        inputValue,
        todos,
        checkBut,
        but,
        completeTodo,
        markAsEditting,
        updateTodo,
        cancelEdit,
        inputTitle,
        deleteTodo,
        setName,
        changeForOne,
        changeForTwo,
        toggleForOne,
        toggleForTwo,
        checkAll,
        checkButton,
        clearCompleted,
    } = useContext(TodoContext);
    return (
        <div className="todo-app-container">
            <div className="todo-app">
                <input
                    type="text"
                    placeholder="What is your name? "
                    name="name"
                    className="todo-input"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <p htmlFor="name" className="nameLabel">
                    Hello, {name}{" "}
                </p>
                <h2>Todo App</h2>

                <TodoForm
                    addTodo={addTodo}
                    inputValue={inputValue}
                    onInputHandle={onInputHandle}
                />

                {todos.length > 0 ? (
                    <>
                        <TodoList
                            checkBut={checkBut}
                            but={but}
                            completeTodo={completeTodo}
                            markAsEditting={markAsEditting}
                            updateTodo={updateTodo}
                            cancelEdit={cancelEdit}
                            inputTitle={inputTitle}
                            deleteTodo={deleteTodo}
                        />

                        <div className="toggle-container">
                            <div className="toggleOne" onClick={changeForOne}>
                                Toggle One Features
                            </div>
                            <div className="toggleTwo" onClick={changeForTwo}>
                                Toggle Two Features
                            </div>
                        </div>

                        <CSSTransition
                            in={toggleForOne}
                            timeout={300}
                            classNames="slide-vertical"
                            unmountOnExit
                        >
                            <div>
                                <div className="check-all-container">
                                    <div className="button" onClick={checkAll}>
                                        Check All
                                    </div>

                                    <span className="span">
                                        {checkBut(but).length}{" "}
                                        {but !== "complete" ? "remaining" : ""}{" "}
                                        items
                                    </span>
                                </div>
                            </div>
                        </CSSTransition>

                        <CSSTransition
                            in={toggleForTwo}
                            timeout={300}
                            classNames="slide-vertical"
                            unmountOnExit
                        >
                            <div>
                                <div className="other-buttons-container">
                                    <div>
                                        <button
                                            className={`button filter-button ${
                                                but === "all"
                                                    ? "filter-button-active"
                                                    : ""
                                            }`}
                                            onClick={() => checkButton("all")}
                                        >
                                            All
                                        </button>
                                        <button
                                            className={`button filter-button ${
                                                but === "active"
                                                    ? "filter-button-active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                checkButton("active")
                                            }
                                        >
                                            Active
                                        </button>
                                        <button
                                            className={`button filter-button ${
                                                but === "complete"
                                                    ? "filter-button-active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                checkButton("complete")
                                            }
                                        >
                                            Completed
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className="button"
                                            onClick={clearCompleted}
                                        >
                                            Clear completed
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CSSTransition>
                    </>
                ) : (
                    <NoTodo />
                )}
            </div>
        </div>
    );
}

export default App;
