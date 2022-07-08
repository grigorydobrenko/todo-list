import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
    }

    function changeFilter(todolistID: string, value: FilterType) {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function removeTask(todolistID: string, taskId: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(task => task.id !== taskId)})
    }

    function changeTaskStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(task => task.id === taskId ? {...task, isDone: isDone} : task)
        })
    }


    const addTodolist = (newTitle: string) => {
        let newTodoListID = v1()
        let newTodo: TodolistsType = {id: newTodoListID, title: newTitle, filter: 'all'}
        setTodolists([newTodo, ...todolists])
        setTasks({...tasks, [newTodoListID]: []})
    }


    const editTask = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => taskId === t.id ? {...t, title: newTitle} : t)})
    }

    const editTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl))
    }

    return (
        <div className="App">
            <AddItemForm callBack={addTodolist}/>
            {todolists.map(tl => {
                let taskForTodoList = tasks[tl.id]

                if (tl.filter === 'active') {
                    taskForTodoList = taskForTodoList.filter(task => !task.isDone)
                }
                if (tl.filter === 'completed') {
                    taskForTodoList = taskForTodoList.filter(task => task.isDone)
                }
                return (
                    <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        editTask={editTask}
                        editTitle={editTitle}
                    />
                )
            })}


        </div>
    );
}

export default App;
