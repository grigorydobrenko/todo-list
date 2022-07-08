import React, {ChangeEvent} from 'react';
import {FilterType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";

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
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <AddItemForm callBack={addTaskHandler}/>
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
                            <EditableSpan title={task.title} onChange={(newTitle) => {
                                editTaskHandler(task.id, newTitle)
                            }}/>
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
