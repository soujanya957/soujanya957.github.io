// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = ({ hidden }: { hidden: boolean }) => {
  if (hidden) return null; // If hidden, don't render anything

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-black z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl text-blue-600 font-mono">
            Souju
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="border-2 border-black font-mono px-4 py-2 hover:bg-gray-200 transition-all"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="border-2 border-black font-mono px-4 py-2 hover:bg-gray-200 transition-all"
            >
              About
            </Link>
            <Link 
              to="/projects" 
              className="border-2 border-black font-mono px-4 py-2 hover:bg-gray-200 transition-all"
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
