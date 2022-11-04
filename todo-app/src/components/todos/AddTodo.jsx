import React from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp} from 'firebase/firestore';
import { useState } from 'react';
import './AddTodo.css'

const AddTodo = () => {
    const [title, setTitle] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title !== '') {
            await addDoc(collection(db, 'todos'), {
                title,
                completed: false,
                createdAt: serverTimestamp(),
            });
            setTitle('')
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='inputContainer'>
                <input type="text" placeholder='Add Todo...' value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className='buttonContainer'>
                <button>Add</button>
            </div>
        </form>
    );
}

export default AddTodo;
