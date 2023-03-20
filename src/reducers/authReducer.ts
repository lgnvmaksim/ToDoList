import {Dispatch} from 'redux'
import {setStatusAC, SetStatusACType} from "./appReducer";
import {authApi, AuthType} from "../api";
import {handleServerAppError, handleServerNetworkError} from "../utils/errorUtils";


const initialState = {
    isLoggedIn: false,
    isInitialized: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'SET-IS-INITIALIZED-IN':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

//After the line there will be action-creators
//_________________________________________________________________

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'SET-IS-LOGGED-IN', value} as const)

export const setIsInitializedAC = (value: boolean) =>
    ({type: 'SET-IS-INITIALIZED-IN', value} as const)


//After the line there will be thunk-creators
//_________________________________________________________________

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


//After the line there will be types of action-creators
//_________________________________________________________________


type ActionsType =
    SetStatusACType
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsInitializedAC>