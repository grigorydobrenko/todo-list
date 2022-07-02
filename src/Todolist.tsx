import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    key: string
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskID: string) => void
    changeFilter: (todolistID: string, value: FilterType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    filter: FilterType
    removeTodolist: (todolistID: string) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let trimmed = title.trim()
        if (trimmed) {
            props.addTask(props.todolistId, trimmed)
            setTitle('')
            setError(null)
        } else {
            setError('Title is required')
        }
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const newTaskClickHandler = () => {
        addTask()
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const errorClass = error ? 'error' : ''

    const buttonAllClass = props.filter === 'all' ? 'active-filter' : ''
    const buttonActiveClass = props.filter === 'active' ? 'active-filter' : ''
    const buttonCompletedClass = props.filter === 'completed' ? 'active-filter' : ''


    const onAllClickHandler = () => {
        props.changeFilter(props.todolistId, 'all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.todolistId, 'active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todolistId, 'completed')
    }

    return (<div>
            <h3>
                {props.title}
                <button onClick={removeTodolistHandler}>X</button>
            </h3>

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
            <ul>
                {props.tasks.map(task => {
                    const onClickHandler = () => props.removeTask(props.todolistId, task.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, task.id, e.currentTarget.checked)
                    }
                    const taskIsDone = task.isDone ? 'is-done' : ''
                    return (
                        <li key={task.id} className={taskIsDone}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>✖</button>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button className={buttonAllClass} onClick={onAllClickHandler}>All</button>
                <button className={buttonActiveClass} onClick={onActiveClickHandler}>Active</button>
                <button className={buttonCompletedClass} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
