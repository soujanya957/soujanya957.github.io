import React from 'react';
import ProjectCard from './ProjectCard';
import { projects } from './projects_mod';

const Projects: React.FC = () => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto py-12">
        <h2 className="text-4xl font-bold font-mono border-b-4 border-black pb-4 mb-12">
          My Projects
        </h2>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
