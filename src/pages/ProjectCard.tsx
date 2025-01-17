import React, { useState, useEffect } from 'react';

interface Project {
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  modelUrl?: string; // Include modelUrl in Project interface
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setIsImageOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for 'Escape' key
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      // Clean up event listener
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="flex w-full max-w-4xl mb-8 cursor-pointer bg-white border-2 border-black transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1"
      >
        {/* Left side - Project Image or Default Icon */}
        <div className="flex-shrink-0 w-48 border-r-2 border-black bg-white p-4 flex items-center justify-center" onClick={() => project.imageUrl && setIsImageOpen(true)}>
          {project.imageUrl ? (
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center border-2 border-black">
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

      {/* Modal for Project Details */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div className="relative flex bg-white border-2 border-black p-8 max-w-6xl w-full m-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto">
            {/* Left Side - Image */}
            {project.imageUrl ? (
              <div className="flex-shrink-0 w-80 border-r-2 border-black mr-4 p-2 flex items-center justify-center">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-auto max-h-[60vh] object-contain" // Add padding here for image scaling
                  onClick={() => setIsImageOpen(true)} // Clicking the image opens the image modal
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-80 border-r-2 border-black mr-4 flex items-center justify-center">
                <pre className="text-xs font-mono">{"</>"}</pre>
              </div>
            )}

            {/* Right Side - Project Details */}
            <div className="flex-1 space-y-6">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                ×
              </button>

              <h2 className="text-2xl font-bold font-mono">{project.title}</h2>
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

      {/* Modal for Image */}
      {isImageOpen && project.imageUrl && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsImageOpen(false)}
          ></div>
          
          <div className="relative flex bg-white p-4 max-w-full max-h-full">
            <button 
              onClick={() => setIsImageOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              ×
            </button>

            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
