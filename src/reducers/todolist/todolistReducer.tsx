import {FilteredType, RequestStatusType, todolistApi, TodolistMainType} from "../../api";
import {Dispatch} from "redux";
import {setErrorAC, setStatusAC} from "../app/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {AppRootStateType} from "../../store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TodolistMainType[] = []


const slice = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        filteredTaskAC(state, action: PayloadAction<{ todoId: string, filter: FilteredType }>) {
            const index = state.findIndex(tl=>tl.id === action.payload.todoId)
            state[index].filter = action.payload.filter

        },
        addTodolistAC(state, action: PayloadAction<TodolistMainType>) {
            state.unshift({...action.payload, filter: 'all'})
        },
        removeTodolistAC(state, action: PayloadAction<{todoId: string }>) {
              const index = state.findIndex(tl=>tl.id === action.payload.todoId)
            if (index > -1){
                state.splice(index, 1)
            }
        },
        getTodolistAC(state, action: PayloadAction<TodolistMainType[]>) {
            return action.payload.map(el => ({...el, filter: 'all'}))
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ todoId: string, newTitle: string }>) {
            const index = state.findIndex(tl=>tl.id === action.payload.todoId)
            state[index].title = action.payload.newTitle
        },
        removeAllTodolistsAC(state) {
          return state = []
        },
        changeEntityStatusAC(state, action: PayloadAction<{ todoId: string, entity: RequestStatusType }>) {
            const index = state.findIndex(tl=>tl.id === action.payload.todoId)
            state[index].entityStatus = action.payload.entity
        },

    }
})

export const {
    filteredTaskAC, addTodolistAC, removeTodolistAC, getTodolistAC,
    changeTodolistTitleAC, removeAllTodolistsAC, changeEntityStatusAC
} = slice.actions

export const todolistReducer = slice.reducer

//After the line there will be thunk-creators
//_________________________________________________________________


export const getTodolistTC = () =>
    (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistApi.getTodolist()
            .then((res) => {
                dispatch(getTodolistAC(res.data))
                dispatch(setStatusAC('succeeded'))

            })
    }

export const addNewTodolistTC = (newTitle: string) =>
    (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistApi.createTodolist(newTitle)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setStatusAC('succeeded'))
            })
            .catch(e => {
                dispatch(setErrorAC('Maximum copies - 10'))
                dispatch(setStatusAC('failed'))
            })
    }

export const removeTodolistTC = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    dispatch(changeEntityStatusAC({todoId, entity: "loading"}))
    todolistApi.deleteTodolist(todoId)
        .then(() => {
            dispatch(removeTodolistAC({todoId}))
            dispatch(setStatusAC('succeeded'))
        })
        .catch(e => {
            dispatch(setErrorAC(e.message))
            dispatch(setStatusAC('failed'))
            dispatch(changeEntityStatusAC({todoId, entity: "failed"}))
        })
}

export const changeTodolistTitleTC = (todoId: string, newTitle: string) =>
    (dispatch: Dispatch) => {
        todolistApi.updateTodolist(todoId, newTitle)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC({todoId, newTitle}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(e => {
                handleServerNetworkError(e, dispatch)
            })
    }

export const removeAllTodo = () => (dispatch: any, getState: () => AppRootStateType) => {
    const todos = getState().todolists
    todos.forEach(todo => {
        setTimeout(() => {
            dispatch(removeTodolistTC(todo.id))
        }, 200)
    })
}

//After the line there will be types of action-creators
//_________________________________________________________________

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type GetTodolistACType = | ReturnType<typeof getTodolistAC>
