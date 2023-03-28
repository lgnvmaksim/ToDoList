import React from 'react';
import Button from "@mui/material/Button";
import {FilteredType} from "../api";

type SuperButtonType = {
    onClick: (todoId: string, filter: FilteredType) => void
    todoId: string
    name: string
    title: string
    color:  "inherit" | "warning" | "primary" | "secondary" | "success" | "error" | "info" | undefined

}

export const SuperFilteredButton = ({todoId, onClick, name, title, color}: SuperButtonType) => {
    const buttonFilteredStyle = {
        padding: '5px',
        margin: '5px',
        fontSize: '0.805rem',
        minWidth: '50px',
        color: '#000000'
    }

    return <Button variant="contained" color={color}
                   style={buttonFilteredStyle} title={title}
                   onClick={() => onClick(todoId, 'all')}>{name}</Button>
};