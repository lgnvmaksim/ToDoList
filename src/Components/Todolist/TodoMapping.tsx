import React, {useEffect} from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useAppDispatch, useAppSelector} from "../../store";
import {TodolistMainType} from "../../api";
import {Todolist} from "./Todolist";
import {HeadRemote} from "../HeadRemote";
import {getTodolistTC} from "../../reducers/todolist/todolistReducer";
import {Navigate} from "react-router-dom";

export const TodoMapping = () => {
    const todolists = useAppSelector<TodolistMainType[]>(state => state.todolists)
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getTodolistTC())
        }
    }, [])


    if (!isLoggedIn) {
        return <Navigate to={'login'}/>
    }

    return <div>
        <HeadRemote/>
        <Container>
            <Grid container spacing={3}>
                {todolists.map(el => {
                        return (
                            <Grid item
                                  key={el.id}>
                                <Paper style={{
                                    padding: '5px',
                                    marginTop: '10px',
                                    borderRadius: '10px',
                                    backgroundColor: 'rgba(187,183,239,0.59)'
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

};
