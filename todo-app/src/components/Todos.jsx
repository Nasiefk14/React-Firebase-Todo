import AddTodo from "./todos/AddTodo";
import Title from "./todos/Title";
import { auth, db } from "../firebase";
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
import { selectUserName, selectUserId, setSignOutState } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import GridLoader from 'react-spinners/GridLoader'

function Todos() {
  const [todos, setTodos] = useState([]);
  const dbId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    // const colRef = collection(db, 'todos');
    const colRef = collection(db, `${dbId} - ${userName}`);
    const sortByNew = query(colRef, orderBy("createdAt", "asc"));
    try{
      const onSub = onSnapshot(sortByNew, (QuerySnapshot) => {
        let todosArray = [];
        QuerySnapshot.forEach((doc) => {
          todosArray.push({ ...doc.data(), id: doc.id });
        });
        setTodos(todosArray);
        setIsLoading(false)
      });
      return () => onSub();  
    }catch(err){
      console.log(err)
    }
    // eslint-disable-next-line
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
  const signOut = () => {
    auth.signOut().then(() => {
      dispatchEvent(setSignOutState)
    })
  }

  return (
    <>
      {!userName ? (
        navigate("/")
      ) : (
        <>
          <Title />
          <div>
            <AddTodo />
          </div>
          {isloading ? <div className="spinner"><GridLoader color="#f4e97d" size={30} /></div> : <></>}
          {!isloading && Object.keys(todos).length < 1 ? (
           <h3>Looks Like You Havent Made Any Todos Yet, Create One Above</h3>
          ) : (<>
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
            <button onClick={signOut}>Sign Out</button>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Todos;
