// src/pages/TerminalToggle.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// --- Types and Fake File System ---
type FileSystem = {
  [key: string]: string[] | string;
};

const FILES: FileSystem = {
  '/': ['projects', 'about.txt', 'contact.txt'],
  '/projects': ['robot_arm.md', 'vision_bot.md'],
  '/about.txt': 'Soujanya is an EECS student interested in robotics and vision.',
  '/contact.txt': 'Email: soujanya@brown.edu\nLinkedIn: linkedin.com/in/soujanya-c-aryal/',
  '/projects/robot_arm.md': 'Robot Arm Project: Built a 2-DOF arm with inverse kinematics.',
  '/projects/vision_bot.md': 'Vision Bot: A robot that follows colored objects using OpenCV.',
};

function isDirectory(val: string[] | string | undefined): val is string[] {
  return Array.isArray(val);
}
function isFile(val: string[] | string | undefined): val is string {
  return typeof val === 'string';
}

const PROCESSES = [
  { pid: 101, cmd: 'robot_arm.js', status: 'Running' },
  { pid: 102, cmd: 'vision.py', status: 'Sleeping' },
  { pid: 103, cmd: 'portfolio_server', status: 'Running' },
  { pid: 104, cmd: 'webcam_feed', status: 'Stopped' },
];

const RANDOM_MESSAGES = [
  "Robots do it with precision.",
  "01101000 01101001 (that's 'hi' in binary!)",
  "Beep boop 🤖",
  "Did you try turning it off and on again?",
  "¯\\_(ツ)_/¯",
  "I, for one, welcome our new robot overlords.",
  "The cake is a lie.",
  "Resistance is futile.",
  "Hello, world!",
  "Robots love coffee too."
];

const WHOAMI_TEXT = `Name: Soujanya
Major: Electrical Engineering & Computer Science
Interests: Robotics, Vision, Making cool stuff!
Fun fact: I love building things that move!`;

const HELP_MANUAL = `
NAME
    help - list all available terminal commands

SYNOPSIS
    [command]

DESCRIPTION
    cd <dir>     change directory (/, /projects, about, contact)
    cd           go to home directory
    cd ..        go to previous directory (returns to last page)
    ls           list all pages
    cat <file>   show file contents
    whoami       get to know me
    random       who knows? ¯\\_(ツ)_/¯
    sound        get a hello
    history      show last 5 commands
    ps           show processes
    top          show processes
    jobs         show jobs
    ssh robot@lab  ssh into robot@lab
    exit         exit ssh session
    clear        clear the terminal
    close        close the terminal window
    help         show this manual
    &&           chain multiple commands (e.g. ls && whoami)
`;

const ALL_COMMANDS = [
  'cd', 'ls', 'cat', 'whoami', 'random', 'sound', 'history', 'ps', 'top', 'jobs', 'ssh', 'exit', 'clear', 'close', 'help'
];

// Logical pages for navigation and ls
const PAGES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'projects', path: '/projects' },
  { name: 'contact', path: '/contact' }
];

