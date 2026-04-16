import React, { useState } from "react";
import "./App.css";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [refreshProjects, setRefreshProjects] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="container">
      <h1>Mini Project Management System</h1>

      <ProjectForm
        onProjectAdded={() => setRefreshProjects(!refreshProjects)}
      />

      <ProjectList
        refresh={refreshProjects}
        onSelectProject={setSelectedProject}
      />

      <p>
        {selectedProject
          ? `Selected Project: ${selectedProject.name}`
          : "No project selected"}
      </p>

      {selectedProject && (
        <>
          <h2>Tasks for: {selectedProject.name}</h2>

          <TaskForm
            projectId={selectedProject._id}
            onTaskAdded={() => setRefreshTasks(!refreshTasks)}
          />

          <TaskList
            projectId={selectedProject._id}
            refresh={refreshTasks}
          />
        </>
      )}
    </div>
  );
}

export default App;