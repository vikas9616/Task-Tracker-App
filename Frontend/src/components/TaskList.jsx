import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createTask, deleteTask, getTasks, updateTask } from '../services/api';

const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks(projectId, token);
      setTasks(data);
    } catch {
      toast.error('Failed to fetch tasks!');
    }
  };

  const handleCreate = async () => {
    if (!title.trim()) return;
    try {
      await createTask({ title, description, projectId }, token);
      setTitle('');
      setDescription('');
      toast.success('Task created!');
      fetchTasks();
    } catch {
      toast.error('Failed to create task!');
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      await updateTask(id, { status }, token);
      toast.success(`Task marked as ${status}!`);
      fetchTasks();
    } catch {
      toast.error('Failed to update task!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id, token);
      toast.success('Task deleted!');
      fetchTasks();
    } catch {
      toast.error('Failed to delete task!');
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchTasks();
    }
  }, [projectId]);

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 mb-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        <button
          onClick={handleCreate}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Task
        </button>
      </div>
      <ul className="space-y-4">
        {tasks.map((t) => (
          <li key={t._id} className="border p-4 rounded shadow-md bg-white dark:bg-gray-800">
            <div>
              <h5 className="font-bold text-lg text-gray-800 dark:text-gray-100">{t.title}</h5>
              <p className="text-gray-600 dark:text-gray-400">{t.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status: {t.status}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Created At: {new Date(t.createdAt).toLocaleString()}
              </p>
              {t.completedAt && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Completed At: {new Date(t.completedAt).toLocaleString()}
                </p>
              )}
            </div>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => handleUpdate(t._id, 'In Progress')}
                className="text-yellow-600 hover:underline"
              >
                In Progress
              </button>
              <button
                onClick={() => handleUpdate(t._id, 'Completed')}
                className="text-green-600 hover:underline"
              >
                Completed
              </button>
              <button
                onClick={() => handleUpdate(t._id, 'Pending')}
                className="text-blue-600 hover:underline"
              >
                Pending
              </button>
              <button
                onClick={() => handleDelete(t._id)}
                className="text-red-600 hover:underline"
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

export default TaskList;