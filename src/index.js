'use strict';

import React, { Component } from "react";
import ReactDOM from "react-dom";

class AddTaskInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onTaksAdd(this.state.name);
    this.setState({ name: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.name} onChange={this.handleChange}></input>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { done: props.done };
    this.name = props.name;
    this.id = props.id;
  }

  handleChange(event) {
    const done = event.target.checked;
    this.setState({ done });
    this.props.onFinished(this.id);
  }

  render() {
    return (
      <div>
        <input type="checkbox" checked={this.state.done} onChange={this.handleChange} />
        <label>{this.name}</label>
      </div>
    );
  }
}

class TasksList extends React.Component {
  constructor(props) {
    super(props);
    this.idGenerator = 1;
    this.state = {
      tasks: [ 
        {
          id: this.getNextId(),
          name: 'Task 1',
          done: true
        },
        {
          id: this.getNextId(),
          name:'Task 2',
          done: false,
        },
        {
          id: this.getNextId(),
          name: 'Task 3',
          done: true,
        }
      ],
    }
    this.onTaksAdd = this.onTaksAdd.bind(this);
    this.onFinished = this.onFinished.bind(this);
  }

  getNextId() {
    return this.idGenerator++;
  }

  onTaksAdd(name) {
    const tasks = this.state.tasks;
    const newTask = {
      id: this.getNextId(),
      done: false,
      name,
    };
    tasks.push(newTask);
    this.setState({tasks});
  }

  onFinished(id) {
    const tasks = this.state.tasks.map((task) => {
      return task.id === id ? { ...task, done: true } : task;
    });

    this.setState({tasks})
  }
  
  render() {
    const tasks = this.state.tasks;

    const isDone = (task) => {
      return task.done;
    }

    const isUndone = (task) => {
      return !task.done;
    }

    const tasksList = tasks.filter(isUndone).map((task) => {
      return (
        <Task name={task.name} done={task.done} id={task.id} onFinished={this.onFinished} key={task.id} />
      );
    });

    const doneTasks = tasks.filter(isDone).map((task) => {
      return (
        <li key={task.id}>{task.name}</li>
      );
    });

    return (
      <div>
          <h1>Lista zadań do zrobienia:</h1>
          <AddTaskInput onTaksAdd={this.onTaksAdd} />
          {tasksList}
          <h2>Skończone zadania:</h2>
          <ul>
            {doneTasks}
          </ul>
      </div>
      );
  }
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<TasksList />, domContainer);