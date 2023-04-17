import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {logoutTC} from "../reducers/auth/authReducer";
import {useAppDispatch, useAppSelector} from "../store";

export const Header = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    return   <AppBar position="static" color={'transparent'} style={{'backgroundColor': 'rgba(187,183,239,0.59)'}}>
        <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1, color: 'white'}}>
                Todolist by Maxim Loginov
            </Typography>
            {isLoggedIn && <Button  variant={'outlined'} style={{color: 'white', borderColor:'white'}} onClick={() => dispatch(logoutTC())}>Logout</Button>}
        </Toolbar>
    </AppBar>
};
