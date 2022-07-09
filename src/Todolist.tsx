import React, {ChangeEvent} from 'react';
import {FilterType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';


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
    editTask: (todolistId: string, taskId: string, newTitle: string) => void
    editTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {


    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const onAllClickHandler = () => {
        props.changeFilter(props.todolistId, 'all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.todolistId, 'active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todolistId, 'completed')
    }

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todolistId, newTitle)
    }

    const editTaskHandler = (taskID: string, newTitle: string) => {
        props.editTask(props.todolistId, taskID, newTitle)
    }

    const editTitleHandler = (newTitle: string) => {
        props.editTitle(props.todolistId, newTitle)
    }

    return (<div>
            <h3>
                <EditableSpan title={props.title} onChange={editTitleHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <Delete fontSize="inherit"/>
                </IconButton>
            </h3>
            <AddItemForm callBack={addTaskHandler}/>

            {props.tasks.map(task => {
                const onClickHandler = () => props.removeTask(props.todolistId, task.id)
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(props.todolistId, task.id, e.currentTarget.checked)
                }
                const taskIsDone = task.isDone ? 'is-done' : ''
                return (
                    <div key={task.id} className={taskIsDone}>
                        <Checkbox checked={task.isDone} onChange={onChangeHandler}/>

                        <EditableSpan title={task.title} onChange={(newTitle) => {
                            editTaskHandler(task.id, newTitle)
                        }}/>
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <Delete fontSize="inherit"/>
                        </IconButton>
                    </div>
                )
            })}


            <div>
                <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="primary" size={'small'}
                        onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === 'active' ? "outlined" : "contained"} color="error" size={'small'}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === 'completed' ? "outlined" : "contained"} color="success" size={'small'}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}
