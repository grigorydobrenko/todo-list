import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    callBack: (newTitle:string) => void
}


export const AddItemForm = (props:AddItemFormPropsType) => {
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

    const errorClass = error ? 'error' : ''


    const newTaskClickHandler = () => {
        addTask()
    }


    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={errorClass}
            />
            <button onClick={newTaskClickHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

