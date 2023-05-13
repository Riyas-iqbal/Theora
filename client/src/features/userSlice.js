import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: null,
    email: null,
    userId: null,
}

const userSlice = createSlice({
    name: 'userr',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.userId = action.payload.userId
        },
        removeUser: (state, action) => {
            state.name = null;
            state.userId = null;
        }
    }
})

export const { addUser, removeUser } = userSlice.actions

export default userSlice.reducer