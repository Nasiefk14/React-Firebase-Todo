import AddTodo from "./todos/AddTodo";
import Title from "./todos/Title";
import { db } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import TodoList from "./todos/TodoList";
import "./Todos.css";

import { useSelector } from "react-redux";
import { selectUserName, selectUserId } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

function Todos() {
  const [todos, setTodos] = useState([]);
  const dbId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const navigate = useNavigate();

  useEffect(() => {
    // const colRef = collection(db, 'todos');
    const colRef = collection(db, `${dbId} - ${userName}`);
    const sortByNew = query(colRef, orderBy("createdAt", "asc"));
    const onSub = onSnapshot(sortByNew, (QuerySnapshot) => {
      let todosArray = [];
      QuerySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => onSub();
  }, []);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, `${dbId} - ${userName}`, todo.id), {
      title: title,
    });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, `${dbId} - ${userName}`, todo.id), {
      completed: !todo.completed,
    });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, `${dbId} - ${userName}`, id));
  };

  return (
    <>
      {!userName ? (
        navigate("/")
      ) : (
        <>
          <div>
            <Title />
          </div>
          <div>
            <AddTodo />
          </div>
          <div className="todoContainer">
            {todos.map((todo) => (
              <TodoList
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Todos;
