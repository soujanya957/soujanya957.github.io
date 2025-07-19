import React from 'react';

interface Education {
  school: string;
  degree: string;
  period: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description?: string;
}

const About = () => {
  const skills = [
    'React', 'TypeScript', 'Node.js', 'Python',
  ];

  const education: Education[] = [
    {
      school: "Brown University",
      degree: "Bachelor's in Computer Science",
      period: "2023 - 2027"
    }
    // Add more education entries here
  ];

  const experience: Experience[] = [
    {
      company: "MURA",
      role: "Brown University",
      period: "2023 - Present",
      description: "lorem ipsum blayh blah."
    }
    // Add more experience entries here
  ];

  return (
    <div className="min-h-screen pt-16 bg-white px-4">
      <div className="max-w-6xl mx-auto py-12">
        <h2 className="text-4xl font-bold font-mono border-b-4 border-black pb-4 mb-12">
          About Me
        </h2>
        
        {/* Top Section - About and Skills */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* About Text */}
          <div className="md:w-2/3">
            <div className="border-2 border-black p-6 bg-white">
              <p className="text-lg">
                I am Souju. I am passionate about robotics, entrepreneurship, and 2D animation, and I enjoy exploring game design and storytelling through my startup, Danphe Studios. 
              </p>
            </div>
          </div>
          
          {/* Skills */}
          <div className="md:w-1/3">
            <div className="border-2 border-black p-6 bg-white">
              <h3 className="text-2xl font-bold font-mono mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 border-2 border-black font-mono text-sm hover:-translate-y-1 transition-transform duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Education and Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          <div className="border-2 border-black p-6 bg-white">
            <h3 className="text-2xl font-bold font-mono mb-6">Education</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className="border-2 border-black p-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1"
                >
                  <h4 className="text-lg font-bold">{edu.school}</h4>
                  <p className="font-mono">{edu.degree}</p>
                  <p className="text-sm font-mono">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Experience */}
          <div className="border-2 border-black p-6 bg-white">
            <h3 className="text-2xl font-bold font-mono mb-6">Experience</h3>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div 
                  key={index}
                  className="border-2 border-black p-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1"
                >
                  <h4 className="text-lg font-bold">{exp.company}</h4>
                  <p className="font-mono">{exp.role}</p>
                  <p className="text-sm font-mono">{exp.period}</p>
                  {exp.description && (
                    <p className="mt-2 text-gray-700">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
