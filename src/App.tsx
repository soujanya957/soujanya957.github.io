// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Loading from './components/Loading';

function App() {
  const location = useLocation(); // Get the current location
  const [loading, setLoading] = useState(false); // Loading state
  const tempDisabled = false; // Temporary disable loading state

  useEffect(() => {
    if (location.pathname === '/') {
      setLoading(true); // Set loading to true when going to the home page

      const timer = setTimeout(() => {
        setLoading(false); // Set loading to false after 3 seconds
      }, 1500);

      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && tempDisabled ? ( // Conditional rendering for loading state
        <Loading />
      ) : (
        <>
          <Navbar hidden={location.pathname === '/'} /> {/* Hide Navbar on main page */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </>
      )}
    </div>
  );
}

// Wrap the App component in Router for routing context
const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
