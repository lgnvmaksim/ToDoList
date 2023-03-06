import {taskApi, TaskMainType} from "../api";
import {v1} from "uuid";
import {AddTodolistACType, GetTodolistACType} from "./todolistReducer";
import {Dispatch} from "redux";

export type TaskKeyType = {
    [key: string]: TaskMainType[]
}


const initialState: TaskKeyType = {}

export const taskReducer = (state: TaskKeyType = initialState, action: ActionTaskType) => {
    switch (action.type) {
        case "GET-TASKS-FOR-EMPTY-TODO":{
            return {
                ...state, [action.todoId]: action.tasks
            }
        }
        case "GET-TODOLIST": {
            let copyState = {...state}
            action.todolist.forEach(el => {
                    copyState[el.id] = []
                }
            )
            return copyState
        }
        case "ADD-TODOLIST": {
            return {
                ...state, [action.todoId]: []
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
            // let newTask = {id: v1(), title: action.newTitle, completed: true}
            return {
                ...state, [action.todoId]: [action.newTask, ...state[action.todoId]]
            }
        }
        default:
            return state
    }
}

export const removeTaskAC = (todoId: string, taskId: string) => ({type: 'REMOVE-TASK', todoId, taskId} as const)

export const addTaskAC = (todoId: string, newTask: TaskMainType) => ({
    type: 'ADD-TASK', todoId, newTask
} as const)

export const changeCompletedTaskAC = (todoId: string, taskId: string, completed: boolean) => ({
    type: 'CHANGE-COMPLETED-TASK', todoId, taskId, completed
} as const)

const getTaskForEmptyTodoAC = (todoId: string, tasks: TaskMainType[]) => ({
    type: 'GET-TASKS-FOR-EMPTY-TODO', todoId, tasks
} as const)


//After the line there will be thunk-creators
//_________________________________________________________________

export const getTaskForEmptyTodoTC = (todoId: string) =>
    (dispatch: Dispatch) => {
    taskApi.getTasks(todoId)
        .then(res =>(
            dispatch(getTaskForEmptyTodoAC(todoId ,res.data.items))
        ))
}

export const removeTaskTC = (todoId: string, taskId: string) =>
    (dispatch: Dispatch) => {
    taskApi.deleteTask(todoId, taskId)
        .then(()=>dispatch(removeTaskAC(todoId, taskId)))
}

export const createTaskTC = (todoId: string, title: string) =>
    (dispatch: Dispatch)=> {
taskApi.createTask(todoId, title)
    .then(res=> dispatch(addTaskAC(todoId, res.data.data.item)))
}

//After the line there will be types of action-creators
//_________________________________________________________________

type ActionTaskType =
    AddTodolistACType
    | GetTodolistACType
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeCompletedTaskAC>
    | ReturnType<typeof getTaskForEmptyTodoAC>


