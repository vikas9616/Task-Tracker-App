import React from 'react';

import { useState } from 'react';
import TaskList from './TaskList';

const ProjectList = ({ projects }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="mt-4">
      <h3 className="text-xl">Projects</h3>
      <ul className="space-y-2">
        {projects.map(p => (
          <li key={p._id} className="border p-2">
            {p.name}
            <button onClick={() => setSelected(p._id)} className="ml-2 text-blue-600">Tasks</button>
          </li>
        ))}
      </ul>
      {selected && <TaskList projectId={selected} />}
    </div>
  );
};

export default ProjectList;