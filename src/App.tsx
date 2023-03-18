import React, {useEffect} from 'react';
import {getTodolistTC} from "./reducers/todolistReducer";
import {useAppDispatch} from "./store";
import {ErrorSnackbar} from "./Components/ErrorSnackbar";
import {TodoMapping} from "./Components/Todolist/TodoMapping";
import {Header} from "./Components/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./Components/Login";


export const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistTC())
    }, [dispatch])


    return <div style={{minHeight: '100vh', height: '100%', 'backgroundColor': 'rgba(133,115,155,0.74)'}}>
        <Header/>
        <ErrorSnackbar/>

        <Routes>
            <Route path={'/'} element={<TodoMapping/>}/>
            <Route path={'login'} element={<Login/>}/>
            <Route path={'404'} element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
            <Route path={'*'} element={<Navigate to={'404'}/>}/>
        </Routes>

    </div>
}
