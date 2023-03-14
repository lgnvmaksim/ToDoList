import React from 'react';
import LinearProgress from "@mui/material/LinearProgress";
import {AddItemForm} from "./AddItemForm";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch, useAppSelector} from "../store";
import {addNewTodolistTC, removeAllTodo, removeAllTodolistsAC} from "../reducers/todolistReducer";



export const HeadRemote = () => {
    const dispatch = useAppDispatch()


    const addTodolist = (newTitle: string) => {
        dispatch(addNewTodolistTC(newTitle))
    }

    const removeAllTodolists = () => {
        dispatch(removeAllTodo())
    }

    const preloader = useAppSelector(state=>state.app.preloader)
    return (
        <div>
            {preloader==='loading' && <LinearProgress color="inherit"/>}
            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                <AddItemForm
                    style={{'margin': '7px'}}
                    addNewForm={addTodolist}
                    label={'Enter new todolist'}
                    variant={"outlined"}
                    buttonTitle={'Add todolist'}
                />
                <Button onClick={()=>{addTodolist('Test Todolist')}} variant={'text'}>Add test todolist</Button>
                <Button variant="outlined" startIcon={<DeleteIcon />} style={{color: '#a85304', borderColor: '#a85304'}} onClick={removeAllTodolists}>
                    Delete all
                </Button>
            </div>
        </div>
    );
};

