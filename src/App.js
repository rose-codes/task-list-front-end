import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState } from 'react';

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
  };
  const deletesTask = (updatedTaskData) => {
    const tasks = taskData.filter((task) => task.id !== updatedTaskData.id);
    setTaskData(tasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={taskData}
              onIsComplete={updatesTaskData}
              onDelete={deletesTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
