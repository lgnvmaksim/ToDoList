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
import {addNewTodolistTC, getTodolistTC} from "./reducers/todolistReducer";
import {TodolistMainType} from "./api";
import {AddItemForm} from "./Components/AddItemForm";
import {useAppDispatch, useAppSelector} from "./store";


export const App = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistTC())
    }, [dispatch])

    const todolists = useAppSelector<TodolistMainType[]>(state => state.todolists)


    const addTodolist = (newTitle: string) => {
        dispatch(addNewTodolistTC(newTitle))
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
            style={{'margin': '7px'}}
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
                                                title={el.title}
                                                filter={el.filter}
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
