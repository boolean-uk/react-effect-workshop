import PropTypes from "prop-types";
import { useState } from "react";
import { TODOS_ENDPOINT } from "./consts";

function NewTaskForm({ addTaskToTasksList }) {
  const [newTaskText, setNewTaskText] = useState("");

  const handleCreateTask = (e) => {
    e.preventDefault();

    if (newTaskText.length === 0) return;

    const payload = {
      title: newTaskText,
      completed: false,
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    fetch(TODOS_ENDPOINT, fetchOptions)
      .then((response) => response.json())
      .then((newTask) => {
        console.log("received created task newTask:", newTask);
        console.log("setting new state....");
        addTaskToTasksList(newTask);
      });

    setNewTaskText("");
  };

  return (
    <form onSubmit={handleCreateTask}>
      <label htmlFor="create-todo">New Todo</label>
      <input
        type="text"
        id="create-todo"
        name="create-todo"
        placeholder="task..."
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
}

NewTaskForm.propTypes = {
  addTaskToTasksList: PropTypes.func.isRequired,
};

export default NewTaskForm;
