import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {logoutTC} from "../reducers/authReducer";
import {useAppDispatch, useAppSelector} from "../store";

export const Header = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    return   <AppBar position="static" color={'transparent'} style={{'backgroundColor': '#D0B3A3'}}>
        <Toolbar>
            <IconButton sx={{mr: 2}}>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Todolist by Maxim Loginov
            </Typography>
            {isLoggedIn && <Button color="inherit" onClick={() => dispatch(logoutTC())}>Logout</Button>}
        </Toolbar>
    </AppBar>
};
