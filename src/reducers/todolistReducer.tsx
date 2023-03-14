import {FilteredType, RequestStatusType, todolistApi, TodolistMainType} from "../api";
import {Dispatch} from "redux";
import {setErrorAC, setStatusAC, SetStatusACType} from "./appReducer";
import {handleServerNetworkError} from "../utils/errorUtils";


const initialState: TodolistMainType[] = []

export const todolistReducer = (state: TodolistMainType[] = initialState, action: ActionTodolistType) => {
    switch (action.type) {
        case "CHANGE-ENTITY-STATUS":
            return state.map(el=> el.id===action.todoId ? {...el, entityStatus: action.entity} :el)

        case "REMOVE-ALL-TODOLISTS": return []

        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.todoId ? {...el, title: action.newTitle} : el)

        case "GET-TODOLIST":
            return action.todolist.map(el => ({...el, filter: 'all'}))

        case "REMOVE-TODOLIST":
            return state.filter(f => f.id !== action.todoId)

        case "ADD-TODOLIST":
            let newTodolist: TodolistMainType = {...action.todolists, filter: 'all'}
            return [newTodolist, ...state]

        case "FILTERED-TASK":
            return state.map(el => el.id === action.todoId ? {...el, filter: action.filter} : el)

        default:
            return state
    }
}

export const filteredTaskAC = (todoId: string, filter: FilteredType) => ({
    type: 'FILTERED-TASK', todoId, filter
} as const)

export const addTodolistAC = (todolists: TodolistMainType) => ({
    type: 'ADD-TODOLIST', todolists
} as const)

export const removeTodolistAC = (todoId: string) => ({
    type: 'REMOVE-TODOLIST', todoId
} as const)

export const getTodolistAC = (todolist: TodolistMainType[]) => ({
    type: 'GET-TODOLIST', todolist
} as const)

const changeTodolistTitleAC = (todoId: string, newTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', todoId, newTitle
} as const)

export const removeAllTodolistsAC = () => ({
    type: 'REMOVE-ALL-TODOLISTS'
} as const)

const changeEntityStatusAC = (todoId: string, entity: RequestStatusType) => ({
 type:'CHANGE-ENTITY-STATUS', todoId, entity
}as const)
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
            .catch(e=> {
                handleServerNetworkError(e, dispatch)
            })
    }

export const removeTodolistTC = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    dispatch(changeEntityStatusAC(todoId, "loading"))
    todolistApi.deleteTodolist(todoId)
        .then(() => {
            dispatch(removeTodolistAC(todoId))
            dispatch(setStatusAC('succeeded'))
        })
        .catch(e => {
            dispatch(setErrorAC(e.message))
            dispatch(setStatusAC('failed'))
            dispatch(changeEntityStatusAC(todoId, "failed"))
        })
}

export const changeTodolistTitleTC = (todoId: string, newTitle: string) =>
    (dispatch: Dispatch) => {
        todolistApi.updateTodolist(todoId, newTitle)
            .then(() => {
                dispatch(changeTodolistTitleAC(todoId, newTitle))
            })
    }


//After the line there will be types of action-creators
//_________________________________________________________________

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type GetTodolistACType = | ReturnType<typeof getTodolistAC>
type ActionTodolistType =
    AddTodolistACType
    | GetTodolistACType
    | SetStatusACType
    | ReturnType<typeof filteredTaskAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof removeAllTodolistsAC>
    | ReturnType<typeof changeEntityStatusAC>

