import AddTodo from './components/AddTodo';
import Title from './components/Title';
import { database } from './firebase';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const x = query(collection(database, 'todos'))
    const onSub = onSnapshot(x, (QuerySnapshot) => {
      let todosArray = []
      QuerySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id })
      });
      setTodos(todosArray)
    });
    return () => onSub()
  }, []);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(database, 'todos', todo.id), {title: title})
  }
  const toggleComplete = async (todo) => {
    await updateDoc(doc(database, 'todos', todo.id), {
      completed: !todo.completed
    })
  }
  const handleDelete = async (id) => {
    await deleteDoc(doc(database, 'todos', id))
  }

  return (
    <div className='App'>
      <div>
        <Title />
      </div>
      <div>
        <AddTodo />
      </div>
      <div className='todoContainer'>
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
    </div>
  );
}

export default App;
