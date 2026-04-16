import React, { useEffect, useState } from "react";
import API from "../api";

function ProjectList({ refresh, onSelectProject }) {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);

  const loadProjects = () => {
    API.get(`/projects?page=${page}&limit=10`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch(() => {
        alert("Error loading projects");
      });
  };

  useEffect(() => {
    loadProjects();
  }, [refresh, page]);

  const deleteProject = (id) => {
    API.delete(`/projects/${id}`)
      .then(() => {
        alert("Project deleted");
        loadProjects();
      })
      .catch(() => {
        alert("Error deleting project");
      });
  };

  return (
    <div className="card">
      <h2>Project List</h2>

      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        projects.map((p) => (
          <div className="item" key={p._id}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <button onClick={() => onSelectProject(p)}>View Tasks</button>
            <button onClick={() => deleteProject(p._id)}>Delete</button>
          </div>
        ))
      )}

      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <span> Page {page} </span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default ProjectList;