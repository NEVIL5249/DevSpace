import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

function CodeLibrary({ onSelectCode, onNavigate }) {
  const [snippets, setSnippets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSnippets();
  }, []);

  const loadSnippets = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Please login to view your saved code snippets");
        return;
      }

      const res = await api.get('/snippets', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSnippets(res.data);
    } catch (err) {
      console.error('Error loading snippets:', err);
      setError("Failed to load code snippets");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (snippetId) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/snippets/${snippetId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Refresh the list
      loadSnippets();
    } catch (err) {
      console.error('Error deleting snippet:', err);
      alert('Failed to delete snippet');
    }
  };

  const handleLoadCode = (snippet) => {
    onSelectCode(snippet);
    onNavigate('editor');
  };

  if (isLoading) {
    return (
      <div style={{ 
        height: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: '#94a3b8',
        fontSize: "0.875rem",
        backgroundColor: "#1a1b26",
      }}>
        Loading your code snippets...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        height: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        color: '#ef4444',
        backgroundColor: "#1a1b26",
      }}>
        <div style={{
          padding: "16px 24px",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          borderRadius: "8px",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          fontSize: "0.875rem",
        }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      backgroundColor: "#1a1b26",
      minHeight: "calc(100vh - 64px)",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background gradient effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "200px",
          background: "linear-gradient(180deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(14, 165, 233, 0.1) 100%)",
          opacity: 0.5,
          pointerEvents: "none",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ 
          color: '#fff',
          fontSize: "1.5rem",
          fontWeight: "600",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <span style={{ fontSize: "1.5rem" }}>📚</span> Your Code Library
        </h2>

        {snippets.length === 0 ? (
          <div style={{ 
            textAlign: 'center',
            color: '#94a3b8',
            padding: "48px",
            backgroundColor: "rgba(30, 30, 46, 0.6)",
            borderRadius: "12px",
            fontSize: "0.875rem",
          }}>
            No saved code snippets yet
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {snippets.map(snippet => (
              <div 
                key={snippet._id}
                style={{
                  backgroundColor: "rgba(30, 30, 46, 0.6)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  padding: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    color: '#94a3b8',
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    padding: "4px 8px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "4px",
                  }}>
                    {snippet.language.toUpperCase()}
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => handleLoadCode(snippet)}
                      style={{
                        padding: "6px 16px",
                        background: "rgba(37, 99, 235, 0.1)",
                        color: '#2563eb',
                        border: "1px solid rgba(37, 99, 235, 0.2)",
                        borderRadius: '6px',
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        cursor: 'pointer',
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "all 0.2s ease",
                        minWidth: "100px",
                        justifyContent: "center",
                        height: "32px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(37, 99, 235, 0.15)";
                        e.currentTarget.style.borderColor = "rgba(37, 99, 235, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(37, 99, 235, 0.1)";
                        e.currentTarget.style.borderColor = "rgba(37, 99, 235, 0.2)";
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                      </svg>
                      Load
                    </button>
                    <button
                      onClick={() => handleDelete(snippet._id)}
                      style={{
                        padding: "6px 16px",
                        background: "rgba(239, 68, 68, 0.1)",
                        color: '#ef4444',
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        borderRadius: '6px',
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        cursor: 'pointer',
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "all 0.2s ease",
                        minWidth: "100px",
                        justifyContent: "center",
                        height: "32px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)";
                        e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                        e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.2)";
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
                <pre style={{ 
                  backgroundColor: "rgba(20, 20, 35, 0.4)",
                  padding: '12px',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                  maxHeight: '200px',
                  overflow: 'auto',
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}>
                  {snippet.code}
                </pre>
                <div style={{ 
                  color: '#94a3b8',
                  fontSize: '0.75rem',
                  marginTop: '12px',
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}>
                  <span style={{ fontSize: "0.875rem" }}>🕒</span>
                  Saved on: {new Date(snippet.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeLibrary; 