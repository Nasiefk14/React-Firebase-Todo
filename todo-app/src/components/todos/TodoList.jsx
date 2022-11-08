import React from "react";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import "./TodoList.css";

const TodoList = ({ todo, toggleComplete, handleDelete }) => {
  const [newTitle, setNewTitle] = useState(todo.title);
  const onChangeHandler = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };
  return (
    <div className="todos">
      <input
        className="item"
        type="text"
        value={todo.title === "" ? newTitle : todo.title}
        style={{ textDecoration: todo.completed && "line-through" }}
        onChange={onChangeHandler}
      />
      <div className="actionsContainer">
        <button onClick={() => toggleComplete(todo)} className="buttonComplete">
          <AiOutlineCheckCircle className="icon"/>
        </button>
        <button onClick={() => handleDelete(todo.id)} className="buttonDelete">
          <BsTrash className="icon"/>
        </button>
      </div>
    </div>
  );
};

export default TodoList;
