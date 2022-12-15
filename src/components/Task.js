import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  console.log(props);
  const completeTask = () => {
    const updatedTask = {
      id: props.id,
      key: props.id,
      title: props.title,
      isComplete: !props.isComplete};
    props.onComplete(updatedTask);};
  
  const deleteTask = () => {
    const taskToDelete = {
      id: props.id,
      key: props.id,
      title: props.title,
      isComplete: !props.isComplete
    };
    props.onDeletion(taskToDelete);
  };

  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';
  
  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => completeTask()}
      >
        {props.title}
      </button>
      <button 
        className="tasks__item__remove button"
        onClick={() => deleteTask()}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDeletion: PropTypes.func.isRequired
};

export default Task;
