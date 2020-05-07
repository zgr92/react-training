'use strict';

import React, { Component } from "react";
import ReactDOM from "react-dom";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { done: true };
  }

  handleClick() {
    this.setState({ done: !this.state.done });
  }

  render() {
    let checkedHtml = this.state.done ? 'checked' : '';
    return (
      <div>
        <input type="checkbox" id="task1" name="task1" defaultChecked={checkedHtml} onClick={this.handleClick} />
        <label htmlFor="task1">{this.props.text}</label>
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
        <Task text={task} key={this.getNextId()} />
      );
    });

    return (<div>
      {tasksList}
    </div>);
  }
}

const tasks = ['Task 1', 'Task 2', 'Task 3'];
const domContainer = document.querySelector('#container');
ReactDOM.render(<TasksList tasks={tasks} />, domContainer);