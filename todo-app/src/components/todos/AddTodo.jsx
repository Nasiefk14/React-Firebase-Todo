import React from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp} from 'firebase/firestore';
import { useState } from 'react';
import './AddTodo.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { selectUserId, selectUserName } from '../../features/user/userSlice';

const AddTodo = () => {
    const [title, setTitle] = useState('')
    const dbId = useSelector(selectUserId)
    const userName = useSelector(selectUserName)
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.match(/^\s*$/)) {
            toast.error('Enter A Valid Value!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                fontFamily: "Century Gothic"
                });

        } else {
            await addDoc(collection(db, `${dbId} - ${userName}`), {
                title,
                completed: false,
                createdAt: serverTimestamp(),
            });
            setTitle('')
        }
    }
    return (
        <form onSubmit={handleSubmit} className="addTodoForm">
            <ToastContainer />
            <div className='inputContainer'>
                <input type="text" placeholder='Add Todo...' value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className='buttonContainer'>
                <button className='add-button' >Add</button>
            </div>
        </form>
    );
}

export default AddTodo; 
