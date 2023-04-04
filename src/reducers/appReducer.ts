import {RequestStatusType} from "../api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    preloader: 'loading' as RequestStatusType,
    error: null as null | string
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setStatusAC: (state, action: PayloadAction<RequestStatusType>) => {
            state.preloader = action.payload
        },
        setErrorAC: (state, action: PayloadAction<null | string>) => {
            state.error = action.payload

        }
    }
})
1 24

export const appReducer = slice.reducer
export const {setStatusAC, setErrorAC} = slice.actions
