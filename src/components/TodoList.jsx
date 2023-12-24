import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch("http://universities.hipolabs.com/search?country=United+States")
      .then((response) => response.json())
      .then((data) => {
        // Assuming each task represents a university
        const universityTasks = data.map((university, index) => ({
          id: index + 1,
          title: university.name,
          completed: false,
        }));
        setTasks(universityTasks);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), title: newTaskTitle, completed: false },
      ]);
      setNewTaskTitle("");
    }
  };

  const handleEditTask = (taskId, newTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
        }}
      >
        <div>
          <input
            type="text"
            placeholder="Enter new university"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
        </div>
        <button
          className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Add University
        </button>
      </form>
      <h1 class="text-2xl my-8 font-black">University Todo List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span class="italic hover:not-italic text-orange-600">
              {task.title}
            </span>
            <div className="flex space-x-4 flex justify-center">
              <button
                className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() =>
                  handleEditTask(task.id, prompt("Edit task:", task.title))
                }
              >
                Edit
              </button>
              <button
                className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
