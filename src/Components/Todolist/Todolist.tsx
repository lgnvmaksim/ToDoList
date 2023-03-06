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
import {useEffect} from "react";
import {useAppDispatch} from "../../store";
import {getTaskForEmptyTodoTC} from "../../reducers/taskReducer";


type TodolistType = {
    tasks: TaskMainType[]
    title: string
    todoId: string
    filter: FilteredType
    removeTask: (todoId: string, taskId: string) => void
    filteredTask: (todoId: string, filter: FilteredType) => void
    addTask: (todoId: string, newTitle: string) => void
    changeCompletedTask: (todoId: string, taskId: string, status: TaskStatuses) => void
    removeTodolist: (todoId: string) => void

}


export const Todolist = ({
                             tasks,
                             title,
                             todoId,
                             removeTask,
                             filteredTask,
                             addTask,
                             changeCompletedTask,
                             removeTodolist
                         }: TodolistType) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTaskForEmptyTodoTC(todoId))
    }, [])

    return <div className={s.todolist}>
        <h3>
            {title}
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
                                    checked={el.status===TaskStatuses.Completed}
                                    color={'error'}
                                    onChange={
                                        (e) => changeCompletedTask(todoId, el.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)}/>
                                <span>{el.title}</span>
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