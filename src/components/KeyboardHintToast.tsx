// src/components/KeyboardHintToast.tsx
import React, { useEffect, useState } from "react";

const TOAST_MAX_WIDTH = 400;
const TOAST_HEIGHT = 44;

const KeyboardHintToast: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    // Check if running in browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem("keyboardHintDismissed");
    }
    return false;
  });

  // Mount animation - ensures the component is in DOM before animating
  useEffect(() => {
    if (!dismissed) {
      setMounted(true);
      // Small delay to ensure DOM is ready, then show with animation
      const timer = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(timer);
    }
  }, [dismissed]);

  // Global function to reset toast (for development)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.showKeyboardHintToast = () => {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem("keyboardHintDismissed");
        }
        setDismissed(false);
        setVisible(false);
        setMounted(false);
        setTimeout(() => {
          setMounted(true);
          setTimeout(() => setVisible(true), 50);
        }, 100);
      };
      
      return () => {
        // @ts-ignore
        delete window.showKeyboardHintToast;
      };
    }
  }, []);

  const handleDismiss = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setVisible(false);
    
    // Wait for exit animation to complete before unmounting
    setTimeout(() => {
      setDismissed(true);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem("keyboardHintDismissed", "1");
      }
    }, 400);
  };

  // Don't render if dismissed or not mounted
  if (dismissed || !mounted) return null;

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    top: 24,
    right: 24,
    zIndex: 1000,
    maxWidth: TOAST_MAX_WIDTH,
    minHeight: TOAST_HEIGHT,
    background: "#181818",
    color: "#fff",
    fontFamily: "monospace",
    borderRadius: 14,
    boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    fontSize: 16,
    userSelect: "none",
    gap: 10,
    // Animation properties
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.95)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    // Ensure it's above other content
    pointerEvents: visible ? 'auto' : 'none',
  };

  const kbdStyle: React.CSSProperties = {
    background: "#fff",
    color: "#181818",
    borderRadius: "50%",
    padding: "4px 12px",
    fontWeight: "bold",
    fontSize: 14,
    border: "none",
    margin: "0 4px",
    fontFamily: "inherit",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 28,
    height: 28,
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const textContainerStyle: React.CSSProperties = {
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: 4,
    flex: 1,
    minWidth: 0, // Allows flex shrinking
  };

  const closeButtonStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    color: "#aaa",
    fontSize: 20,
    cursor: "pointer",
    padding: 4,
    borderRadius: 4,
    width: 28,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    flexShrink: 0,
  };

  return (
    <div 
      style={containerStyle} 
      role="alert"
      aria-live="polite"
      tabIndex={0}
    >
      <div style={textContainerStyle}>
        <span style={{ fontWeight: 700, marginRight: 4 }}>Pro tip:</span>
        <span style={{ marginRight: 4 }}>Press</span>
        <kbd style={kbdStyle}>0</kbd>
        <span style={{ marginLeft: 4 }}>for terminal</span>
      </div>
      
      <button
        onClick={handleDismiss}
        aria-label="Dismiss keyboard hint"
        style={closeButtonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#333";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "none";
          e.currentTarget.style.color = "#aaa";
        }}
      >
        ×
      </button>
    </div>
  );
};

export default KeyboardHintToast;
