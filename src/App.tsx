import React, {useEffect} from 'react';
import {Todolist} from "./Components/Todolist/Todolist";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {getTodolistTC} from "./reducers/todolistReducer";
import {TodolistMainType} from "./api";
import {useAppDispatch, useAppSelector} from "./store";
import {ErrorSnackbar} from "./Components/ErrorSnackbar";
import {HeadRemote} from "./Components/HeadRemote";


export const App = () => {
    const dispatch = useAppDispatch()
    const todolists = useAppSelector<TodolistMainType[]>(state => state.todolists)

    useEffect(() => {
        dispatch(getTodolistTC())
    }, [dispatch])





    return <div style={{'height': '100vh', 'backgroundColor': 'blanchedalmond'}}>
        <AppBar position="static" color={'transparent'} style={{'backgroundColor': '#e7c5a0'}}>
            <Toolbar>
                <IconButton sx={{mr: 2}}>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Todolist by Maxim Loginov
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>

        <HeadRemote/>

        <div>
            <Paper style={{padding: '5px', marginTop: '10px', borderRadius: '10px', backgroundColor: '#f8e4d0'}}
                   elevation={16}>
                <div>
                    <Container>
                        <Grid container spacing={3}>
                            {todolists.map(el => {
                                    return (
                                        <Grid item
                                              key={el.id}>
                                            <Paper style={{
                                                'padding': '5px',
                                                'marginTop': '10px',
                                                'borderRadius': '10px',
                                                'backgroundColor': '#f8e4d0'
                                            }} elevation={16}>
                                                <Todolist
                                                    key={el.id}
                                                    todoId={el.id}
                                                    title={el.title}
                                                    filter={el.filter}
                                                    entityStatus={el.entityStatus}
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
            <ErrorSnackbar/>
        </div>

    </div>
}
