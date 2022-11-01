import React from "react";
import { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeletIcon from "@mui/icons-material/Delete";
import './TodoList.css'

const TodoList = ({ todo, toggleComplete, handleDelete, handleEdit }) => {
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
        <button onClick={() => handleEdit(todo, newTitle)} className='buttonEdit'>
            <EditIcon id='i'/>
        </button>
        <button onClick={() => toggleComplete(todo)} className='buttonComplete'>
            <CheckCircleIcon id='i' />
        </button>
        <button onClick={() => handleDelete(todo.id)} className='buttonDelete'>
            <DeletIcon id='i'/>
        </button>
      </div>
    </div>
  );
};

export default TodoList;
