import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type SuperTextFieldType ={
    title: string
    newTitle: (text: string)=>void

}

export const SuperTextField = ({title, newTitle}: SuperTextFieldType) => {
    const [text, setText] = useState(title)
    const [open, setOpen] = useState(false)

    const openMode = () => {
        setOpen(!open)
        newTitle(text)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)

    }

    return open
        ? <TextField
            onBlur={openMode}
            autoFocus value={text}
            onChange={onChangeHandler}
            size={'small'}
        style={{width: '140px', }}/>
        : <span onClick={openMode} >{title}</span>



}
