import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TaskList from '../components/TaskList';
import { createProject, getProjects } from '../services/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const token = localStorage.getItem('token');

  const fetchProjects = async () => {
    try {
      const { data } = await getProjects(token);
      setProjects(data);
    } catch {
      toast.error('Failed to fetch projects!');
    }
  };

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      await createProject({ name }, token);
      setName('');
      toast.success('Project created!');
      fetchProjects();
    } catch {
      toast.error('Project creation failed!');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className=" min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 sm:p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New Project Name"
          className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        <button
          onClick={handleCreate}
          className="mt-2 sm:mt-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Project
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() => setSelectedProject(project)}
            className={`p-4 border rounded shadow cursor-pointer ${
              selectedProject?._id === project._id
                ? 'bg-blue-100 dark:bg-blue-800 border-blue-500'
                : 'bg-white dark:bg-gray-800'
            }`}
          >
            <h3 className="text-lg font-semibold">{project.name}</h3>
          </div>
        ))}
      </div>
      {selectedProject && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">
            Tasks for Project: {selectedProject.name}
          </h3>
          <TaskList projectId={selectedProject._id} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;