import s from './Todolist.module.css'
import {FilteredType, RequestStatusType} from "../../api";
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {AddItemForm} from "../AddItemForm";
import React, {useEffect} from "react";
import {useAppDispatch} from "../../store";
import {createTaskTC, getTaskForEmptyTodoTC} from "../../reducers/taskReducer";
import {SuperTextField} from "../SuperTextField";
import {changeTodolistTitleTC, filteredTaskAC, removeTodolistTC} from "../../reducers/todolistReducer";
import {Tasks} from "../Tasks";
import {SuperFilteredButton} from "../SuperFilteredButton";
import Button from "@mui/material/Button";


type TodolistType = {
    title: string
    todoId: string
    filter: FilteredType
    entityStatus: RequestStatusType

}


export const Todolist = ({title, todoId, filter, entityStatus}: TodolistType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTaskForEmptyTodoTC(todoId))
    }, [dispatch, todoId])


    const filteredTask = (todoId: string, filter: FilteredType) => {
        dispatch(filteredTaskAC({todoId, filter}))
    }

    const addTask = (todoId: string, newTitle: string) => {
        dispatch(createTaskTC(todoId, newTitle))
    }


    const removeTodolist = (todoId: string) => {
        dispatch(removeTodolistTC(todoId))
    }

    const changeTodolistTitle = (todoId: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(todoId, newTitle))
    }



    return <div className={s.todolist}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h3>
                <SuperTextField title={title} newTitleCallback={(newText) => changeTodolistTitle(todoId, newText)}/>
                <IconButton aria-label="delete" title={'Remove todolist'}
                            onClick={() => removeTodolist(todoId)} disabled={entityStatus==='loading'}>
                    <DeleteForeverIcon/>
                </IconButton>
            </h3>
            <Button onClick={()=>addTask(todoId, 'Test Task')} variant={'contained'} style={{color: 'black'}}
                    sx={{
                        backgroundColor: '#E0E0E0',
                        '&:hover': {
                            backgroundColor: 'rgb(170,0,255)'
                        }}}>Add test task</Button>
        </div>

        <AddItemForm addNewForm={(newTitle) => addTask(todoId, newTitle)}
                     label={'Enter your task'}
                     variant={"standard"}
                     buttonTitle={'Add task'}
                     sx={{
                         '& label': {
                             color: 'black',
                         },
                         '& label.Mui-focused': {
                             color: 'black',
                         },
                         '& .MuiInput-underline:after': {
                             borderBottomColor: 'black',
                         },
                         '& .MuiOutlinedInput-root': {
                             '& fieldset': {
                                 borderColor: 'black',
                                 color: 'black',
                             },
                             '&:hover fieldset': {
                                 borderColor: 'black',
                             },
                             '&.Mui-focused fieldset': {
                                 borderColor: 'black',
                                 color: 'black',
                             },
                             '&.Mui-focused ': {
                                 color: 'black',
                             }}}}/>


        <Tasks filter={filter} todoId={todoId}/>

        <div>
            <SuperFilteredButton todoId={todoId} onClick={() => filteredTask(todoId, 'all')}
                                 name={'All'} color={filter==='all'? 'secondary' :'inherit'}
                                 title={'All tasks'}/>
            <SuperFilteredButton todoId={todoId} onClick={() => filteredTask(todoId, 'active')} name={'Active'}
                                 title={'Active tasks'} color={filter==='active'? 'secondary' :'inherit'}/>
            <SuperFilteredButton todoId={todoId} onClick={() => filteredTask(todoId, 'completed')} name={'Completed'}
                                 title={'Completed tasks'} color={filter==='completed'? 'secondary' :'inherit'}/>
        </div>
    </div>
}
