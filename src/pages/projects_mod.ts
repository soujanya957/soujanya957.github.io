// projects.ts or directly in your Projects.tsx
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
  
  export const projects: Project[] = [
    {
      title: "Portfolio Website",
      description: "Personal portfolio built with React, Three.js, and TailwindCSS featuring interactive 3D elements and smooth animations.",
      fullDescription: "A modern portfolio website that showcases my projects and skills. Built with performance and user experience in mind, featuring interactive 3D elements, smooth page transitions, and responsive design.",
      technologies: ["React", "Three.js", "TailwindCSS", "TypeScript"],
      features: [
        "Interactive 3D background animations using Three.js",
        "Responsive design that works seamlessly on all devices",
        "Custom-built project showcase with modal views",
        "Performance optimized with lazy loading and code splitting"
      ],
      liveUrl: "https://yourportfolio.com",
      githubUrl: "https://github.com/yourusername/portfolio",
      imageUrl: "/path/to/portfolio-image.png" // Optional
    },
    {
      title: "E-commerce Dashboard",
      description: "An admin dashboard for managing online store inventory, orders, and customer data.",
      fullDescription: "A comprehensive dashboard application built for e-commerce businesses. Features real-time data visualization, inventory management, and order processing capabilities.",
      technologies: ["React", "Redux", "Node.js", "MongoDB"],
      features: [
        "Real-time sales and inventory tracking",
        "Customer management system with detailed analytics",
        "Automated order processing workflow",
        "Customizable reporting dashboard"
      ],
      liveUrl: "https://dashboard-demo.com",
      githubUrl: "https://github.com/yourusername/dashboard"
    },
    {
      title: "Weather App",
      description: "A sleek weather application providing real-time weather updates with beautiful visualizations.",
      fullDescription: "A modern weather application that provides detailed weather information with a focus on user experience. Features include hourly forecasts, animated weather icons, and location-based updates.",
      technologies: ["React", "OpenWeather API", "TailwindCSS"],
      features: [
        "Real-time weather updates using OpenWeather API",
        "Location-based weather tracking",
        "7-day weather forecast with detailed hourly breakdowns",
        "Animated weather indicators and transitions"
      ],
      githubUrl: "https://github.com/yourusername/weather-app"
    }
  ];