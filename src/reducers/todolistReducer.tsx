import {FilteredType, TodolistMainType} from "../api";


export const todolistReducer = (state: TodolistMainType[], action: ActionTodolistType) => {
    switch (action.type){
        case "FILTERED-TASK":{
            return  state.map(el=>el.id===action.todoId ? {...el, filter: action.filter} : el)
        }
        default: return state
    }
}

export const filteredTaskAC = (todoId: string, filter: FilteredType) => ({type: 'FILTERED-TASK', todoId, filter} as const)

type ActionTodolistType =
    ReturnType<typeof filteredTaskAC>