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

    function limitStr(str: string, n: number, symb: any) {
        if (!n && !symb) return str;
        symb = symb || '...';
        return str.substr(0, n - symb.length) + symb;
    }

    const openMode = () => {
        setOpen(!open)
        if (text.trim() !== '') {
            newTitleCallback(text.trim())
        }
        else {
            setText(title)
        }
    }

    return open
        ? <TextField
            onBlur={openMode}
            autoFocus value={text}
            onChange={(e) => {
                e.currentTarget.value.length < 25 &&  setText(e.currentTarget.value)
            }}
            size={'small'}
            style={styleWidth}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    openMode()
                }
            }}/>
        : <span onClick={openMode}>{title}</span>


}
