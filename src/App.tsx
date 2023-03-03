import React, {useReducer} from 'react';
import {v1} from "uuid";
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
import {addTaskAC, removeTaskAC, taskReducer} from "./reducers/taskReducer";
import {filteredTaskAC, todolistReducer} from "./reducers/todolistReducer";
import {FilteredType} from "./api";


export const App = () => {

    let todolistID1 = v1()
    let todolistID2 = v1()


    const [todolists, todoDispatch] =  useReducer(todolistReducer ,[
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ]
    )
    const [tasks, taskDispatch]  = useReducer(taskReducer,{
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", completed: true},
            {id: v1(), title: "JS", completed: true},
            {id: v1(), title: "ReactJS", completed: false},
            {id: v1(), title: "Rest API", completed: false},
            {id: v1(), title: "GraphQL", completed: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", completed: true},
            {id: v1(), title: "JS2", completed: true},
            {id: v1(), title: "ReactJS2", completed: false},
            {id: v1(), title: "Rest API2", completed: false},
            {id: v1(), title: "GraphQL2", completed: false},
        ]
    })

    const removeTask = (todoId: string, taskId: string) => {
        taskDispatch(removeTaskAC(todoId, taskId))
    }

    const filteredTask = (todoId: string, filter: FilteredType) => {
        todoDispatch(filteredTaskAC(todoId, filter))
    }

    const addTask = (todoId: string, newTitle: string) => {
        taskDispatch(addTaskAC(todoId, newTitle))
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
        <Paper style={{'padding': '5px', 'marginTop': '10px', 'borderRadius': '10px', 'backgroundColor': '#f8e4d0'}}
               elevation={16}>
            <div>
                <Container>
                    <Grid container spacing={3}>
                        {todolists.map(el => {
                                let filteredTasks = tasks[el.id]
                                if (el.filter === 'active') {
                                    filteredTasks = tasks[el.id].filter(f => !f.completed)
                                }
                                if (el.filter === 'completed') {
                                    filteredTasks = tasks[el.id].filter(f => f.completed)
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
                                            filter={el.filter}
                                            filteredTask={filteredTask}
                                            addTask={addTask}
                                        />
                                    </Paper>
                                </Grid>
                            )}
                            )
                        }


                    </Grid>
                </Container>

            </div>
        </Paper>


    </div>
}
