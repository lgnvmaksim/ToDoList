import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppRootStateType, AppThunkDispatch} from "../store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType,
    dispatch: AppThunkDispatch,
    rejectWithValue: null
}>()