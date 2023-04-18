import React from 'react';
import LinearProgress from "@mui/material/LinearProgress";
import {AddItemForm} from "./AddItemForm";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch, useAppSelector} from "../store";
import {removeAllTodo, todolistThunks} from "../reducers/todolist/todolistReducer";



export const HeadRemote = () => {
    const dispatch = useAppDispatch()


    const addTodolist = (newTitle: string) => {
        dispatch(todolistThunks.addNewTodolist(newTitle))
    }

    const removeAllTodolists = () => {
        dispatch(removeAllTodo())
    }

    const preloader = useAppSelector(state=>state.app.preloader)
    return (
        <div>
            {preloader==='loading' && <LinearProgress color="inherit"/>}
            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap:'wrap'}}>
                <AddItemForm
                    style={{margin: '7px', color: 'white'}}
                    sx={{
                        '& label': {
                            color: 'white',
                        },
                        '& label.Mui-focused': {
                            color: 'white',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: 'white',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                                color: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                                color: 'white',
                            },
                            '&.Mui-focused ': {
                                color: 'white',
                            }}}}
                    addNewForm={addTodolist}
                    label={'Enter new todolist'}
                    variant={"outlined"}
                    buttonTitle={'Add todolist'}
                />
                <Button style={{color: 'white', borderColor:'white', margin: '5px'}} onClick={()=>{addTodolist('Test Todolist')}} variant={'outlined'}>Click to add test todolist</Button>
                <Button  variant="outlined" startIcon={<DeleteIcon />} style={{color: 'white', borderColor:'white', margin: '5px', minWidth:'100px'}} onClick={removeAllTodolists}>
                    Delete all
                </Button>
            </div>
        </div>
    );
};

