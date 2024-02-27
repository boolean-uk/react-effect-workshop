import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./Filter";
import NewTaskForm from "./NewTaskForm";
import { TODOS_ENDPOINT } from "./consts";

function App() {
  const [tasks, setTasks] = useState([]);

  // note: ideally this would be computed state, ie not stored in useState
  // and simply computed, but for this example we are storing it in state
  // to demonstrate useEffect being called to update state when dependencies change
  const [filteredTasks, setFilteredTasks] = useState([]);

  // ERROR - this will cause an infinite update loop
  // we never call fetch directly on component render and then update state when fetch is called
  // fetch(GET_TODOS_ENDPOINT)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("received data:", data);
  //     console.log("setting new state....");
  //     setTasks(data);
  //   });

  useEffect(() => {
    console.log(
      "Running my effect on each render; note: dependency array is missing..."
    );
  });

  useEffect(() => {
    console.log(
      "Running my effect only the first time the component is rendered; note: dependency array is empty []..."
    );
    fetch(TODOS_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        console.log("received data:", data);
        console.log("setting new state....");
        setTasks(data);
      });
  }, []);

  // useEffect(() => {
  //   console.log(
  //     "Running my effect each time the dependencies are updatred; note: dependency array contains [newTaskText]..."
  //   );

  //   console.log("Applying filters:", filterText);
  //   const filtered = tasks.filter((task) => {
  //     if (filterText.length > 0)
  //       return task.title.toLowerCase().includes(filterText.toLowerCase());
  //     return true;
  //   });
  //   setFilteredTasks(filtered);
  // }, [tasks, filterText]);

  const addTaskToTasksList = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  console.log("App(); tasks=", tasks);

  return (
    <>
      <div>
        <NewTaskForm addTaskToTasksList={addTaskToTasksList} />
        <Filter tasks={tasks} setFilteredTasks={setFilteredTasks} />
      </div>
      <div>
        <h1>Tasks:</h1>
        <ul>
          {filteredTasks.map((task) => {
            return <li key={task.id}>{task.title}</li>;
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
