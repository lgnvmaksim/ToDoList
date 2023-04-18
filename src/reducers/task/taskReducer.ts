import {AddTaskArgType, ChangeCompletedTask, ModelType, RemoveTaskArgType, taskApi, TaskMainType} from "../../api";
import {addTodolistAC, getTodolistAC, removeTodolistAC} from "../todolist/todolistReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../utils/create-app-async-thunk";
import {setStatusAC} from "../app/appReducer";


const getTaskForEmptyTodo = createAppAsyncThunk<{ tasks: TaskMainType[], todoId: string }, string>
('task/getTaskForEmptyTodo', async (todoId, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setStatusAC('loading'))
        const res = await taskApi.getTasks(todoId)
        const tasks = res.data.items
        return {todoId, tasks}
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const createTask = createAppAsyncThunk<{ newTask: TaskMainType }, AddTaskArgType>
('task/createTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setStatusAC('loading'))
        const res = await taskApi.createTask(arg)
        console.log(res)
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


const removeTask = createAppAsyncThunk <RemoveTaskArgType, RemoveTaskArgType>
('task/removeTask', async (arg, thunkAPI)=>{
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setStatusAC('loading'))
        const res =  await taskApi.deleteTask(arg)
        console.log(res)
        if (res.data.resultCode===0){
            return arg
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})


const changeCompletedOnTask = createAppAsyncThunk<ChangeCompletedTask, ChangeCompletedTask>
('task/changeCompletedTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    try {
        dispatch(setStatusAC('loading'))
        let tasks = getState().tasks[arg.todoId].find(el => el.id === arg.taskId)
        if (!tasks) {
            return rejectWithValue(null)
        }
        let model: ModelType = {
            title: tasks.title,
            description: tasks.description,
            completed: tasks.completed,
            status: tasks.status,
            priority: tasks.priority,
            startDate: tasks.startDate,
            deadline: tasks.deadline,
            ...arg.model
        }
        const res = await taskApi.updateTask(arg.todoId, arg.taskId, model)
        if (res.data.resultCode === 0) {
            return arg
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
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(removeTask.fulfilled, (state, action)=>{
                const tasks = state[action.payload.todoId]
                const index = tasks.findIndex(el => el.id === action.payload.taskId)
                if (index > -1) {
                    tasks.splice(index, 1)
                }
            })
            .addCase(changeCompletedOnTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todoId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index !== -1) {
                    tasks[index] = {...tasks[index], ...action.payload.model}
                }
            })
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
                action.payload.forEach((tl) => {
                    state[tl.id] = []
                })
            });
    }
})


// export const {removeTaskAC} = slice.actions
export const taskReducer = slice.reducer
export const tasksThunks = {getTaskForEmptyTodo, createTask, changeCompletedOnTask, removeTask}


