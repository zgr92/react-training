'use strict';

import React, { useState } from "react";
import ReactDOM from "react-dom";

function AddTaskInput(props) {
  const [name, setName] = useState('');

  const handleChange = (event) => setName(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onTasksAdd(name);
    setName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={handleChange}></input>
      <input type="submit" value="Submit" />
    </form>
  )
}

function Task(props) {
  const [done, setDone] = useState(props.done);
  
  const handleChange = (event) => {
    setDone(event.target.checked);
    props.onFinished(props.id);
  }
  
  return (
    <div>
      <input type="checkbox" checked={done} onChange={handleChange} />
      <label>{props.name}</label>
    </div>
  );
}

let taskIdGenerator = 1;

function TasksList(props) {
  const getNextId = () => taskIdGenerator++;
  const [tasks, setTasks] = useState(
    [ 
      {
        id: getNextId(),
        name: 'Task 1',
        done: true
      },
      {
        id: getNextId(),
        name:'Task 2',
        done: false,
      },
      {
        id: getNextId(),
        name: 'Task 3',
        done: true,
      }
    ]
  );


  const onTasksAdd = (name) => {
    const newTask = {
      id: getNextId(),
      done: false,
      name,
    };
    setTasks(tasks => [...tasks, newTask]);
  }

  const onFinished = (id) => setTasks(tasks.map((task) => task.id === id ? { ...task, done: true } : task));

  return (
    <div>
        <h1>Lista zadań do zrobienia:</h1>
        <AddTaskInput onTasksAdd={onTasksAdd} />
        {tasks.filter(task => !task.done).map(task => <Task name={task.name} done={task.done} id={task.id} onFinished={onFinished} key={task.id} />)}
        <h2>Skończone zadania:</h2>
        <ul>
          {tasks.filter(task => task.done).map(task => <li key={task.id}>{task.name}</li>)}
        </ul>
    </div>
    );
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<TasksList />, domContainer);