// --- TerminalToggle Component ---
const TerminalToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>({
    text: 'Type help to see all commands.',
    isError: false
  });
  const [cwd, setCwd] = useState<string>('/');
  const [ssh, setSsh] = useState(false);
  const [prompt, setPrompt] = useState('visitor@portfolio:~$');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  // Stack to track navigation for cd ..
  const navStack = useRef<string[]>([]);

  // Responsive terminal width/height
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const updateDimensions = () => {
      const vw = window.innerWidth * 0.8;
      const vh = window.innerHeight * 0.8;
      let width = Math.min(900, vw);
      let height = width * 0.625; // 16:10 ratio
      if (height > vh) {
        height = vh;
        width = height * 1.6;
      }
      setDimensions({ width, height });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Only open/close terminal with global key when not focused on an input
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (isOpen) return;
      if (
        (event.target instanceof HTMLInputElement) ||
        (event.target instanceof HTMLTextAreaElement) ||
        (event.target instanceof HTMLSelectElement) ||
        (event.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }
      if (event.key === '0') {
        event.preventDefault();
        event.stopPropagation();
        setIsOpen(true);
        setInput('');
        setHistoryIndex(null);
        setMessage({ text: 'Type help to see all commands.', isError: false });
      // Clear input after a tick to remove any accidental "0"
        setTimeout(() => setInput(''), 0);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen]);

  // Terminal-specific key handling (only when open)
  useEffect(() => {
    if (!isOpen) return;

    const handleTerminalKeyDown = (event: KeyboardEvent) => {
      event.stopPropagation();

      if (event.key === 'Escape') {
        setIsOpen(false);
        setMessage(null);
        return;
      }
      if (event.key === 'Enter') {
        handleChainedCommands(input);
        setInput('');
        setHistoryIndex(null);
        return;
      }
      if (event.key === 'ArrowUp') {
        if (historyIndex === null) {
          setHistoryIndex(history.length - 1);
        } else if (historyIndex > 0) {
          setHistoryIndex(historyIndex - 1);
        }
        setInput(history[historyIndex ?? 0] || '');
        event.preventDefault();
        return;
      }
      if (event.key === 'ArrowDown') {
        if (historyIndex !== null && historyIndex < history.length - 1) {
          setHistoryIndex(historyIndex + 1);
        } else {
          setHistoryIndex(null);
          setInput('');
        }
        event.preventDefault();
        return;
      }
    };

    window.addEventListener('keydown', handleTerminalKeyDown, true);
    return () => window.removeEventListener('keydown', handleTerminalKeyDown, true);
  }, [isOpen, input, historyIndex, history]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Play a robotic "hello" using Web Speech API
  const playRobotHello = () => {
    if ('speechSynthesis' in window) {
      const utter = new window.SpeechSynthesisUtterance('Hello');
      utter.rate = 0.7;
      utter.pitch = 0.3;
      utter.volume = 1;
      utter.voice = window.speechSynthesis.getVoices().find(v => v.name.toLowerCase().includes('robot')) || null;
      window.speechSynthesis.speak(utter);
    } else {
      setMessage({ text: "Sorry, your browser doesn't support speech synthesis.", isError: true });
    }
  };

  // Handle command chaining with &&
  const handleChainedCommands = (cmd: string) => {
    const commands = cmd.split('&&').map(s => s.trim()).filter(Boolean);
    for (let i = 0; i < commands.length; i++) {
      handleCommand(commands[i], i === commands.length - 1);
    }
  };

  // Main command handler
  const handleCommand = (command: string, showMessage = true) => {
    if (command.trim() === '') return;
    if (command.toLowerCase() === 'clear') {
      setHistory([]);
      setMessage(null);
      return;
    }
    if (command.toLowerCase() === 'close') {
      setIsOpen(false);
      setMessage(null);
      return;
    }
    setHistory((prev) => [...prev, command]);
    const lower = command.toLowerCase().trim();

    // SSH fake login
    if (lower === 'ssh robot@lab') {
      setSsh(true);
      setPrompt('robot@lab:~$');
      setMessage({ text: 'Connected to robot@lab. Type exit to disconnect.', isError: false });
      return;
    }
    if (lower === 'exit' && ssh) {
      setSsh(false);
      setPrompt('visitor@portfolio:~$');
      setMessage({ text: 'Disconnected from robot@lab.', isError: false });
      return;
    }

    // --- Custom navigation for about/contact/projects/home ---
    // cd, cd home, cd /
    if (lower === 'cd' || lower === 'cd home' || lower === 'cd /') {
      if (cwd !== '/') navStack.current.push(cwd);
      setCwd('/');
      navigate('/');
      if (showMessage) setMessage({ text: `Moved to home directory.`, isError: false });
      return;
    }
    // cd about
    if (lower === 'cd about') {
      if (cwd !== '/about') navStack.current.push(cwd);
      setCwd('/about');
      navigate('/about');
      if (showMessage) setMessage({ text: `Navigated to about page.`, isError: false });
      return;
    }
    // cd contact
    if (lower === 'cd contact') {
      if (cwd !== '/contact') navStack.current.push(cwd);
      setCwd('/contact');
      navigate('/contact');
      if (showMessage) setMessage({ text: `Navigated to contact page.`, isError: false });
      return;
    }
    // cd projects
    if (lower === 'cd projects') {
      if (cwd !== '/projects') navStack.current.push(cwd);
      setCwd('/projects');
      navigate('/projects');
      if (showMessage) setMessage({ text: `Navigated to projects page.`, isError: false });
      return;
    }
    // cd ..
    if (lower === 'cd ..') {
      if (navStack.current.length === 0) {
        setMessage({ text: `No previous directory.`, isError: true });
      } else {
        const prev = navStack.current.pop()!;
        setCwd(prev);
        // Find the page for this path, default to '/' if not found
        const page = PAGES.find(p => p.path === prev);
        navigate(page ? page.path : '/');
        if (showMessage) setMessage({ text: `Returned to previous page.`, isError: false });
      }
      return;
    }
    // cd <dir> (other, fallback to file system)
    if (lower.startsWith('cd ')) {
      const dir = lower.slice(3).trim();
      let newPath = '';
      if (dir.startsWith('/')) {
        newPath = dir;
      } else if (cwd === '/') {
        newPath = '/' + dir;
      } else {
        newPath = cwd + '/' + dir;
      }
      if (isDirectory(FILES[newPath])) {
        if (cwd !== newPath) navStack.current.push(cwd);
        setCwd(newPath);
        if (showMessage) setMessage({ text: `Moved to ${newPath}`, isError: false });
      } else {
        if (showMessage) setMessage({ text: `No such directory: ${dir}`, isError: true });
      }
      return;
    }

    // --- ls always lists all pages ---
    if (lower === 'ls') {
      setMessage({
        text: PAGES.map(p => p.name).join('\n'),
        isError: false
      });
      return;
    }

    // cat
    if (lower.startsWith('cat ')) {
      let file = lower.slice(4).trim();
      let filePath = '';
      if (file.startsWith('/')) {
        filePath = file;
      } else if (cwd === '/') {
        filePath = '/' + file;
      } else {
        filePath = cwd + '/' + file;
      }
      if (isFile(FILES[filePath])) {
        setMessage({ text: FILES[filePath] as string, isError: false });
      } else {
        setMessage({ text: `No such file: ${file}`, isError: true });
      }
      return;
    }

    // ps, top, jobs
    if (['ps', 'top', 'jobs'].includes(lower)) {
      const lines = [
        'PID   CMD             STATUS',
        ...PROCESSES.map(p => `${p.pid}   ${p.cmd.padEnd(15)} ${p.status}`)
      ];
      setMessage({ text: lines.join('\n'), isError: false });
      return;
    }

    // whoami, random, sound, history, help
    switch (lower) {
      case 'help':
        setMessage({ text: HELP_MANUAL.trim(), isError: false });
        break;
      case 'whoami':
        setMessage({ text: WHOAMI_TEXT, isError: false });
        break;
      case 'random':
        setMessage({ text: RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)], isError: false });
        break;
      case 'sound':
        playRobotHello();
        setMessage({ text: '🤖 (robot says hello)', isError: false });
        break;
      case 'history':
        setMessage({
          text: history.length
            ? history.slice(-5).map(cmd => `> ${cmd}`).join('\n')
            : 'No history yet.',
          isError: false
        });
        break;
      default: {
        // Command not found suggestion
        let suggestion = '';
        let minDist = 3;
        for (const cmd of ALL_COMMANDS) {
          const dist = levenshtein(lower.split(' ')[0], cmd);
          if (dist < minDist) {
            minDist = dist;
            suggestion = cmd;
          }
        }
        setMessage({
          text: suggestion
            ? `Command not found. Did you mean "${suggestion}"?`
            : 'Command not recognized. Type help for help.',
          isError: true
        });
      }
    }
  };

  // Levenshtein distance for suggestions
  function levenshtein(a: string, b: string) {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
      Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        matrix[i][j] =
          a[i - 1] === b[j - 1]
            ? matrix[i - 1][j - 1]
            : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
    return matrix[a.length][b.length];
  }

  // --- Styles ---
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
      width: dimensions.width,
      height: dimensions.height,
      fontFamily: 'monospace',
      transition: 'width 0.2s, height 0.2s',
      minWidth: 320,
      minHeight: 180,
      maxWidth: '98vw',
      maxHeight: '98vh',
      display: 'flex',
      flexDirection: 'column',
    },
    closeButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      color: 'red',
      cursor: 'pointer',
    },
    outputArea: {
      flex: 1,
      overflowY: 'auto',
      minHeight: 0,
      marginBottom: '0.5rem',
    },
    commandHistory: {
      whiteSpace: 'pre-wrap',
      fontFamily: 'monospace',
    },
    message: {
      marginTop: '0.5rem',
      whiteSpace: 'pre-wrap',
      fontFamily: 'monospace',
    },
    errorMessage: {
      color: 'red',
    },
    successMessage: {
      color: 'black',
    },
    prompt: {
      display: 'flex',
      alignItems: 'center',
      borderTop: '1px solid #eee',
      paddingTop: '0.5rem',
      marginTop: 'auto',
      background: '#fff',
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
    oldCommand: {
      color: '#888',
      fontFamily: 'monospace',
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
            <div style={styles.outputArea}>
              <div style={styles.commandHistory}>
                {history.map((cmd, index) => (
                  <div key={index} style={styles.oldCommand}>&gt; {cmd}</div>
                ))}
              </div>
              {message && (
                <div style={{ ...styles.message, ...(message.isError ? styles.errorMessage : styles.successMessage) }}>
                  {message.text}
                </div>
              )}
            </div>
            <div style={styles.prompt}>
              <span>{prompt} </span>
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
