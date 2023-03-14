import {RequestStatusType} from "../api";


const initialState = {
    preloader: 'loading' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case 'APP/SET-STATUS':
            return {...state, preloader: action.preloader}
        default:
            return state
    }
}

export const setStatusAC = (preloader: RequestStatusType) => ({
    type: 'APP/SET-STATUS', preloader
} as const)

export const setErrorAC = (error: null | string) => ({
    type: 'APP/SET-ERROR', error
} as const)


export type SetStatusACType = ReturnType<typeof setStatusAC>
export type SetErrorACType = ReturnType<typeof setErrorAC>

type ActionsType =
    SetStatusACType
    | SetErrorACType