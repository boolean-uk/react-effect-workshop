import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Filter({ tasks, setFilteredTasks }) {
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    console.log(
      "Running my effect each time the dependencies are updatred; note: dependency array contains [newTaskText]..."
    );

    console.log("Applying filters:", filterText);
    const filtered = tasks.filter((task) => {
      if (filterText.length > 0)
        return task.title.toLowerCase().includes(filterText.toLowerCase());
      return true;
    });
    setFilteredTasks(filtered);
  }, [tasks, filterText]);

  return (
    <div>
      <input
        type="text"
        placeholder="filter tasks..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <button onClick={() => console.log("clicked filter")}>Filter</button>
    </div>
  );
}

Filter.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFilteredTasks: PropTypes.func.isRequired,
};

export default Filter;
