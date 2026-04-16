import React, { useEffect, useState } from "react";
import API from "../api";

function TaskList({ projectId, refresh }) {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const loadTasks = () => {
    let url = `/projects/${projectId}/tasks?sort=${sortOrder}`;

    if (statusFilter !== "") {
      url += `&status=${statusFilter}`;
    }

    API.get(url)
      .then((res) => {
        setTasks(res.data);
      })
      .catch(() => {
        alert("Error loading tasks");
      });
  };

  useEffect(() => {
    loadTasks();
  }, [projectId, refresh, statusFilter, sortOrder]);

  const deleteTask = (id) => {
    API.delete(`/tasks/${id}`)
      .then(() => {
        alert("Task deleted");
        loadTasks();
      })
      .catch(() => {
        alert("Error deleting task");
      });
  };

  const markDone = (task) => {
    API.put(`/tasks/${task._id}`, {
      title: task.title,
      description: task.description,
      status: "done",
      priority: task.priority,
      due_date: task.due_date
    })
      .then(() => {
        alert("Task updated");
        loadTasks();
      })
      .catch(() => {
        alert("Error updating task");
      });
  };

  return (
    <div className="card">
      <h2>Task List</h2>

      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="">All</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Due Date Asc</option>
        <option value="desc">Due Date Desc</option>
      </select>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((t) => (
          <div className="item" key={t._id}>
            <h3>{t.title}</h3>
            <p>{t.description}</p>
            <p>Status: {t.status}</p>
            <p>Priority: {t.priority}</p>
            <p>Due Date: {t.due_date}</p>
            <button onClick={() => markDone(t)}>Mark Done</button>
            <button onClick={() => deleteTask(t._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;