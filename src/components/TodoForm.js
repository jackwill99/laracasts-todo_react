import React from "react";

function TodoForm(props) {
  return (
    <form action="#" onSubmit={props.addTodo}>
      <input
        type="text"
        className="todo-input"
        value={props.inputValue}
        onChange={props.onInputHandle}
        placeholder="What do you need to do?"
      />
    </form>
  );
}

export default TodoForm;
