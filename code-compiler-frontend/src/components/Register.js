import React, { useState, useEffect } from "react";
import axios from "axios";

// Use the direct backend URL
const API_BASE_URL = "http://localhost:5000/api/auth";

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

function Register({ onRegister, onNavigate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    setIsVisible(true);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await api.post('/register', {
        username,
        password,
      });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        onNavigate('login');
      } else {
        setError("Registration successful but no token received. Please log in.");
        onNavigate('login');
      }
    } catch (err) {
      console.error('Registration error:', err.response || err);
      const msg = err.response?.data?.message || 
                 err.message || 
                 "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      backgroundColor: '#111827',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Mouse Follow Effect */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: mousePosition.y,
            left: mousePosition.x,
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.5s ease',
          }}
        />
      </div>

      <div style={{ 
        width: "100%",
        maxWidth: "440px", 
        margin: "20px",
        padding: "40px",
        backgroundColor: "rgba(30, 41, 59, 0.7)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        zIndex: 1
      }}>
        <form onSubmit={handleRegister} style={{ 
          display: "flex", 
          flexDirection: "column",
          gap: "24px"
        }}>
          <h2 style={{ 
            color: "#fff", 
            textAlign: "center",
            fontSize: "2rem",
            marginBottom: "8px",
            background: "linear-gradient(135deg, #2563EB 0%, #8B5CF6 50%, #0EA5E9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Create Account
          </h2>
          <p style={{
            color: "#94A3B8",
            textAlign: "center",
            marginTop: "-8px",
            fontSize: "0.95rem"
          }}>
            Join our coding community
          </p>

          {error && (
            <div style={{
              padding: "16px",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              color: "#EF4444",
              borderRadius: "12px",
              textAlign: "center",
              fontSize: "0.95rem",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              animation: "shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both"
            }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "#E2E8F0", fontSize: "0.95rem" }}>Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(15, 23, 42, 0.6)",
                color: "#fff",
                fontSize: "0.95rem",
                transition: "all 0.2s ease",
                outline: "none",
                width: "100%",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "#E2E8F0", fontSize: "0.95rem" }}>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(15, 23, 42, 0.6)",
                color: "#fff",
                fontSize: "0.95rem",
                transition: "all 0.2s ease",
                outline: "none",
                width: "100%",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "#E2E8F0", fontSize: "0.95rem" }}>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(15, 23, 42, 0.6)",
                color: "#fff",
                fontSize: "0.95rem",
                transition: "all 0.2s ease",
                outline: "none",
                width: "100%",
                boxSizing: "border-box"
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              padding: "14px",
              background: isLoading 
                ? "rgba(100, 116, 139, 0.5)"
                : "linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontWeight: "500",
              fontSize: "1rem",
              transition: "all 0.3s ease",
              transform: "translateY(0)",
              boxShadow: "0 4px 6px rgba(37, 99, 235, 0.1)",
              marginTop: "8px"
            }}
            onMouseEnter={e => {
              if (!isLoading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 12px rgba(37, 99, 235, 0.2)";
              }
            }}
            onMouseLeave={e => {
              if (!isLoading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 6px rgba(37, 99, 235, 0.1)";
              }
            }}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          <p style={{
            color: "#94A3B8",
            textAlign: "center",
            fontSize: "0.95rem",
            marginTop: "8px"
          }}>
            Already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('login');
              }}
              style={{
                color: "#2563EB",
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 0.2s ease"
              }}
              onMouseEnter={e => e.target.style.color = "#0EA5E9"}
              onMouseLeave={e => e.target.style.color = "#2563EB"}
            >
              Sign in
            </a>
          </p>
        </form>
      </div>

      <style>
        {`
          @keyframes shake {
            10%, 90% { transform: translateX(-1px); }
            20%, 80% { transform: translateX(2px); }
            30%, 50%, 70% { transform: translateX(-4px); }
            40%, 60% { transform: translateX(4px); }
          }

          input:focus {
            border-color: rgba(37, 99, 235, 0.5);
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
          }
        `}
      </style>
    </div>
  );
}

export default Register;
