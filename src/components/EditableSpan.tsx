import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";


type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const activateEditMode = () => {
        setEdit(!edit)
        addTitle()

    }

    const addTitle = () => {
        if (newTitle) {
            props.onChange(newTitle)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        edit ?
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                value={newTitle}
                onChange={onChangeHandler}
                onBlur={activateEditMode}
                size={'small'}
            />
            :
            <span onDoubleClick={activateEditMode}>{props.title}</span>

    );
};

export default EditableSpan;