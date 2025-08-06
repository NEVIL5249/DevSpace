import React, { useState } from 'react';

function Navbar({ user, onLogout, onNavigate }) {
  const [activeLink, setActiveLink] = useState('');

  const handleNavigation = (route) => {
    setActiveLink(route);
    onNavigate(route);
  };

  return (
    <nav style={{
      backgroundColor: '#111827',
      padding: '0 2rem',
      height: '64px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 1px 0 rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      backgroundColor: 'rgba(17, 24, 39, 0.8)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        height: '100%',
        flex: '1'
      }}>
        <h1 style={{ 
          background: 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 50%, #0EA5E9 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0, 
          fontSize: '1.8rem', 
          cursor: 'pointer',
          fontWeight: '700',
          letterSpacing: '-0.025em',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          height: '100%'
        }} onClick={() => handleNavigation('landing')}>
          <LogoIcon />
          DevSpace
        </h1>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '12px',
        height: '100%',
        alignItems: 'center',
        flex: '1',
        justifyContent: 'center'
      }}>
        <NavLink 
          active={activeLink === 'editor'} 
          onClick={() => handleNavigation('editor')}
        >
          <EditorIcon />
          Code Editor
        </NavLink>
        {user && (
          <NavLink 
            active={activeLink === 'library'}
            onClick={() => handleNavigation('library')}
          >
            <LibraryIcon />
            My Projects
          </NavLink>
        )}
      </div>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '24px',
        height: '100%',
        flex: '1',
        justifyContent: 'flex-end'
      }}>
        {user ? (
          <>
            <span style={{ 
              color: '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9375rem',
              padding: '8px 16px',
              borderRadius: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0)',
              height: '40px'
            }}>
              <UserIcon />
              {user.username}
            </span>
            <button
              onClick={onLogout}
              style={{
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                color: '#FFFFFF',
                border: '1px solid rgba(220, 38, 38, 0.2)',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.9375rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '40px',
                ':hover': {
                  backgroundColor: 'rgba(220, 38, 38, 0.2)',
                  borderColor: 'rgba(220, 38, 38, 0.3)'
                }
              }}
            >
              <LogoutIcon />
              Logout
            </button>
          </>
        ) : (
          <div style={{ 
            display: 'flex', 
            gap: '12px',
            height: '100%',
            alignItems: 'center'
          }}>
            <button
              onClick={() => handleNavigation('login')}
              style={{
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.9375rem',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                ':hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.3)'
                }
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => handleNavigation('register')}
              style={{
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.9375rem',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(37, 99, 235, 0.1)',
                ':hover': {
                  backgroundColor: '#1D4ED8',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)'
                }
              }}
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ children, onClick, active }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        border: 'none',
        color: active ? '#FFFFFF' : '#94A3B8',
        cursor: 'pointer',
        padding: '8px 16px',
        borderRadius: '6px',
        transition: 'all 0.2s ease',
        fontSize: '0.9375rem',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        height: '40px',
        ':hover': {
          color: '#FFFFFF',
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }
      }}
    >
      {children}
    </button>
  );
}

function EditorIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 9h16M4 15h16M12 3v18" />
    </svg>
  );
}

function LibraryIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function LogoIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Main hexagon shape */}
      <path
        d="M12 2L20.5 7V17L12 22L3.5 17V7L12 2Z"
        stroke="url(#logo-gradient)"
        fill="rgba(139, 92, 246, 0.1)"
        filter="url(#glow)"
      />
      
      {/* Code bracket elements */}
      <path
        d="M9 8.5L7 12L9 15.5"
        stroke="url(#logo-gradient)"
        strokeWidth="1.5"
      />
      <path
        d="M15 8.5L17 12L15 15.5"
        stroke="url(#logo-gradient)"
        strokeWidth="1.5"
      />
      
      {/* Center dot with pulse animation */}
      <circle
        cx="12"
        cy="12"
        r="1.5"
        fill="url(#logo-gradient)"
      />
      
      {/* Connection lines */}
      <path
        d="M12 10.5V7M12 17V13.5"
        stroke="url(#logo-gradient)"
        strokeWidth="1.5"
        strokeDasharray="1 2"
      />
    </svg>
  );
}

export default Navbar; 