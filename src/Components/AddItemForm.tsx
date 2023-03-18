import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";


type AddItemFormType = {
    addNewForm: (newTitle: string) => void
    label: string
    variant: undefined | "standard" | "filled" | "outlined"
    buttonTitle: string
    style?: {}
}

enum ErrorStatuses {
    EmptyText = 1,
    LongText = 2
}


export const AddItemForm = ({addNewForm, label, variant, buttonTitle, style}: AddItemFormType) => {

    const [text, setText] = useState('')
    const [error, setError] = useState<null | string | ErrorStatuses>('')
    const addTaskHandler = () => {
        if (text.trim() !== '' && text.length < 26) {
            addNewForm(text.trim())
            setText('')
        } else if (text.trim() === '') {
            setError(ErrorStatuses.EmptyText)
        } else {
            setError(ErrorStatuses.LongText)
        }
    }


    return <div style={{'display': "flex", 'alignItems': 'flex-end'}}>
        <TextField
            error={error === ErrorStatuses.EmptyText || error === ErrorStatuses.LongText}
            // sx={texFieldStyle}
            style={style}
            label={error === ErrorStatuses.EmptyText ? 'Please, enter correct value' :
                error === ErrorStatuses.LongText ? 'Maximum length 25 characters' : label} variant={variant}
            margin={'none'}
            autoComplete={'off'}
            value={text}
            onChange={(e) => {
                setText(e.currentTarget.value)
                setError('')
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    addTaskHandler()
                }
            }}/>
        <IconButton title={buttonTitle} onClick={addTaskHandler}>
            <AddCircleIcon/>
        </IconButton>
    </div>
};


const texFieldStyle={
    '& label.Mui-focused': {
        color: 'green',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'red',
        },
        '&:hover fieldset': {
            borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'green',
        },
}}

