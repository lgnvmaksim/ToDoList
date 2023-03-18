import React, {useEffect} from 'react';
import {getTodolistTC} from "./reducers/todolistReducer";
import {useAppDispatch} from "./store";
import {ErrorSnackbar} from "./Components/ErrorSnackbar";
import {HeadRemote} from "./Components/HeadRemote";
import {TodoMapping} from "./Components/Todolist/TodoMapping";
import {Header} from "./Components/Header";


export const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistTC())
    }, [dispatch])


    return <div style={{minHeight: '100vh', height: '100%', 'backgroundColor': 'rgba(133,115,155,0.74)'}}>
        <Header/>
        <HeadRemote/>
        <TodoMapping/>
        <ErrorSnackbar/>
    </div>
}
