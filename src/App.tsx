import React from 'react';
import {v1} from "uuid";
import {Todolist} from "./Components/Todolist/Todolist";
import {TaskMainType, TodolistMainType} from "./api";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";


type TaskKeyType = {
    [key: string]: TaskMainType[]
}

export const App = () => {

    let todolistID1 = v1()
    let todolistID2 = v1()


    const todolists: TodolistMainType[] = [
        {id: todolistID1, title: 'What to learn'},
        {id: todolistID2, title: 'What to buy'},
    ]

    const tasks: TaskKeyType = {
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
    };


    return <div style={{'height': '100vh', 'backgroundColor': 'blanchedalmond'}}>
        <AppBar position="static" color={'transparent'} style={{'backgroundColor': '#e7c5a0'}} >
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
        <div /*style={{'display': 'flex', 'padding': '10px', }}*/>
            <Container>
                <Grid container spacing={3}>
                    {todolists.map(el =>
                        <Grid item>
                            <Paper style={{'padding': '5px', 'marginTop': '10px', 'borderRadius': '10px', 'backgroundColor': '#f8e4d0'}} elevation={16} >
                                <Todolist
                                    key={el.id}
                                    todoId={el.id}
                                    tasks={tasks[el.id]}
                                    title={el.title}
                                />
                            </Paper>

                        </Grid>
                    )}
                </Grid>
            </Container>

        </div>

    </div>
}
