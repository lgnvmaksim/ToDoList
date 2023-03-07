import s from './Todolist.module.css'
import {FilteredType, TaskMainType, TaskStatuses} from "../../api";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {AddItemForm} from "../AddItemForm";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {
    changeCompletedTaskTC,
    changeTaskTitleTC,
    createTaskTC,
    getTaskForEmptyTodoTC,
    removeTaskTC
} from "../../reducers/taskReducer";
import {SuperTextField} from "../SuperTextField";
import {changeTodolistTitleTC, filteredTaskAC, removeTodolistTC} from "../../reducers/todolistReducer";


type TodolistType = {
    title: string
    todoId: string
    filter: FilteredType

}


export const Todolist = ({

                             title,
                             todoId,
                             filter
                         }: TodolistType) => {


    let tasks = useAppSelector<TaskMainType[]>(state => state.tasks[todoId])

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTaskForEmptyTodoTC(todoId))
    }, [])

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
        // delete tasks[todoId]
    }

    const changeTaskTitle = (todoId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleTC(todoId, taskId, newTitle))
    }

    const changeTodolistTitle = (todoId: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(todoId, newTitle))
    }

    if (filter === 'completed') {
        tasks = tasks.filter(f => f.status===TaskStatuses.Completed)
    }
    if (filter === 'active') {
        tasks = tasks.filter(f => f.status===TaskStatuses.New)
    }


    return <div className={s.todolist}>
        <h3>
           <SuperTextField title={title} newTitleCallback={(newText)=>changeTodolistTitle(todoId, newText)} styleWidth={{width: '185px'}}/>
            <IconButton aria-label="delete" title={'Remove todolist'} style={removeButtonStyle}
                        onClick={() => removeTodolist(todoId)}>
                <DeleteForeverIcon/>
            </IconButton>
        </h3>
        <AddItemForm addNewForm={(newTitle) => addTask(todoId, newTitle)}
                     label={'Enter your task'}
                     variant={"standard"}
                     buttonTitle={'Add task'}/>
        <ul style={{'paddingLeft': '15px'}}>
            {tasks.map(el =>

                (
                    <li key={el.id} style={{'listStyleType': 'none'}}>
                        <div style={{'display': 'flex', 'justifyContent': 'space-between'}}>
                            <div>
                                <Checkbox
                                    icon={<BookmarkBorderIcon/>}
                                    checkedIcon={<BookmarkIcon/>}
                                    checked={el.status === TaskStatuses.Completed}
                                    color={'error'}
                                    onChange={(e) => changeCompletedTask(todoId, el.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)}/>
                                <SuperTextField title={el.title}
                                                newTitleCallback={(text)=>changeTaskTitle(todoId, el.id, text)}
                                styleWidth={{width: '140px'}}/>
                            </div>
                            <div>
                                <IconButton aria-label="delete"
                                            title={'Remove task'}
                                            style={removeButtonStyle}
                                            size={'small'}
                                            onClick={() => removeTask(todoId, el.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </div>
                        </div>
                    </li>
                ))}
        </ul>


        <div>
            <Button variant="contained" color='inherit' className={s.buttonFilter}
                    style={buttonFilteredStyle} title={'All tasks'}
                    onClick={() => filteredTask(todoId, 'all')}>All</Button>
            <Button variant="contained" color='inherit' className={s.buttonFilter}
                    style={buttonFilteredStyle} title={'Only active task'}
                    onClick={() => filteredTask(todoId, 'active')}>Active</Button>

            <Button variant="contained" color='inherit' className={s.buttonFilter}
                    style={buttonFilteredStyle} title={'Completed tasks'}
                    onClick={() => filteredTask(todoId, 'completed')}>Completed</Button>
        </div>
    </div>
}

const buttonFilteredStyle = {
    padding: '5px',
    margin: '5px',
    fontSize: '0.805rem',
    minWidth: '50px',
    color: '#5b3f01'
}

const removeButtonStyle = {
    color: '#8d650b',
}