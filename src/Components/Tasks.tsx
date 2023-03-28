import React from 'react';
import Checkbox from "@mui/material/Checkbox";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {FilteredType, TaskMainType, TaskStatuses} from "../api";
import {SuperTextField} from "./SuperTextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch, useAppSelector} from "../store";
import {changeCompletedTaskTC, changeTaskTitleTC, removeTaskTC} from "../reducers/taskReducer";


type TaskType = {
    todoId: string,
    filter: FilteredType
}


export const Tasks = ({todoId, filter}: TaskType) => {
    let tasks = useAppSelector<TaskMainType[]>(state => state.tasks[todoId])
    const dispatch = useAppDispatch()

    const changeTaskTitle = (todoId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleTC(todoId, taskId, newTitle))
    }

    const changeCompletedTask = (todoId: string, taskId: string, status: TaskStatuses) => {
        dispatch(changeCompletedTaskTC(todoId, taskId, status))
    }

    const removeTask = (todoId: string, taskId: string) => {
        dispatch(removeTaskTC(todoId, taskId))
    }


    if (filter === 'completed') {
        tasks = tasks.filter(f => f.status === TaskStatuses.Completed)
    }
    if (filter === 'active') {
        tasks = tasks.filter(f => f.status === TaskStatuses.New)
    }


    return <ul style={{paddingLeft: '15px'}}>
        {tasks.map(el =>
            (
                <li key={el.id} style={{listStyleType: 'none'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <Checkbox
                                icon={<BookmarkBorderIcon/>}
                                checkedIcon={<BookmarkIcon/>}
                                checked={el.status === TaskStatuses.Completed}
                                color={'error'}
                                onChange={(e) => changeCompletedTask(todoId, el.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)}/>
                            <SuperTextField title={el.title}
                                            newTitleCallback={(text) => changeTaskTitle(todoId, el.id, text)}
                                            styleWidth={{width: '140px'}}/>
                        </div>
                        <div>
                            <IconButton aria-label="delete"
                                        title={'Remove task'}
                                        style={{color: 'rgb(170,0,255)'}}
                                        size={'small'}
                                        onClick={() => removeTask(todoId, el.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    </div>
                </li>
            ))}
    </ul>
};
