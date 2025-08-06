import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from './projects_mod';

const Projects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState<string>('All');

  // Define main categories
  const categories = ['All', 'Fullstack', 'Swift/iOS', 'Games', 'Hardware/Engineering', 'Robotics'];

  // Function to categorize projects based on their technologies
  const categorizeProject = (project: any): string => {
    const techs = project.technologies.map((t: string) => t.toLowerCase());
    
    // Check for Swift/iOS
    if (techs.some((t: string) => ['swift', 'ios', 'xcode', 'swiftui', 'objective-c'].includes(t))) {
      return 'Swift/iOS';
    }
    
    // Check for Games
    if (techs.some((t: string) => ['unity', 'unreal', 'godot', 'c#', 'game', 'gaming'].includes(t))) {
      return 'Games';
    }
    
    // Check for Hardware/Engineering
    if (techs.some((t: string) => ['arduino', 'raspberry pi', 'embedded', 'verilog', 'vhdl', 'fpga', 'pcb', 'circuit', 'hardware', 'solidworks', 'cad'].includes(t))) {
      return 'Hardware/Engineering';
    }
    
    // Check for Robotics
    if (techs.some((t: string) => ['ros', 'robot', 'robotics', 'opencv', 'lidar', 'slam', 'control', 'autonomous'].includes(t))) {
      return 'Robotics';
    }
    
    // Default to Fullstack for web technologies and others
    return 'Fullstack';
  };

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => categorizeProject(project) === filter);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes titleSlideIn {
          from {
            transform: translateY(-30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes filterFadeIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      <section className="py-12 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto py-12">
          {/* Enhanced Title */}
          <div 
            className={`mb-12 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
              animation: isVisible ? 'titleSlideIn 0.8s ease-out forwards' : 'none'
            }}
          >
            <h2 className="text-5xl font-bold font-mono border-b-4 border-black pb-4 mb-8 relative">
              My Projects
              <div 
                className="absolute -bottom-1 left-0 h-2 bg-black transform origin-left transition-all duration-1000 delay-500"
                style={{width: isVisible ? '100%' : '0%'}}
              />
            </h2>
            <p className="text-lg text-gray-600 font-mono">
              Exploring the intersection of robotics, AI, and interactive technologies
            </p>
          </div>

          {/* Enhanced Filter Buttons */}
          <div 
            className={`mb-12 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
              animation: isVisible ? 'filterFadeIn 0.8s ease-out 0.3s forwards' : 'none'
            }}
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 border-2 border-black font-mono transition-all duration-200 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                    filter === category 
                      ? 'bg-black text-white' 
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                  style={{
                    animationDelay: `${400 + index * 100}ms`
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Project Cards */}
          <div className="space-y-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={index} 
                project={project} 
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Project Counter */}
          <div 
            className={`mt-12 text-center transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-lg font-mono text-gray-600">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
