"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [time, setTime] = useState(null);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, done: false }]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

    useEffect(() => {
    fetch('/api/test')
      .then((res) => res.json())
      .then((data) => setTime(data.time))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="container">
      <h1>Task App ✅</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {time ? (
        <p>Database time: {time.now}</p>
      ) : (
        <p>Loading database time...</p>
      )}

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.done ? "done" : ""}>
            <span onClick={() => toggleTask(index)}>{task.text}</span>
            <button onClick={() => deleteTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

