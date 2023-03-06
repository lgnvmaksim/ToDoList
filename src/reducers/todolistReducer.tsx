import {FilteredType, todolistApi, TodolistMainType} from "../api";
import {v1} from "uuid";
import {Dispatch} from "redux";

const initialState: TodolistMainType[] = []

export const todolistReducer = (state: TodolistMainType[] = initialState, action: ActionTodolistType) => {
    switch (action.type) {
        case "GET-TODOLIST": {
            return action.todolist.map(el => ({...el, filter: 'all'}))
        }
        case "REMOVE-TODOLIST": {
            return state.filter(f => f.id !== action.todoId)
        }
        case "ADD-TODOLIST": {
            let newTodo: TodolistMainType = {id: action.todoId, title: action.newTitle, filter: 'all'}
            return [newTodo, ...state]
        }
        case "FILTERED-TASK": {
            return state.map(el => el.id === action.todoId ? {...el, filter: action.filter} : el)
        }
        default:
            return state
    }
}

export const filteredTaskAC = (todoId: string, filter: FilteredType) => ({
    type: 'FILTERED-TASK', todoId, filter
} as const)

export const addTodolistAC = (newTitle: string) => {
    let todoId = v1()
    return {
        type: 'ADD-TODOLIST', todoId, newTitle
    } as const
}

export const removeTodolistAC = (todoId: string) => ({
    type: 'REMOVE-TODOLIST', todoId
} as const)

export const getTodolistAC = (todolist: TodolistMainType[]) => ({
    type: 'GET-TODOLIST', todolist
} as const)


//After the line there will be thunk-creators
//_________________________________________________________________


export const getTodolistTC = () =>
    (dispatch: Dispatch) => {
    todolistApi.getTodolist()
        .then(res=>(
            dispatch(getTodolistAC(res.data))
        ))
}

//After the line there will be types of action-creators
//_________________________________________________________________

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type GetTodolistACType = | ReturnType<typeof getTodolistAC>
type ActionTodolistType =
    AddTodolistACType
    | ReturnType<typeof filteredTaskAC>
    | ReturnType<typeof removeTodolistAC>
    | GetTodolistACType
