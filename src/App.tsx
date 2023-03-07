import React, {useEffect} from 'react';
import {Todolist} from "./Components/Todolist/Todolist";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    changeCompletedTaskTC,
    changeTaskTitleTC,
    createTaskTC,
    removeTaskTC,
    TaskKeyType
} from "./reducers/taskReducer";
import {
    addNewTodolistTC,
    changeTodolistTitleTC,
    filteredTaskAC,
    getTodolistTC,
    removeTodolistTC
} from "./reducers/todolistReducer";
import {FilteredType, TaskStatuses, TodolistMainType} from "./api";
import {AddItemForm} from "./Components/AddItemForm";
import {useAppDispatch, useAppSelector} from "./store";


export const App = () => {

    const dispatch = useAppDispatch()

 useEffect(()=>{
    dispatch(getTodolistTC())
 },[dispatch])

    const todolists = useAppSelector<TodolistMainType[]>(state => state.todolists)
    const tasks = useAppSelector<TaskKeyType>(state => state.tasks)

    const addTodolist = (newTitle: string) => {
        dispatch(addNewTodolistTC(newTitle))
    }

    const removeTask = (todoId: string, taskId: string) => {
        dispatch(removeTaskTC(todoId, taskId))
    }

    const filteredTask = (todoId: string, filter: FilteredType) => {
        dispatch(filteredTaskAC(todoId, filter))
    }

    const addTask = (todoId: string, newTitle: string) => {
        dispatch(createTaskTC(todoId, newTitle))
    }

    const changeCompletedTask = (todoId: string, taskId: string, status: TaskStatuses) => {
        dispatch(changeCompletedTaskTC(todoId, taskId, status))
    }



    const removeTodolist = (todoId: string) => {
        dispatch(removeTodolistTC(todoId))
        delete tasks[todoId]
    }

    const changeTaskTitle = (todoId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleTC(todoId, taskId, newTitle))
    }

    const changeTodolistTitle = (todoId: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(todoId, newTitle))
    }


    return <div style={{'height': '100vh', 'backgroundColor': 'blanchedalmond'}}>
        <AppBar position="static" color={'transparent'} style={{'backgroundColor': '#e7c5a0'}}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="info"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Todolist by Maxim Loginov
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        <AddItemForm
            style={{'margin': '10px'}}
            addNewForm={addTodolist}
                     label={'Enter new todolist'}
                     variant={"outlined"}
                     buttonTitle={'Add todolist'}/>
        <Paper style={{'padding': '5px', 'marginTop': '10px', 'borderRadius': '10px', 'backgroundColor': '#f8e4d0'}}
               elevation={16}>
            <div>
                <Container>
                    <Grid container spacing={3}>
                        {todolists.map(el => {
                                let filteredTasks = tasks[el.id]
                                if (el.filter === 'active') {
                                    filteredTasks = tasks[el.id].filter(f => !f.status)
                                }
                                if (el.filter === 'completed') {
                                    filteredTasks = tasks[el.id].filter(f => f.status)
                                }
                                return (
                                    <Grid item>
                                        <Paper style={{
                                            'padding': '5px',
                                            'marginTop': '10px',
                                            'borderRadius': '10px',
                                            'backgroundColor': '#f8e4d0'
                                        }} elevation={16}>
                                            <Todolist
                                                key={el.id}
                                                todoId={el.id}
                                                tasks={filteredTasks}
                                                title={el.title}
                                                removeTask={removeTask}
                                                filteredTask={filteredTask}
                                                addTask={addTask}
                                                changeCompletedTask={changeCompletedTask}
                                                removeTodolist={removeTodolist}
                                                changeTaskTitle={changeTaskTitle}
                                                changeTodolistTitle={changeTodolistTitle}
                                            />
                                        </Paper>
                                    </Grid>
                                )
                            }
                        )
                        }
                    </Grid>
                </Container>
            </div>
        </Paper>
    </div>
}
