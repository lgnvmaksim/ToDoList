import React, {useState} from 'react';
import TextField from '@mui/material/TextField';

type SuperTextFieldType = {
    title: string
    newTitleCallback: (text: string) => void
    styleWidth?: {}
}

export const SuperTextField = ({title, newTitleCallback, styleWidth}: SuperTextFieldType) => {
    const [text, setText] = useState(title)
    const [open, setOpen] = useState(false)


    const openMode = () => {
        setOpen(!open)
        if (text.trim() !== '') {
            newTitleCallback(text.trim())
        } else {
            setText(title)
        }
    }

    return open
        ? <TextField
            onBlur={openMode}
            autoFocus value={text}
            onChange={(e) => {
                e.currentTarget.value.length < 25 && setText(e.currentTarget.value)
            }}
            size={'small'}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: 'black',
                    },
                },
            }}
            style={styleWidth}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    openMode()
                }
            }}/>
        : <span onClick={openMode}>{title}</span>


}
