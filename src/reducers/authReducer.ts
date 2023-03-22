import {Dispatch} from 'redux'
import {setStatusAC} from "./appReducer";
import {authApi, AuthType} from "../api";
import {handleServerAppError, handleServerNetworkError} from "../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false,
    isInitialized: false
}


const slice= createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state,  action: PayloadAction<boolean>){
           state.isLoggedIn = action.payload
        },
        setIsInitializedAC(state, action: PayloadAction<boolean>){
            state.isInitialized = action.payload
        }
    }
})

export const authReducer = slice.reducer
const {setIsLoggedInAC, setIsInitializedAC} = slice.actions



export const loginTC = (data: AuthType) => async (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    try {
        const res = await authApi.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    }
}


export const logoutTC = () => async (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    try{
        const res = await authApi.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }
    catch(e: any){
        handleServerNetworkError(e, dispatch)
    }
}


export const meTC = () => async (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    try {
        const res = await authApi.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setIsInitializedAC(true))
            dispatch(setStatusAC('succeeded'))
        } else {
            dispatch(setIsInitializedAC(true))
            handleServerAppError(res.data, dispatch)
        }
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    }
}

