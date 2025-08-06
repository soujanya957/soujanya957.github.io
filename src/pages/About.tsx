import React, { useState, useEffect } from 'react';

interface Education {
  school: string;
  degree: string;
  period: string;
  labs?: { name: string; url?: string }[];
  clubs?: { name: string; url?: string }[];
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description?: string;
  project?: string;
  url?: string;
}

interface Skill {
  name: string;
  url?: string;
}

interface Interest {
  name: string;
  url?: string;
}

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const skills: Skill[] = [
    { name: 'Python' },
    { name: 'C++' },
    { name: 'ROS' },
    { name: 'PyTorch' },
    { name: 'TensorFlow' },
    { name: 'OpenCV' },
    { name: 'CUDA' },
    { name: 'Reinforcement Learning' },
    { name: 'Computer Vision' },
    { name: 'Deep Learning' },
    { name: 'React' },
    { name: 'TypeScript' },
    { name: 'Node.js' },
    { name: 'Docker' },
    { name: 'Git' }
  ];

  const education: Education[] = [
    {
      school: "Brown University",
      degree: "Sc.B in Electrical Engineering and Computer Science",
      period: "2023 - 2027",
      labs: [
        { name: "Human to Robots (h2r) Lab", url: "https://h2r.cs.brown.edu" },
        { name: "Earth Lab", url: "https://www.brown.edu/academics/earth-environmental-planetary-sciences/" }
      ],
      clubs: [
        { name: "Brown Animation Club" },
        { name: "Brown Robotics" },
        { name: "Pool Sharks" },
        { name: "Entrepreneurship Program (EP)", url: "https://www.brown.edu/academics/entrepreneurship/" },
        { name: "Brown Grappling and Mixed Martial Arts" }
      ]
    }
  ];

  const experience: Experience[] = [
    {
      company: "Brown University h2r Lab",
      role: "Student Researcher",
      project: "GHOST",
      period: "Spring 2025 - Present",
      description: "Boston Dynamics Spot robot teleoperation with Virtual Reality interface development.",
      url: "https://h2r.cs.brown.edu"
    },
    {
      company: "Brown University Earth Lab", 
      role: "Student Researcher",
      project: "CPAD",
      period: "Spring 2025",
      description: "Full-stack Arctic map visualization with cross-platform interface, spatial analysis and data structuring.",
      url: "https://www.brown.edu/academics/earth-environmental-planetary-sciences/"
    },
    {
      company: "Brown University CS Department",
      role: "Meta Undergraduate Research Assistant (MURA)",
      period: "Fall 2024 - Present", 
      description: "Hosting department-wide events including symposiums and open house talks, representing the Brown University Department of Computer Science.",
      url: "https://cs.brown.edu"
    }
  ];

  const interests: Interest[] = [
    { name: "Robotics & Vision" },
    { name: "Deep Learning" }, 
    { name: "Reinforcement Learning" },
    { name: "Computer Vision" },
    { name: "Robot Teleoperation" }
  ];

  const handleItemClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const renderClickableItem = (
    item: { name: string; url?: string },
    className: string,
    style?: React.CSSProperties
  ) => {
    const baseClasses = `${className} transition-all duration-200 ${
      item.url 
        ? 'cursor-pointer hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
        : 'cursor-default hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
    }`;

    return (
      <span
        key={item.name}
        className={baseClasses}
        onClick={() => handleItemClick(item.url)}
        style={style}
      >
        {item.name}
      </span>
    );
  };

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
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
      
      <div className="min-h-screen pt-16 bg-white px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto py-12">
          {/* Animated Title */}
          <div 
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-4xl font-bold font-mono border-b-4 border-black pb-4 mb-12 relative">
              About Me
              <div 
                className="absolute -bottom-1 left-0 h-1 bg-black transform origin-left transition-all duration-1000 delay-500" 
                style={{width: isVisible ? '100%' : '0%'}}
              />
            </h2>
          </div>
          
          {/* Top Section - About and Interests */}
          <div 
            className={`flex flex-col lg:flex-row gap-8 mb-12 transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {/* About Text */}
            <div className="lg:w-2/3">
              <div className="border-2 border-black p-6 bg-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 group">
                <p className="text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  I am Souju. I am passionate about <span className="font-bold underline decoration-2 decoration-black">robotics, entrepreneurship, and 2D animation</span>, and I enjoy exploring game design and storytelling through my startup, Danphe Studios.
                </p>
                <p className="text-lg leading-relaxed mt-4 group-hover:text-gray-800 transition-colors duration-300">
                  At Brown, I focus on the intersection of <span className="font-bold">robotics, computer vision, and deep learning</span>, working on cutting-edge projects that bridge the gap between artificial intelligence and real-world applications.
                </p>
              </div>
            </div>
            
            {/* Main Interests */}
            <div className="lg:w-1/3">
              <div className="border-2 border-black p-6 bg-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1">
                <h3 className="text-2xl font-bold font-mono mb-4">Main Interests</h3>
                <div className="space-y-3">
                  {interests.map((interest, index) => 
                    renderClickableItem(
                      interest,
                      "block px-3 py-2 border-2 border-black font-mono text-sm bg-white",
                      {
                        animationDelay: `${index * 100}ms`,
                        animation: isVisible ? 'slideInRight 0.6s ease-out forwards' : 'none',
                        opacity: isVisible ? 1 : 0
                      }
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div 
            className={`mb-12 transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="border-2 border-black p-6 bg-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1">
              <h3 className="text-2xl font-bold font-mono mb-6">Technical Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => 
                  renderClickableItem(
                    skill,
                    "px-4 py-2 border-2 border-black font-mono text-sm bg-white",
                    {
                      animationDelay: `${index * 75}ms`,
                      animation: isVisible ? 'bounceIn 0.8s ease-out forwards' : 'none',
                      opacity: isVisible ? 1 : 0
                    }
                  )
                )}
              </div>
            </div>
          </div>
          
          {/* Bottom Section - Education and Experience */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Education */}
            <div 
              className={`transform transition-all duration-1000 delay-700 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
            >
              <div className="border-2 border-black p-6 bg-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1">
                <h3 className="text-2xl font-bold font-mono mb-6">Education</h3>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div 
                      key={index}
                      className="border-2 border-black p-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 group"
                      style={{
                        animationDelay: `${800 + index * 200}ms`,
                        animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
                        opacity: isVisible ? 1 : 0
                      }}
                    >
                      <h4 className="text-lg font-bold group-hover:text-blue-600 transition-colors duration-200">{edu.school}</h4>
                      <p className="font-mono text-gray-700">{edu.degree}</p>
                      <p className="text-sm font-mono font-bold">{edu.period}</p>
                      
                      {edu.labs && (
                        <div className="mt-3">
                          <p className="text-sm font-bold mb-2">Research Labs:</p>
                          <div className="flex flex-wrap gap-2">
                            {edu.labs.map((lab, labIndex) => 
                              renderClickableItem(
                                lab,
                                "text-xs bg-gray-100 px-2 py-1 border border-gray-300",
                                {
                                  animationDelay: `${1000 + labIndex * 100}ms`,
                                  animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none',
                                  opacity: isVisible ? 1 : 0
                                }
                              )
                            )}
                          </div>
                        </div>
                      )}
                      
                      {edu.clubs && (
                        <div className="mt-3">
                          <p className="text-sm font-bold mb-2">Clubs & Activities:</p>
                          <div className="flex flex-wrap gap-2">
                            {edu.clubs.map((club, clubIndex) => 
                              renderClickableItem(
                                club,
                                "text-xs bg-blue-50 px-2 py-1 border border-blue-200",
                                {
                                  animationDelay: `${1200 + clubIndex * 100}ms`,
                                  animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none',
                                  opacity: isVisible ? 1 : 0
                                }
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Experience */}
            <div 
              className={`transform transition-all duration-1000 delay-900 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}
            >
              <div className="border-2 border-black p-6 bg-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1">
                <h3 className="text-2xl font-bold font-mono mb-6">Experience</h3>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div 
                      key={index}
                      className={`border-2 border-black p-4 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group ${
                        exp.url ? 'cursor-pointer' : ''
                      }`}
                      onClick={() => handleItemClick(exp.url)}
                      style={{
                        animationDelay: `${1000 + index * 200}ms`,
                        animation: isVisible ? 'slideInUp 0.8s ease-out forwards' : 'none',
                        opacity: isVisible ? 1 : 0
                      }}
                    >
                      <h4 className="text-lg font-bold group-hover:text-green-600 transition-colors duration-200">{exp.company}</h4>
                      <p className="font-mono text-gray-700">{exp.role}</p>
                      {exp.project && (
                        <p className="text-sm font-mono font-bold text-blue-600">Project: {exp.project}</p>
                      )}
                      <p className="text-sm font-mono font-bold">{exp.period}</p>
                      {exp.description && (
                        <p className="mt-2 text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                      )}
                      {exp.url && (
                        <p className="text-xs text-gray-500 mt-2 group-hover:text-gray-700">Click to learn more →</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
