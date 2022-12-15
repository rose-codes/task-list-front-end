import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import './TaskList.css';

const TaskList = (props) => {
  const getTaskListJSX = (props) => {
    return props.tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          onComplete={props.onIsComplete}
          onDeletion={props.onDelete}
        />
      );
    });
  };
  return <ul className="tasks__list no-bullet">{getTaskListJSX(props)}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onIsComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TaskList;
