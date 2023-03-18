import React from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useAppSelector} from "../../store";
import {TodolistMainType} from "../../api";
import {Todolist} from "./Todolist";
import {HeadRemote} from "../HeadRemote";

export const TodoMapping = () => {
    const todolists = useAppSelector<TodolistMainType[]>(state => state.todolists)

    return <div>
        <HeadRemote/>
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
                                    'backgroundColor': '#85739B'
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
