import {TaskMainType} from "../api";
import {v1} from "uuid";
import {addTodolistACType} from "./todolistReducer";

export type TaskKeyType = {
    [key: string]: TaskMainType[]
}


const initialState: TaskKeyType = {}

export const taskReducer = (state: TaskKeyType=initialState, action: ActionTaskType) => {
    switch (action.type) {
        case "ADD-TODOLIST":{
            return {
                ...state, [action.todoId]: [
                    {id: v1(), title: "HTML&CSS2", completed: true},
                    {id: v1(), title: "JS2", completed: true},
                ]
            }
        }
        case "CHANGE-COMPLETED-TASK": {
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(el => el.id === action.taskId ? {
                    ...el,
                    completed: action.completed
                } : el)
            }
        }
        case "REMOVE-TASK": {
            return {...state, [action.todoId]: state[action.todoId].filter(f => f.id !== action.taskId)}
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.newTitle, completed: true}
            return {
                ...state, [action.todoId]: [newTask, ...state[action.todoId]]
            }
        }
        default:
            return state
    }
}

export const removeTaskAC = (todoId: string, taskId: string) => ({type: 'REMOVE-TASK', todoId, taskId} as const)
export const addTaskAC = (todoId: string, newTitle: string) => ({
    type: 'ADD-TASK', todoId, newTitle
} as const)
export const changeCompletedTaskAC = (todoId: string, taskId: string, completed: boolean) => ({
    type: 'CHANGE-COMPLETED-TASK', todoId, taskId, completed
} as const)


type ActionTaskType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeCompletedTaskAC>
    | addTodolistACType

