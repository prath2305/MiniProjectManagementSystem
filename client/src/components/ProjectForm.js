import React, { useState } from "react";
import API from "../api";

function ProjectForm({ onProjectAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const saveProject = () => {
    API.post("/projects", { name, description })
      .then(() => {
        alert("Project added successfully");
        setName("");
        setDescription("");
        onProjectAdded();
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Error adding project");
      });
  };

  return (
    <div className="card">
      <h2>Add Project</h2>

      <input
        type="text"
        placeholder="Enter project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Enter project description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button onClick={saveProject}>Add Project</button>
    </div>
  );
}

export default ProjectForm;