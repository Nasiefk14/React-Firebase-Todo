import React from 'react';
import './Title.css'

import { useSelector } from 'react-redux'
import { selectUserName } from '../../features/user/userSlice';

const Title = () => {
    const username = useSelector(selectUserName)
    return (
        <div className='title'>
            <h1>{username}'s Too doos</h1>
        </div>
    );
}

export default Title;
