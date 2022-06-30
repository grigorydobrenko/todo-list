import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterType>('all')


    function removeTask(TaskId: number) {
        const newTasks = tasks.filter(task => task.id !== TaskId)
        setTasks(newTasks)
    }

    function changeFilter(value:FilterType) {
        setFilter(value)
    }

    let taskForTodoList = tasks

    if (filter === 'active') {
        taskForTodoList = tasks.filter(task => task.isDone === false)
    }
    if (filter === 'completed') {
        taskForTodoList = tasks.filter(task => task.isDone === true)
    }





    return (
        <div className="App">
            <Todolist title="What to learn" tasks={taskForTodoList} removeTask={removeTask} changeFilter={changeFilter} />

        </div>
    );
}

export default App;
