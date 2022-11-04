import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userCredentials: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setActiveState: (state, action) => {
            state.userCredentials = action.payload.userCredentials
        },
        setLoggedOutState: state => {
            state.userCredentials = null
        }
    }
});

export const { setActiveState, setLoggedOutState } = userSlice.actions
export const selectUserCredentials = state => state.user.userCredentials
export default userSlice.reducer