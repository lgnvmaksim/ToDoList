import axios, {AxiosResponse} from "axios";


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
export type RequestStatusType = 'loading' | 'succeeded' | 'failed' | 'null'

export type TodolistMainType={
    id: string,
    title: string,
    addedDate:string
    order: number
    filter: FilteredType
    entityStatus: RequestStatusType
}

export type ResponseType<T={}>={
    resultCode: number,
    messages: string[]
    fieldsErrors: Array<string>
    data: T
}

export type TaskItemsType ={
    items: TaskMainType[]
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
    // Low = 0,
    // Middle = 1,
    // Hi = 2,
    // Urgently = 3,
    // Later = 4
}

export type TaskMainType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type ModelType={
    title: string
    description:string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type AuthType={
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

type UserId ={
    userId: string
}

export type AddTaskArgType ={
    todoId: string
    title: string
}



export const authApi ={
    login(data: AuthType){
        return instance.post<ResponseType<UserId>>('auth/login', data)
    },
    logout(){
        return instance.delete<ResponseType>('auth/login')
    },
    me(){
        return instance.get<ResponseType<AuthType & UserId>>('auth/me')
    }
}

export const todolistApi = {
    getTodolist() {
        return instance.get<TodolistMainType[]>('todo-lists')
    },
    createTodolist (todolistTitle: string){
        return instance.post<{title: string}, AxiosResponse<ResponseType<{item: TodolistMainType}>>>('todo-lists', {title: todolistTitle})
    },
    deleteTodolist (todolistId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist (todolistId: string, todolistTitle: string){
        return instance.put<{title: string},AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`, {title: todolistTitle})
    }
}

export const taskApi ={
    getTasks (todolistId: string){
        return instance.get<TaskItemsType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask (arg:AddTaskArgType){
        return instance.post<{title: string}, AxiosResponse<ResponseType<{item: TaskMainType}>>>(`todo-lists/${arg.todoId}/tasks`, {title: arg.title})
    },
    deleteTask (todolistId: string, taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask (todolistId: string, taskId: string, model: ModelType){
        return instance.put<ModelType, AxiosResponse<ResponseType<{item: TaskMainType}>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}