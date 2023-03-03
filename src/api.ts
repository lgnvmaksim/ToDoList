import axios from "axios";

const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        headers: {
            'API-KEY': 'b4d8e782-12a1-4cd0-86dd-a8ec637b9008'
        }
    }
)

export type FilteredType = 'all' | 'active' | 'completed'

export type TodolistMainType={
    id: string,
    title: string,
    addedDate?:string
    order?: number
    filter: FilteredType
}

type ResponseType<T={}>={
    resultCode: number,
    messages: string[]
    data: T
}

type TaskItemsType ={
    items: TaskMainType
    totalCount: number
    error: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskMainType = {
    description?: string
    title: string
    completed: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    id: string
    todoListId?: string
    order?: number
    addedDate?: string
}

type ModelType={
    title: string
    description:string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}


export const todolistApi = {
    getTodolist() {
        return instance.get<TodolistMainType>('todo-lists')
    },
    createTodolist (todolistTitle: string){
        return instance.post<ResponseType<{item: TodolistMainType}>>('todo-lists', {title: todolistTitle})
    },
    deleteTodolist (todolistId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist (todolistId: string, todolistTitle: string){
        return instance.put<TodolistMainType>(`todo-lists/${todolistId}`, {todolistTitle})
    }
}

export const taskApi ={
    getTasks (todolistId: string){
        return instance.get<TaskItemsType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask (todolistId: string, taskTitle: string){
        return instance.post<ResponseType<{item: TaskMainType}>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    deleteTask (todolistId: string, taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask (todolistId: string, taskId: string, model: ModelType){
        return instance.put<ResponseType<{item: TaskMainType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}