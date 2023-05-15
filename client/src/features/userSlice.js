import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: null,
    email: null,
    userId: null,
    loggedIn: false,
}

const userSlice = createSlice({
    name: 'userr',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.userId = action.payload.userId
            state.email = action.payload.email,
            state.loggedIn = true
        },
        removeUser: (state) => {
            state.name = null;
            state.userId = null;
            state.email = null;
            state.loggedIn = false
        }
    }
})

export const { addUser, removeUser } = userSlice.actions

export default userSlice.reducer