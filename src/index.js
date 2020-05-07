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
  }

  handleChange(event) {
    this.setState({ done: event.target.checked });
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
          name: 'Task 1',
          done: true
        },
        {
          name:'Task 2',
          done: false,
        },
        {
          name: 'Task 3',
          done: true,
        }
      ],
    }
    this.onTaksAdd = this.onTaksAdd.bind(this);
  }

  getNextId() {
    return this.idGenerator++;
  }

  onTaksAdd(name) {
    const tasks = this.state.tasks;
    const newTask = {
      done: false,
      name,
    };
    tasks.push(newTask);
    this.setState({tasks});
  }
  
  render() {
    const tasks = this.state.tasks;
    const tasksList = tasks.map((task) => {
      return (
        <Task name={task.name} done={task.done} key={this.getNextId()} />
      );
    });

    return (<div>
      <AddTaskInput onTaksAdd={this.onTaksAdd} />
      {tasksList}
    </div>);
  }
}
const domContainer = document.querySelector('#container');
ReactDOM.render(<TasksList />, domContainer);