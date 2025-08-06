import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Loading from './components/Loading';
import NavigationPad from './pages/NavigationPad';
import TerminalToggle from './pages/TerminalToggle';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const tempDisabled = false;

  // Overlay open states
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isNavPadOpen, setIsNavPadOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === '/') {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && tempDisabled ? (
        <Loading />
      ) : (
        <>
          <Navbar hidden={location.pathname === '/'} />
          <TerminalToggle
            isOpen={isTerminalOpen}
            setIsOpen={setIsTerminalOpen}
            isNavPadOpen={isNavPadOpen}
          />
          <NavigationPad
            isOpen={isNavPadOpen}
            setIsOpen={setIsNavPadOpen}
            isTerminalOpen={isTerminalOpen}
          />
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

const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
