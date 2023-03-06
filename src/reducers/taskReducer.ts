import {ModelType, taskApi, TaskMainType, TaskStatuses} from "../api";
import {AddTodolistACType, GetTodolistACType} from "./todolistReducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";

export type TaskKeyType = {
    [key: string]: TaskMainType[]
}


const initialState: TaskKeyType = {}

export const taskReducer = (state: TaskKeyType = initialState, action: ActionTaskType) => {
    switch (action.type) {
        case "GET-TASKS-FOR-EMPTY-TODO": {
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
                    status: action.status
                } : el)
            }
        }
        case "REMOVE-TASK": {
            return {...state, [action.todoId]: state[action.todoId].filter(f => f.id !== action.taskId)}
        }
        case "ADD-TASK": {
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

export const changeCompletedTaskAC = (todoId: string, taskId: string, status: TaskStatuses) => ({
    type: 'CHANGE-COMPLETED-TASK', todoId, taskId, status
} as const)

const getTaskForEmptyTodoAC = (todoId: string, tasks: TaskMainType[]) => ({
    type: 'GET-TASKS-FOR-EMPTY-TODO', todoId, tasks
} as const)


//After the line there will be thunk-creators
//_________________________________________________________________

export const getTaskForEmptyTodoTC = (todoId: string) =>
    (dispatch: Dispatch) => {
        taskApi.getTasks(todoId)
            .then(res => (
                dispatch(getTaskForEmptyTodoAC(todoId, res.data.items))
            ))
    }

export const removeTaskTC = (todoId: string, taskId: string) =>
    (dispatch: Dispatch) => {
        taskApi.deleteTask(todoId, taskId)
            .then(() => dispatch(removeTaskAC(todoId, taskId)))
    }

export const createTaskTC = (todoId: string, title: string) =>
    (dispatch: Dispatch) => {
        taskApi.createTask(todoId, title)
            .then(res => dispatch(addTaskAC(todoId, res.data.data.item)))
    }

export const changeCompletedTaskTC = (todoId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        let task = getState().tasks[todoId].find(el=>el.id===taskId)
        if (task) {
            let model: ModelType = {
                title: task.title,
                description: task.description,
                completed: task.completed,
                status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                }

        taskApi.updateTask(todoId, taskId, model)
            .then(()=>dispatch(changeCompletedTaskAC(todoId, taskId, status)))
        }
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


