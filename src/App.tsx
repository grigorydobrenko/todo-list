import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterType>('all')


    function removeTask(TaskId: string) {
        const newTasks = tasks.filter(task => task.id !== TaskId)
        setTasks(newTasks)
    }

    function changeFilter(value: FilterType) {
        setFilter(value)
    }

    function addTask(title: string) {
        const newTask = {id: v1(), title: title, isDone: true}
        setTasks([newTask, ...tasks])

    }

    function changeTaskStatus(TaskId: string, isDone: boolean) {
        const task = tasks.find(t => t.id === TaskId)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }

    }

    let taskForTodoList = tasks

    if (filter === 'active') {
        taskForTodoList = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        taskForTodoList = tasks.filter(task => task.isDone)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={taskForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />

        </div>
    );
}

export default App;
