import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";


type AddItemFormType ={
    addNewForm: (newTitle: string)=>void
    label: string
    variant: undefined | "standard" | "filled" | "outlined"
    buttonTitle: string
    style?: {}
}

export const AddItemForm = ({addNewForm, label, variant, buttonTitle,style}: AddItemFormType) => {

    const [text, setText] = useState('')

    const addTaskHandler = () => {
        if (text.trim() !== '') {
            addNewForm(text.trim())
            setText('')
        }
    }

    return (
        <div style={{'display': "flex", 'alignItems': 'flex-end'}}>
            <TextField
                style={style}
                label={label} variant={variant} margin={'none'}
                       autoComplete={'off'}
                       value={text}
                       onChange={(e) => setText(e.currentTarget.value)}
                       onKeyDown={(e)=>{if (e.key === 'Enter') {addTaskHandler()} }}/>

            <IconButton title={buttonTitle} onClick={addTaskHandler}>
                <AddCircleIcon/>
            </IconButton>
        </div>
    );
};