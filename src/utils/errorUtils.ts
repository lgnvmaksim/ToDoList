import { Dispatch } from 'redux'
import {setErrorAC, setStatusAC} from "../reducers/app/appReducer";
import {ResponseType} from '../api'
import axios, {AxiosError} from "axios";


// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}
//
// export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
//     dispatch(setErrorAC(error.message))
//     dispatch(setStatusAC('failed'))
// }

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred'
        dispatch(setErrorAC(error))
    } else {
        dispatch(setErrorAC(`Native error ${err.message}`))
    }
    dispatch(setStatusAC('failed'))
}