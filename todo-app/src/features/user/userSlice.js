import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: "",
    email: "",
    photo: "",
    id: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLoginDetails: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.photo = action.payload.photo;
            state.id = action.payload.id
        },
        setSignOutState: state => {
            state.name = null;
            state.email = null;
            state.photo = null;
            state.id = null
        }
    }
});

export const { setUserLoginDetails, setSignOutState } = userSlice.actions

export const selectUserName = state => state.user.name
export const selectUserEmail = state => state.user.email
export const selectUserPhoto = state => state.user.photo
export const selectUserId = state => state.user.id

export default userSlice.reducer