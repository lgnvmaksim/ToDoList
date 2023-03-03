import {FilteredType, TodolistMainType} from "../api";
import {v1} from "uuid";


export const todolistReducer = (state: TodolistMainType[], action: ActionTodolistType) => {
    switch (action.type) {
        case "ADD-TODOLIST":{
            let newTodo: TodolistMainType = {id: action.todoId, title: action.newTitle, filter: 'all'}
            return [newTodo,...state]
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

export type addTodolistACType = ReturnType<typeof addTodolistAC>

type ActionTodolistType =
    ReturnType<typeof filteredTaskAC>
    | addTodolistACType