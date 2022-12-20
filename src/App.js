import React, { useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.js';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

  const updatesTaskData = (updatedTaskData) => {
    const tasks = taskData.map((task) => {
      if (task.id === updatedTaskData.id) {
        return updatedTaskData;
      } else {
        return task;
      }
    });
    setTaskData(tasks);
    const taskId = updatedTaskData.id;
    if (updatedTaskData.isComplete === true) {
      axios
        .patch(
          'https://task-list-api-c17.herokuapp.com/tasks/' +
            taskId +
            '/mark_complete'
        )
        .then(() => {
          console.log('That worked!'), setTaskData(taskData);
        })
        .catch((error) => {
          console.log('Error Status Code:', error.response.status),
            console.log('Error Message:', error.response.data);
        });
    }
    if (updatedTaskData.isComplete === false) {
      axios
        .patch(
          'https://task-list-api-c17.herokuapp.com/tasks/' +
            taskId +
            '/mark_incomplete'
        )
        .then(() => {
          console.log('That worked!'), setTaskData(taskData);
        })
        .catch((error) => {
          console.log('Error Status Code:', error.response.status),
            console.log('Error Message:', error.response.data);
        });
    }
  };

  const deletesTask = (updatedTaskData) => {
    const tasks = taskData.filter((task) => task.id !== updatedTaskData.id);
    setTaskData(tasks);
    const taskId = updatedTaskData.id;
    axios
      .delete('https://task-list-api-c17.herokuapp.com/tasks/' + taskId)
      .then(() => {
        console.log('The task has been deleted.');
      })
      .catch(() => {
        console.log('The task cannot be deleted.');
      });
  };
  const createTask = (newTask) => {
    const newTaskList = [...taskData];
    const nextId = Math.max(...newTaskList.map((task) => task.id)) + 1;
    const newlyCreatedTask = {
      id: nextId,
      title: newTask.title,
      description: newTask.description,
      isComplete: false,
    };
    newTaskList.push(newlyCreatedTask);
    axios
      .post('https://task-list-api-c17.herokuapp.com/tasks', newlyCreatedTask)
      .then(() => {
        console.log('That worked!'), setTaskData(taskData);
      })
      .catch((error) => {
        console.log('Error Status Code:', error.response.status),
          console.log('Error Message:', error.response.data);
      });
    setTaskData(newTaskList);
  };

  useEffect(() => {
    axios
      .get('https://task-list-api-c17.herokuapp.com/tasks')
      .then((response) => {
        setTaskData(response.data);
      })
      .catch(() => {
        console.log('This request could not go through');
      });
  }, [taskData]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={taskData}
            onIsComplete={updatesTaskData}
            onDelete={deletesTask}
          />
          <NewTaskForm createTaskCallback={createTask} />
        </div>
      </main>
    </div>
  );
};

export default App;
