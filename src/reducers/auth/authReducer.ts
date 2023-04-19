import {Dispatch} from 'redux'
import {setStatusAC} from "../app/appReducer";
import {authApi, AuthType} from "../../api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../utils/create-app-async-thunk";


const login = createAppAsyncThunk<{isLoggedIn: boolean}, AuthType>
('auth/login', async (arg, thunkAPI)=>{
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setStatusAC('loading'))
        const res = await authApi.login(arg)
        if (res.data.resultCode===0) {
            dispatch(setStatusAC('succeeded'))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    }catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})


const logout = createAppAsyncThunk<{isLoggedIn: boolean}, void>
('auth/logout', async (_, thunkAPI)=>{
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setStatusAC('loading'))
        const res = await authApi.logout()
        if (res.data.resultCode===0) {
            dispatch(setStatusAC('succeeded'))
            return {isLoggedIn: false}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})


const initializeApp = createAppAsyncThunk<{isLoggedIn: boolean}, void>
('auth/me', async (arg, thunkAPI)=>{
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const res = await authApi.me()
        if (res.data.resultCode === 0) {

          return {isLoggedIn: true}

        } else {
      handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    } finally {

        dispatch(setIsInitializedAC(true))
    }
})



const slice= createSlice({
    name: 'auth',
    initialState:{
        isLoggedIn: false,
        isInitialized: false
    },
    reducers: {
        setIsInitializedAC(state, action: PayloadAction<boolean>){
            state.isInitialized = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state, action)=>{
                state.isLoggedIn = action.payload.isLoggedIn
            } )
            .addCase(login.fulfilled, (state, action)=>{
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(logout.fulfilled, (state, action)=>{
                state.isLoggedIn = action.payload.isLoggedIn
            })
    }
})

export const authReducer = slice.reducer
const {setIsInitializedAC} = slice.actions
export const authThunks = {login, logout, initializeApp}








