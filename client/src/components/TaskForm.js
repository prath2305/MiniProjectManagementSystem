import React, { useState } from "react";
import API from "../api";

function TaskForm({ projectId, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const saveTask = () => {
    API.post(`/projects/${projectId}/tasks`, {
      title,
      description,
      status,
      priority,
      due_date: dueDate
    })
      .then(() => {
        alert("Task added successfully");
        setTitle("");
        setDescription("");
        setStatus("todo");
        setPriority("medium");
        setDueDate("");
        onTaskAdded();
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Error adding task");
      });
  };

  return (
    <div className="card">
      <h2>Add Task</h2>

      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button onClick={saveTask}>Add Task</button>
    </div>
  );
}

export default TaskForm;