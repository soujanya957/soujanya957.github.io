import React, { useState } from 'react';
import { projects } from './projects_mod';

interface Project {
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="flex w-full max-w-3xl mb-8 cursor-pointer bg-white border-2 border-black transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1"
      >
        {/* Left side - Project Image or Default Icon */}
        <div className="flex-shrink-0 w-48 border-r-2 border-black bg-white p-4 flex items-center justify-center">
          {project.imageUrl ? (
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 border-2 border-black p-2 flex items-center justify-center">
              <pre className="text-xs font-mono">{"</>"}</pre>
            </div>
          )}
        </div>
        
        {/* Right side - Project Info */}
        <div className="flex-1 p-6">
          <h3 className="text-xl font-bold mb-2 font-mono">{project.title}</h3>
          <p className="text-gray-700 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-3 py-1 text-sm border-2 border-black bg-white font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div className="relative bg-white border-2 border-black p-8 max-w-2xl w-full m-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              ×
            </button>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-mono">{project.title}</h2>
              
              {project.imageUrl && (
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-48 object-cover border-2 border-black"
                />
              )}
              
              <p className="text-gray-700">{project.fullDescription}</p>
              
              <div className="space-y-3">
                <h4 className="font-bold font-mono">Key Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold font-mono">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-sm border-2 border-black bg-white font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border-2 border-black font-mono hover:bg-black hover:text-white transition-colors"
                  >
                    View Live
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border-2 border-black font-mono hover:bg-black hover:text-white transition-colors"
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

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