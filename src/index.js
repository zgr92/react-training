'use strict';

import React, { Component } from "react";
import ReactDOM from "react-dom";

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
  }

  getNextId() {
    return this.idGenerator++;
  }
  
  render() {
    const tasks = this.props.tasks;
    const tasksList = tasks.map((task) => {
      return (
        <Task name={task.name} done={task.done} key={this.getNextId()} />
      );
    });

    return (<div>
      {tasksList}
    </div>);
  }
}

const tasks = [ 
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
];
const domContainer = document.querySelector('#container');
ReactDOM.render(<TasksList tasks={tasks} />, domContainer);