import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counterSlice'
import userReducer from '../features/userSlice'
import tutorReducer from '../features/tutorSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
        tutor: tutorReducer
    }
})