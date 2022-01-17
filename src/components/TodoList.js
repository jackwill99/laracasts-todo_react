import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function TodoList({
    checkBut,
    but,
    completeTodo,
    markAsEditting,
    updateTodo,
    cancelEdit,
    inputTitle,
    deleteTodo,
}) {
    return (
        <ul className="todo-list">
            <TransitionGroup>
                {checkBut(but).map((todo, index) => (
                    <CSSTransition
                        timeout={300}
                        classNames="slide-horizontal"
                        key={todo.id}
                    >
                        <li className="todo-item-container" key={todo.id}>
                            <div className="todo-item">
                                <input
                                    type="checkbox"
                                    onChange={() => completeTodo(todo.id)}
                                    checked={todo.isComplete && true}
                                />
                                {!todo.isEditting ? (
                                    <span
                                        onDoubleClick={() =>
                                            markAsEditting(todo.id)
                                        }
                                        className={`todo-item-label ${
                                            todo.isComplete
                                                ? "line-through"
                                                : ""
                                        }`}
                                    >
                                        {todo.title}
                                    </span>
                                ) : (
                                    <input
                                        onBlur={() => updateTodo(todo.id)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                updateTodo(todo.id);
                                            } else if (event.key === "Escape") {
                                                cancelEdit(todo.id);
                                            }
                                        }}
                                        type="text"
                                        className="todo-item-input"
                                        defaultValue={todo.title}
                                        ref={inputTitle}
                                        autoFocus
                                    />
                                    //! In input, defaultValue is only temporary value and you can change later. If you use 'value' , this will be always value.
                                )}
                            </div>
                            <button
                                className="x-button"
                                onClick={() => deleteTodo(todo.id)}
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
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default TodoList;
