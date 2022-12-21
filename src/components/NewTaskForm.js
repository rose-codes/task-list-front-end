import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = (props) => {
  const [formFields, setFormFields] = useState({
    title: '',
    description: '',
    isComplete: '',
  });

  const onTitleChange = (event) => {
    setFormFields({
      ...formFields,
      title: event.target.value,
    });
  };

  const onDescChange = (event) => {
    setFormFields({
      ...formFields,
      description: event.target.value,
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    props.createTaskCallback({
      title: formFields.title,
      description: formFields.description,
      isComplete: false,
    });

    setFormFields({
      title: '',
      description: '',
      isComplete: 'false',
    });
  };
  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <label htmlFor="task">Task Title</label>
        <input name="task" value={formFields.title} onChange={onTitleChange} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          name="description"
          value={formFields.description}
          onChange={onDescChange}
        />
      </div>
      <input type="submit" value="Add Task" />
    </form>
  );
};

NewTaskForm.propTypes = {
  createTaskCallback: PropTypes.func.isRequired,
};

export default NewTaskForm;
