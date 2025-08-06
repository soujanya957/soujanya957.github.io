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
  modelUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isVisible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setIsImageOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100px) rotateY(-15deg);
            opacity: 0;
          }
          to {
            transform: translateX(0) rotateY(0deg);
            opacity: 1;
          }
        }

        @keyframes slideInFromRight {
          from {
            transform: translateX(100px) rotateY(15deg);
            opacity: 0;
          }
          to {
            transform: translateX(0) rotateY(0deg);
            opacity: 1;
          }
        }

        @keyframes techBounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-3px) scale(1.05); }
        }

        @keyframes modalSlideIn {
          from {
            transform: scale(0.8) translateY(20px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
        }

        .tech-tag:hover {
          animation: techBounce 0.4s ease-in-out;
        }

        .modal-content {
          animation: modalSlideIn 0.4s ease-out;
        }

        .glow-card:hover {
          animation: glowPulse 2s ease-in-out infinite;
        }

        .gradient-border {
          background: linear-gradient(45deg, #000, #333, #000);
          background-size: 300% 300%;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .project-number {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
          background-size: 300% 300%;
          animation: gradientShift 4s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div 
        className={`relative w-full max-w-6xl mb-8 cursor-pointer group perspective-1000 ${
          index % 2 === 0 ? 'ml-0' : 'ml-auto'
        }`}
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          animationDelay: `${index * 150}ms`,
          animation: isVisible 
            ? `${index % 2 === 0 ? 'slideInFromLeft' : 'slideInFromRight'} 1s ease-out forwards`
            : 'none',
          opacity: isVisible ? 1 : 0
        }}
      >
        {/* Project Number Badge */}
        <div className="absolute -top-4 -left-4 z-20 w-12 h-12 border-4 border-black bg-white flex items-center justify-center font-mono font-bold text-lg">
          <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
        </div>

        {/* Main Card */}
        <div className={`relative bg-white border-4 border-black transition-all duration-500 overflow-hidden transform glow-card ${
          isHovered 
            ? 'shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] -translate-x-3 -translate-y-3 rotate-1' 
            : 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
        }`}>
          
          {/* Animated Corner Accent */}
          <div className={`absolute top-0 left-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-black border-r-transparent transition-all duration-500 ${
            isHovered ? 'border-t-blue-600' : ''
          }`}></div>

          {/* Background Pattern */}
          <div className={`absolute inset-0 opacity-5 transition-all duration-500 ${
            isHovered ? 'opacity-10' : ''
          }`} style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>

          <div className="relative flex">
            {/* Left Side - Enhanced Image Section */}
            <div className={`relative flex-shrink-0 w-72 h-64 border-r-4 border-black overflow-hidden transition-all duration-500 ${
              isHovered ? 'border-r-blue-600' : ''
            }`}>
              
              {/* Image or Code Icon */}
              {project.imageUrl ? (
                <div className="relative w-full h-full">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isHovered ? 'scale-110 rotate-2' : 'scale-100'
                    }`}
                  />
                  {/* Image Overlay Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black opacity-0 transition-all duration-500 ${
                    isHovered ? 'opacity-30' : ''
                  }`}></div>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center">
                  <div className={`text-6xl font-mono transition-all duration-500 ${
                    isHovered ? 'text-blue-600 scale-125 rotate-12' : 'text-gray-400'
                  }`}>
                    {"</>"}
                  </div>
                </div>
              )}

              {/* Floating Tech Preview */}
              <div className={`absolute bottom-2 left-2 right-2 transform transition-all duration-500 ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-mono">
                  {project.technologies.slice(0, 2).join(' • ')}
                </div>
              </div>
            </div>
            
            {/* Right Side - Content */}
            <div className="flex-1 p-4 relative">
              
              {/* Dynamic Side Accent */}
              <div className={`absolute right-0 top-0 w-1 bg-black transition-all duration-700 origin-top ${
                isHovered ? 'h-full scale-y-100 bg-blue-600' : 'h-0 scale-y-0'
              }`}></div>

              {/* Title with Animation */}
              <h3 className={`text-3xl font-bold mb-4 font-mono transition-all duration-500 relative ${
                isHovered ? 'text-blue-600 transform translate-x-2' : 'text-black'
              }`}>
                {project.title}
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-500 ${
                  isHovered ? 'w-full bg-blue-600' : 'w-0'
                }`}></div>
              </h3>
              
              {/* Description */}
              <p className={`text-gray-700 mb-6 leading-relaxed text-lg transition-all duration-300 ${
                isHovered ? 'text-gray-900 translate-x-1' : ''
              }`}>
                {project.description}
              </p>
              
              {/* Technology Tags with Stagger Effect */}
              <div className="flex flex-wrap gap-3 mb-6">
                {project.technologies.slice(0, 5).map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className={`tech-tag px-4 py-2 text-sm border-2 border-black bg-white font-mono font-bold transition-all duration-300 hover:bg-black hover:text-white hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                      isHovered ? 'border-gray-600 transform scale-105' : ''
                    }`}
                    style={{
                      transitionDelay: `${techIndex * 50}ms`
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 5 && (
                  <span className={`px-4 py-2 text-sm border-2 border-gray-400 bg-gray-100 font-mono text-gray-600 transition-all duration-300 ${
                    isHovered ? 'scale-105' : ''
                  }`}>
                    +{project.technologies.length - 5}
                  </span>
                )}
              </div>

              {/* Action Buttons Preview */}
              <div className={`flex gap-3 transform transition-all duration-500 ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                {project.liveUrl && (
                  <div className="px-4 py-2 border-2 border-blue-600 bg-blue-50 text-blue-600 font-mono text-sm font-bold">
                    🚀 Live Demo
                  </div>
                )}
                {project.githubUrl && (
                  <div className="px-4 py-2 border-2 border-green-600 bg-green-50 text-green-600 font-mono text-sm font-bold">
                    📂 Source Code
                  </div>
                )}
              </div>

              {/* Hover Indicator */}
              <div className={`absolute bottom-4 right-4 text-sm font-mono transition-all duration-500 ${
                isHovered 
                  ? 'text-blue-600 opacity-100 translate-x-0 scale-110' 
                  : 'text-gray-400 opacity-0 translate-x-4'
              }`}>
                Click to explore →
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div className="modal-content relative flex bg-white border-4 border-black p-10 max-w-7xl w-full m-6 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 border-2 border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200 hover:scale-110 font-bold text-xl z-10"
            >
              ×
            </button>

            {/* Left Side - Image */}
            {project.imageUrl ? (
              <div className="flex-shrink-0 w-96 border-r-4 border-black mr-8 p-4 bg-gray-50">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-auto max-h-[65vh] object-contain hover:scale-105 transition-transform duration-300 cursor-pointer border-2 border-gray-300 shadow-lg"
                  onClick={() => setIsImageOpen(true)}
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-96 border-r-4 border-black mr-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
                <pre className="text-6xl font-mono text-gray-400">{"</>"}</pre>
              </div>
            )}

            {/* Right Side - Content */}
            <div className="flex-1 space-y-8">
              
              <div className="space-y-4">
                <h2 className="text-4xl font-bold font-mono border-b-4 border-black pb-3">{project.title}</h2>
                <p className="text-gray-700 text-xl leading-relaxed">{project.fullDescription}</p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold font-mono text-2xl border-l-4 border-black pl-4">Key Features</h4>
                <ul className="space-y-3 pl-6">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start group">
                      <span className="mr-4 text-black font-bold text-lg group-hover:text-blue-600 transition-colors duration-200">▶</span>
                      <span className="text-lg group-hover:text-gray-900 transition-colors duration-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold font-mono text-2xl border-l-4 border-black pl-4">Technologies Used</h4>
                <div className="flex flex-wrap gap-4">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-5 py-3 text-base border-2 border-black bg-white font-mono font-bold hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-default hover:bg-gray-50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-6 pt-6">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 border-4 border-black font-mono font-bold text-lg hover:bg-black hover:text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-blue-50 border-blue-600 text-blue-600 hover:bg-blue-600"
                  >
                    🚀 Launch Project
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 border-4 border-black font-mono font-bold text-lg hover:bg-black hover:text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-green-50 border-green-600 text-green-600 hover:bg-green-600"
                  >
                    📂 View Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Image Modal */}
      {isImageOpen && project.imageUrl && (
        <div className="fixed inset-0 flex items-center justify-center z-60">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-lg"
            onClick={() => setIsImageOpen(false)}
          ></div>
          
          <div className="relative bg-white p-8 max-w-[95vw] max-h-[95vh] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <button 
              onClick={() => setIsImageOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 border-2 border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200 font-bold text-xl z-10"
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
