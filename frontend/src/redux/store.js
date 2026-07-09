import {createSlice, configureStore} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name : "auth",
    initialState : {
        isLogin : !!localStorage.getItem('userId'),
        userId  : localStorage.getItem('userId') || null
    },
    reducers : {
        login(state, action){
            state.isLogin = true
            state.userId  = action.payload
            localStorage.setItem('userId', action.payload)
        },
        logout(state){
            state.isLogin = false
            state.userId  = null
            localStorage.removeItem('userId')
        }
    }
})

export const authActions = authSlice.actions

export const store = configureStore({
    reducer : authSlice.reducer
})