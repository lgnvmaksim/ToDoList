import {AddTaskArgType, ModelType, taskApi, TaskMainType, TaskStatuses} from "../../api";
import {addTodolistAC, getTodolistAC, removeTodolistAC} from "../todolist/todolistReducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../store";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../utils/create-app-async-thunk";

type ThunkError = {
    dispatch: (action: any)=> any
    rejectWithValue: Function
}
const getTaskForEmptyTodo = createAppAsyncThunk<{ tasks: TaskMainType[], todoId: string }, string >
('task/getTaskForEmptyTodo', async (todoId, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const res = await taskApi.getTasks(todoId)
        const tasks = res.data.items
        return {todoId, tasks}
    } catch (e) {
        handleServerNetworkError(e, dispatch)
       return rejectWithValue(null)
    }
})

const createTask = createAppAsyncThunk<{ newTask: TaskMainType}, AddTaskArgType>
('task/createTask', async (arg: AddTaskArgType, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const res = await taskApi.createTask(arg)
        if (res.data.resultCode === 0) {
            return {newTask: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
             return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }

})


export type TaskKeyType = {
    [key: string]: TaskMainType[]
}
const initialState: TaskKeyType = {}
const slice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todoId: string, taskId: string }>) {
            const tasks = state[action.payload.todoId]
            const index = tasks.findIndex(el => el.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        /*    addTaskAC(state, action: PayloadAction<{ todoId: string, newTask: TaskMainType }>) {
                state[action.payload.todoId].unshift(action.payload.newTask)
            },*/
        changeCompletedTaskAC(state, action: PayloadAction<{ todoId: string, taskId: string, status: TaskStatuses }>) {
            const tasks = state[action.payload.todoId]
            const index = tasks.findIndex(el => el.id === action.payload.taskId)
            tasks[index].status = action.payload.status
        },
        changeTaskTitleAC(state, action: PayloadAction<{ todoId: string, taskId: string, newTitle: string }>) {
            const tasks = state[action.payload.todoId]
            const index = tasks.findIndex(el => el.id === action.payload.taskId)
            tasks[index].title = action.payload.newTitle
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createTask.fulfilled, (state, action) => {
                state[action.payload.newTask.todoListId].unshift(action.payload.newTask)
            })
            .addCase(getTaskForEmptyTodo.fulfilled, (state, action) => {
                state[action.payload.todoId] = action.payload.tasks
            })
            .addCase(addTodolistAC, (state, action) => {
                state[action.payload.id] = []
            })
            .addCase(removeTodolistAC, (state, action) => {
                delete state[action.payload.todoId]
            })
            .addCase(getTodolistAC, (state, action) => {
                action.payload.forEach((tl: any) => {
                    state[tl.id] = []
                })
            });
    }
})


export const {removeTaskAC, changeCompletedTaskAC, changeTaskTitleAC} = slice.actions
export const taskReducer = slice.reducer
export const tasksThunks = {getTaskForEmptyTodo, createTask}


export const removeTaskTC = (todoId: string, taskId: string) =>
    (dispatch: Dispatch) => {
        taskApi.deleteTask(todoId, taskId)
            .then(() => dispatch(removeTaskAC({todoId, taskId})))
    }

// export const createTaskTC = (todoId: string, title: string) =>
//     (dispatch: Dispatch) => {
//         taskApi.createTask(todoId, title)
//             .then(res => dispatch(addTaskAC({todoId, newTask: res.data.data.item})))
//             .catch(e => {
//                 handleServerNetworkError(e, dispatch)
//             })
//     }

export const changeCompletedTaskTC = (todoId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        let tasks = getState().tasks[todoId].find(el => el.id === taskId)
        if (tasks) {
            let model: ModelType = {
                title: tasks.title,
                description: tasks.description,
                completed: tasks.completed,
                status,
                priority: tasks.priority,
                startDate: tasks.startDate,
                deadline: tasks.deadline,
            }

            taskApi.updateTask(todoId, taskId, model)
                .then(() => dispatch(changeCompletedTaskAC({todoId, taskId, status})))
        }
    }


export const changeTaskTitleTC = (todoId: string, taskId: string, newTitle: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        let tasks = getState().tasks[todoId].find(el => el.id === taskId)
        if (tasks) {
            let model: ModelType = {
                title: newTitle,
                description: tasks.description,
                completed: tasks.completed,
                status: tasks.status,
                priority: tasks.priority,
                startDate: tasks.startDate,
                deadline: tasks.deadline,
            }
            taskApi.updateTask(todoId, taskId, model)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(changeTaskTitleAC({todoId, taskId, newTitle}))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch(e => {
                    handleServerNetworkError(e, dispatch)
                })
        }

    }