import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (TaskID: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState<string>('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const newTaskClickHandler = () => {
        addTask()
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
            />
            <button onClick={newTaskClickHandler}>+</button>
        </div>
        <ul>
            {props.tasks.map(task => {
                const onClickHandler = () => props.removeTask(task.id)
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={onClickHandler}>✖</button>
                    </li>
                )
            })}

        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
