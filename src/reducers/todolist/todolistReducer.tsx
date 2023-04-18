import {ChangeTodoTitle, FilteredType, RequestStatusType, todolistApi, TodolistMainType} from "../../api";
import {Dispatch} from "redux";
import {setStatusAC} from "../app/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {AppRootStateType} from "../../store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../utils/create-app-async-thunk";


const getTodolist = createAppAsyncThunk<TodolistMainType[]>
('todo/getTodolist', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setStatusAC('loading'))
        const res = await todolistApi.getTodolist()
        if (res.data) {
            return res.data
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const addNewTodolist = createAppAsyncThunk<TodolistMainType, string>
('todo/addNewTodolist', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setStatusAC('loading'))
        const res = await todolistApi.createTodolist(arg)
        if (res.data.resultCode === 0) {
            dispatch(setStatusAC('succeeded'))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})



const removeTodolist = createAppAsyncThunk<{ todoId: string }, string>
('todo/removeTodolist', async (todoId, thunkAPI)=>{
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setStatusAC('loading'))
        const res = await todolistApi.deleteTodolist(todoId)
        if (res.data.resultCode===0){
            dispatch(setStatusAC('succeeded'))
            return {todoId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const changeTodolistTitle = createAppAsyncThunk <ChangeTodoTitle, ChangeTodoTitle>
('todo/changeTodolistTitle', async (arg, thunkAPI)=>{
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setStatusAC('loading'))
        const res = await todolistApi.updateTodolist(arg)
        if (res.data.resultCode===0){
            dispatch(setStatusAC('succeeded'))
            return arg
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

// export const changeTodolistTitleTC = (todoId: string, newTitle: string) =>
//     (dispatch: Dispatch) => {
//         todolistApi.updateTodolist(todoId, newTitle)
//             .then((res) => {
//                 if (res.data.resultCode === 0) {
//                     dispatch(changeTodolistTitleAC({todoId, newTitle}))
//                 } else {
//                     handleServerAppError(res.data, dispatch)
//                 }
//             })
//             .catch(e => {
//                 handleServerNetworkError(e, dispatch)
//             })
//     }




const initialState: TodolistMainType[] = []

const slice = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        filteredTaskAC(state, action: PayloadAction<{ todoId: string, filter: FilteredType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            state[index].filter = action.payload.filter

        },
        removeAllTodolistsAC(state) {
            return state = []
        },
        changeEntityStatusAC(state, action: PayloadAction<{ todoId: string, entity: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            state[index].entityStatus = action.payload.entity
        },

    },
    extraReducers: builder => {
        builder
            .addCase(changeTodolistTitle.fulfilled, (state, action)=>{
                const index = state.findIndex(tl => tl.id === action.payload.todoId)
                state[index].title = action.payload.title
            })
            .addCase(removeTodolist.fulfilled, (state, action)=>{
                const index = state.findIndex(tl => tl.id === action.payload.todoId)
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(getTodolist.fulfilled, (state, action) => {
                return action.payload.map(el => ({...el, filter: 'all'}))
            })
            .addCase(addNewTodolist.fulfilled, (state, action)=>{
                state.unshift({...action.payload, filter: 'all'})
            })
    }
})

export const {
    filteredTaskAC, removeAllTodolistsAC, changeEntityStatusAC
} = slice.actions

export const todolistReducer = slice.reducer
export const todolistThunks = {getTodolist, addNewTodolist, removeTodolist, changeTodolistTitle}





export const removeAllTodo = () => (dispatch: any, getState: () => AppRootStateType) => {
    const todos = getState().todolists
    todos.forEach(todo => {
        setTimeout(() => {
            dispatch(todolistThunks.removeTodolist(todo.id))
        }, 200)
    })
}
