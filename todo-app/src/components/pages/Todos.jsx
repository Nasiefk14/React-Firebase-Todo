import AddTodo from "../todos/AddTodo";
import Title from "../todos/Title";
import { db } from "../../firebase";
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
import TodoList from "../todos/TodoList";
import "./Todos.css";

function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "todos");
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
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
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
  );
}

export default Todos;
