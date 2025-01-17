import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const TerminalToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null); // Message state
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === '0') {
      setIsOpen(true);
      setInput('');
      setHistoryIndex(null);
    }
    if (event.key === 'Escape') {
      setIsOpen(false);
      setMessage(null); // Clear message on close
    }
    if (isOpen) {
      if (event.key === 'Enter') {
        handleCommand(input);
        setInput('');
        setHistoryIndex(null);
      } else if (event.key === 'ArrowUp') {
        if (historyIndex === null) {
          setHistoryIndex(history.length - 1);
        } else if (historyIndex > 0) {
          setHistoryIndex(historyIndex - 1);
        }
        setInput(history[historyIndex ?? 0] || '');
      } else if (event.key === 'ArrowDown') {
        if (historyIndex !== null && historyIndex < history.length - 1) {
          setHistoryIndex(historyIndex + 1);
        } else {
          setHistoryIndex(null);
          setInput('');
        }
      }
    }
  };

  const handleCommand = (command: string) => {
    if (command.trim() === '') return;
    if (command.toLowerCase() === 'clear') {
      setHistory([]);
      setMessage(null); // Clear message when clearing
      return;
    }
    setHistory((prev) => [...prev, command]);
    switch (command.toLowerCase()) {
      case 'home':
        setMessage({ text: "Hit Esc to close.", isError: false }); // Set success message
        navigate('/');
        break;
      case 'projects':
        setMessage({ text: "Hit Esc to close.", isError: false }); // Set success message
        navigate('/projects');
        break;
      case 'about':
        setMessage({ text: "Hit Esc to close.", isError: false }); // Set success message
        navigate('/about');
        break;
    case 'help': 
        setMessage({ text: 'Available commands: home, projects, about, clear.', isError: false });
        break;
      default:
        setMessage({ text: 'Command not recognized. Try "home", "projects", or "about".', isError: true });
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, input, historyIndex]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const styles: { [key: string]: React.CSSProperties } = {
    terminalWindow: {
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
    },
    overlay: {
      position: 'absolute',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      position: 'relative',
      backgroundColor: '#fff',
      color: '#000',
      border: '2px solid #000',
      padding: '1rem',
      borderRadius: '0.375rem',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0 4px 30px',
      width: '80%',
      maxWidth: '600px',
      height: '300px',
      overflowY: 'auto',
      fontFamily: 'monospace',
    },
    closeButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      color: 'red',
      cursor: 'pointer',
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      backgroundColor: '#f0f0f0',
      color: 'black',
      border: '1px solid #000',
      outline: 'none',
      fontFamily: 'monospace',
    },
    prompt: {
      display: 'flex',
      alignItems: 'center',
    },
    commandHistory: {
      whiteSpace: 'pre-wrap',
      marginBottom: '0.5rem',
    },
    message: {
      marginTop: '0.5rem',
    },
    errorMessage: {
      color: 'red', // Error message color
    },
    successMessage: {
      color: 'black', // Success message color
    },
  };

  return (
    <>
      {isOpen && (
        <div style={styles.terminalWindow}>
          <div style={styles.overlay} onClick={() => setIsOpen(false)}></div>

          <div style={styles.content}>
            <span
              style={styles.closeButton}
              onClick={() => setIsOpen(false)}
            >
              ×
            </span>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Terminal</h2>
            <div style={styles.commandHistory}>
              {history.map((cmd, index) => (
                <div key={index}>{cmd}</div>
              ))}
            </div>
            {message && (
              <div style={{ ...styles.message, ...(message.isError ? styles.errorMessage : styles.successMessage) }}>
                {message.text}
              </div>
            )}
            <div style={styles.prompt}>
              <span>$ </span>
              <input
                type="text"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={styles.input}
                placeholder="Type a command..."
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TerminalToggle;
