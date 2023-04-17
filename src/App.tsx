import React, {useEffect} from 'react';
import {ErrorSnackbar} from "./Components/ErrorSnackbar";
import {TodoMapping} from "./Components/Todolist/TodoMapping";
import {Header} from "./Components/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./Components/Login";
import {useAppDispatch, useAppSelector} from "./store";
import {meTC} from "./reducers/auth/authReducer";
import {Preloader} from "./utils/Preloader";
import Container from "@mui/material/Container";
import {selectAuth} from "./reducers/auth/authSelector";


export const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(selectAuth)

    useEffect(() => {
        dispatch(meTC())
    }, [])


    if (!isInitialized) {
        return <div>
            <Preloader/>
        </div>

    }

    return <div style={{minHeight: '100vh', height: '100%', 'backgroundColor': '#303030'}}>
        <Header/>
        <ErrorSnackbar/>
        <Container fixed>
        <Routes>
            <Route path={'/'} element={<TodoMapping/>}/>
            <Route path={'login'} element={<Login/>}/>
            {/*<Route path={'404'} element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>*/}
            {/*<Route path={'*'} element={<Navigate to={'404'}/>}/>*/}
        </Routes>
        </Container>
    </div>
}
