import React, { useState, useEffect } from 'react';
import CodeEditor from './components/CodeEditor';
import Login from './components/Login';
import Register from './components/Register';
import CodeLibrary from './components/CodeLibrary';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [savedMessage, setSavedMessage] = useState('');
  const [editorContent, setEditorContent] = useState({ code: '', language: 'javascript' });

  // Check for existing user session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSavedMessage('');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('editor');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage('landing');
  };

  const handleSaveCode = async (language, code) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setCurrentPage('login');
        return;
      }

      const response = await api.post('/save-code', 
        { 
          title: `Code Snippet - ${new Date().toLocaleString()}`,
          language, 
          code,
          token
        },
        { 
          headers: { 
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        setSavedMessage('Code saved successfully!');
        setTimeout(() => setSavedMessage(''), 3000);
      } else {
        throw new Error('No response from server');
      }
    } catch (error) {
      console.error('Error saving code:', error);
      const errorMessage = error.response?.data?.message || 'Failed to save code. Please try again.';
      setSavedMessage(errorMessage);
      setTimeout(() => setSavedMessage(''), 3000);
      throw error;
    }
  };

  const handleSelectCode = (snippet) => {
    setEditorContent({
      code: snippet.code,
      language: snippet.language
    });
    handleNavigate('editor');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={handleNavigate} />;
      case 'editor':
        return (
          <CodeEditor 
            onSave={handleSaveCode}
            initialCode={editorContent.code}
            initialLanguage={editorContent.language}
          />
        );
      case 'login':
        return <Login onLoginSuccess={handleLogin} onNavigate={handleNavigate} />;
      case 'register':
        return <Register onRegister={() => setCurrentPage('login')} onNavigate={handleNavigate} />;
      case 'library':
        return <CodeLibrary onSelectCode={handleSelectCode} onNavigate={handleNavigate} />;
      default:
        return <Landing onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#111827',
      color: '#FFFFFF'
    }}>
      <Navbar 
        user={user}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />

      {savedMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '16px 24px',
          backgroundColor: 'rgba(30, 30, 46, 0.8)',
          color: savedMessage.includes('success') ? '#10B981' : '#EF4444',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 1000,
          animation: 'toastSlideUp 0.3s ease-out',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '0.9375rem',
          fontWeight: '500',
          minWidth: '300px',
          maxWidth: '500px',
          letterSpacing: '0.01em',
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: savedMessage.includes('success') 
              ? 'rgba(16, 185, 129, 0.1)' 
              : 'rgba(239, 68, 68, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ 
              fontSize: '1rem',
              color: savedMessage.includes('success') ? '#10B981' : '#EF4444'
            }}>
              {savedMessage.includes('success') ? '✓' : '!'}
            </span>
          </div>
          <span style={{
            flex: 1,
            color: '#E2E8F0',
          }}>
            {savedMessage}
          </span>
        </div>
      )}

      {renderPage()}

      <style>
        {`
          @keyframes toastSlideUp {
            from {
              transform: translate(-50%, 100%);
              opacity: 0;
            }
            to {
              transform: translate(-50%, 0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;
