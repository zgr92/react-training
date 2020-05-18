
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function AddTaskInput(props) {
  const [name, setName] = useState('');

  const handleChange = (event) => setName(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onTasksAdd(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={handleChange} />
      <input type="submit" value="Submit" />
    </form>
  );
}
AddTaskInput.propTypes = {
  onTasksAdd: PropTypes.func.isRequired,
};

function Task(props) {
  const { task } = props;
  const [done, setDone] = useState(task.done);
  const [name, setName] = useState(task.name);

  const handleCheckboxChange = (event) => {
    setDone(event.target.checked);
    props.onFinished(task.id);
  };

  const handleButtonClick = () => {
    props.onEdit(task.id, !task.editable, name);
  };

  const handleOnInputChange = (event) => {
    setName(event.target.value);
    props.onEdit(task.id, task.editable, name);
  };

  let textElement;
  let buttonName;
  const checkId = `check-${task.id}`;

  if (task.editable) {
    textElement = <input id={checkId} type="text" value={name} onChange={handleOnInputChange} />;
    buttonName = 'Zapisz';
  } else {
    textElement = <label htmlFor={checkId}>{name}</label>;
    buttonName = 'Edytuj';
  }

  return (
    <div>
      <input type="checkbox" checked={done} onChange={handleCheckboxChange} />
      {textElement}
      <button type="button" onClick={handleButtonClick}>{buttonName}</button>
    </div>
  );
}
Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    done: PropTypes.bool,
    editable: PropTypes.bool,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onFinished: PropTypes.func.isRequired,
};

const taskIdGenerator = 1;

function TasksList() {
  const getNextId = () => taskIdGenerator + 1;
  const [tasks, setTasks] = useState(
    [
      {
        id: getNextId(),
        name: 'Task 1',
        done: true,
        editable: false,
      },
      {
        id: getNextId(),
        name: 'Task 2',
        done: false,
        editable: false,
      },
      {
        id: getNextId(),
        name: 'Task 3',
        done: true,
        editable: false,
      },
    ],
  );


  const onTasksAdd = (name) => {
    const newTask = {
      id: getNextId(),
      done: false,
      name,
    };
    setTasks((oldTasks) => [...oldTasks, newTask]);
  };

  const onFinished = (id) => setTasks(
    tasks.map((task) => (task.id === id ? { ...task, done: true } : task)),
  );

  const onEdit = (id, editable, name) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, editable, name } : task)));
  };

  const TasksListContainer = styled.div`
  margin: 0 30px;
  `;

  return (
    <TasksListContainer>
      <h1>Lista zadań do zrobienia:</h1>
      <AddTaskInput onTasksAdd={onTasksAdd} />
      {tasks.filter((task) => !task.done)
        .map((task) => <Task task={task} onEdit={onEdit} onFinished={onFinished} key={task.id} />)}
      <h2>Skończone zadania:</h2>
      <ul>
        {tasks.filter((task) => task.done).map((task) => <li key={task.id}>{task.name}</li>)}
      </ul>
    </TasksListContainer>
  );
}

const domContainer = document.querySelector('#container');
ReactDOM.render(<TasksList />, domContainer);
