import {FilteredType, todolistApi, TodolistMainType} from "../api";
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
            // let newTodo: TodolistMainType = {id: action.todoId, title: action.newTitle, filter: 'all'}
            let newTodolist: TodolistMainType = {...action.todolists, filter: 'all'}
            return [newTodolist, ...state]
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

export const addTodolistAC = (todolists: TodolistMainType) => {
    // let todoId = v1()
    return {
        type: 'ADD-TODOLIST', todolists
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
            .then(res => (
                dispatch(getTodolistAC(res.data))
            ))
    }

export const addNewTodolistTC = (newTitle: string) =>
    (dispatch: Dispatch) => {
    todolistApi.createTodolist(newTitle)
        .then(res=>dispatch(addTodolistAC(res.data.data.item)))
    }
    
export const removeTodolistTC = (todoId: string) => (dispatch: Dispatch)=> {
   todolistApi.deleteTodolist(todoId)
       .then(()=>dispatch(removeTodolistAC(todoId)))
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
