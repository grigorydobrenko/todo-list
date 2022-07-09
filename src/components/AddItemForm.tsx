import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

type AddItemFormPropsType = {
    callBack: (newTitle: string) => void
}


export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const addTask = () => {
        let trimmed = title.trim()
        if (trimmed) {
            props.callBack(trimmed)
            setTitle('')
            setError(null)
        } else {
            setError('Title is required')
        }
    }

    const newTaskClickHandler = () => {
        addTask()
    }


    return (
        <div>
            <TextField
                error={!!error}
                helperText={error}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyDownHandler}
                size={'small'}
                className={error ? "error" : ""}
            />
            <Button style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
                    onClick={newTaskClickHandler} variant="contained">+</Button>

        </div>
    );
};

