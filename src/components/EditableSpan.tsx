import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    title: string
    onChange:(newTitle:string)=>void
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
        edit ? <input value={newTitle} autoFocus onBlur={activateEditMode} onChange={onChangeHandler}/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>

    );
};

export default EditableSpan;