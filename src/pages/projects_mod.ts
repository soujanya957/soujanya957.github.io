// projects.ts
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

export const projects: Project[] = [
  {
    title: "WeepKeep",
    description: "An iOS app designed to log and track personal crying moments with detailed analytics and tracking features.",
    fullDescription: "WeepKeep is an innovative iOS app that enables users to log and track their crying moments. Users can record comprehensive details about each cry, including intensity levels, location data, underlying reasons, and personal notes. The app incorporates rating functionality and favorite marking features, leveraging SwiftData for efficient data management and providing users with a meaningful way to monitor their emotional health.",
    technologies: ["Swift", "SwiftUI", "SwiftData"],
    features: [
      "Detailed cry logging system with multiple data points",
      "Customizable rating system for emotional tracking",
      "Favorite marking capability for significant entries",
      "SwiftData integration for efficient data management",
      "Intuitive user interface for easy emotional logging"
    ]
  },
  {
    title: "Ascend",
    description: "A third-person adventure game retelling Nepali myths and histories through an immersive gaming experience.",
    fullDescription: "Ascend is an ambitious gaming project developed under Danphe Studios, a startup I founded. This third-person adventure game masterfully weaves Nepali mythology and historical narratives into an engaging gaming experience. As the project lead, I orchestrated the entire development process from initial concept to final release, ensuring the game effectively bridges cultural storytelling with modern gaming mechanics.",
    technologies: ["Unity", "C#", "3D Modeling", "Game Design"],
    features: [
      "Immersive storytelling based on Nepali mythology",
      "Third-person adventure gameplay mechanics",
      "Custom 3D models and environments",
      "Cultural elements integration",
      "Comprehensive game progression system"
    ]
  },
  {
    title: "Terrarium Simulator",
    description: "An interactive web-based 3D terrarium featuring realistic rendering and user interaction.",
    fullDescription: "The Terrarium Simulator is a web-based project that creates an engaging virtual terrarium experience. The centerpiece features a detailed giraffe model placed inside a glass bowl atop a table. Built with Three.js and styled with Tailwind CSS, the project offers users complete control over viewing angles and interaction, demonstrating advanced 3D rendering capabilities in a web environment.",
    technologies: ["Three.js", "Tailwind CSS", "JavaScript"],
    features: [
      "Interactive 3D environment with realistic rendering",
      "Responsive design adapting to different screen sizes",
      "Advanced camera controls for viewing angles",
      "Real-time lighting and shadow effects",
      "Smooth animation transitions"
    ],
    imageUrl: "https://private-user-images.githubusercontent.com/105396093/394985303-7ba76996-2666-460a-bb28-1cbc833ddf60.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzcwOTQ1MDIsIm5iZiI6MTczNzA5NDIwMiwicGF0aCI6Ii8xMDUzOTYwOTMvMzk0OTg1MzAzLTdiYTc2OTk2LTI2NjYtNDYwYS1iYjI4LTFjYmM4MzNkZGY2MC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMTE3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDExN1QwNjEwMDJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04NDFiMDBmMzZiMjc0YTY0OGVkNjVmMjdkNjMzYmYyYjlmMjIzZGFlOWE1YWVmODViNGUzYjU5MmEzYWU2MDY1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.sSVnp0CULwlyadUJ6S8-n3tWzebvKfWZG8hsfLlMezc"
  },
  {
    title: "Adventurely",
    description: "A gamified task management app that transforms daily tasks into an RPG-style adventure.",
    fullDescription: "Adventurely revolutionizes task management by incorporating retro-gaming elements into productivity tracking. The app allows users to create and manage tasks through a virtual character that gains experience and levels up upon task completion. This unique approach makes goal achievement more engaging while maintaining practical productivity features.",
    technologies: ["React Native", "Expo", "Firebase"],
    features: [
      "Character progression system tied to task completion",
      "RPG-style rewards and achievements",
      "Real-time task tracking and management",
      "Cross-platform compatibility",
      "User progression analytics"
    ]
  },
  {
    title: "iOS World Clock",
    description: "A specialized clock app designed for international students to manage multiple time zones efficiently.",
    fullDescription: "The World Clock app addresses the specific needs of international students by providing an intuitive way to track time across multiple zones. Built with Swift and SwiftUI, the app features a clean interface that allows users to easily manage and view different time zones for coordinating study groups, calls, and meetings across international boundaries.",
    technologies: ["Swift", "SwiftUI", "CoreData"],
    features: [
      "Multi-timezone tracking and management",
      "Intuitive time difference visualization",
      "Custom alerts for specific time zones",
      "Easy-to-use interface optimized for quick reference",
      "Persistent data storage with CoreData"
    ]
  },
  {
    title: "Q02",
    description: "A custom wireless split keyboard designed for ergonomic typing with programmable features.",
    fullDescription: "Q02 is a meticulously crafted wireless split keyboard that combines ergonomic design with cutting-edge technology. The project involved complete circuit design using KiCAD and implementation of wireless functionality. The keyboard features mechanical switches and programmable capabilities, providing users with a highly customizable and efficient typing experience.",
    technologies: ["KiCAD", "Arduino", "Bluetooth", "Circuit Design"],
    features: [
      "Custom PCB design and implementation",
      "Wireless connectivity via Bluetooth",
      "Programmable key mappings",
      "Ergonomic split design",
      "Long battery life optimization"
    ], 
    imageUrl: "https://github.com/soujanya957/q02/raw/master/ReadMeFiles/Pic1.png"
  },
  {
    title: "BrownStop",
    description: "A Google Calendar automation tool that streamlines event management through custom prompts.",
    fullDescription: "BrownStop simplifies calendar management by automating Google Calendar through an intuitive prompt system. The project leverages the Google Calendar API to enable users to schedule, modify, and confirm events efficiently. It integrates seamlessly with other Google services, making it an invaluable tool for students, professors, and professionals managing busy schedules.",
    technologies: ["Python", "Google Calendar API", "Automation", "Flask"],
    features: [
      "Automated event scheduling and management",
      "Custom prompt system for calendar operations",
      "Integration with Google services",
      "Efficient workflow automation",
      "User-friendly command interface"
    ]
  }
];
