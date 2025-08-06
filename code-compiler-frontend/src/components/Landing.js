import React, { useEffect, useState } from 'react';

function Landing({ onNavigate }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    setIsVisible(true);

    const elements = document.querySelectorAll('.animate-on-mount');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200);
    });

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      style={{
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: '#111827',
        color: '#FFFFFF',
        padding: '0 20px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
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
            background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.02) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.5s ease',
          }}
        />
      </div>

      {/* Hero Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 0',
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div 
          className="animate-on-mount glowing-text"
          style={{
            fontSize: '1.125rem',
            color: '#0EA5E9',
            fontWeight: '500',
            marginBottom: '24px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.6s ease-out'
          }}
        >
          Welcome to the Future of Coding
        </div>
        
        <h1 
          className="animate-on-mount gradient-text"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: '1.1',
            marginBottom: '24px',
            fontWeight: '700',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.6s ease-out'
          }}
        >
          Code. Compile.<br />Create Magic.
        </h1>

        <p 
          className="animate-on-mount"
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            color: '#94A3B8',
            maxWidth: '800px',
            margin: '0 auto 48px',
            lineHeight: '1.6',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.6s ease-out'
          }}
        >
          Experience the next generation of online coding with real-time compilation,
          multi-language support, and seamless cloud storage. All in one powerful platform.
        </p>

        <div 
          className="animate-on-mount"
          style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '80px',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.6s ease-out'
          }}
        >
          <button
            onClick={() => onNavigate('editor')}
            className="primary-button"
            style={{
              padding: '16px 32px',
              fontSize: '1.125rem',
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <span className="button-content">Start Coding Now</span>
          </button>
          <button
            onClick={() => onNavigate('register')}
            className="secondary-button"
            style={{
              padding: '16px 32px',
              fontSize: '1.125rem',
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            Create Free Account
          </button>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          width: '100%',
          maxWidth: '1200px',
          margin: '60px auto',
          padding: '0 20px'
        }}>
          {[
            {
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>,
              title: "Instant Code Execution",
              description: "Write and run code in seconds. Experience lightning-fast compilation across all supported languages."
            },
            {
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>,
              title: "Multiple Languages",
              description: "Support for Python, JavaScript, Java, C++, and many more. Write in your preferred language."
            },
            {
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>,
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>,
              title: "Smart Features",
              description: "Intelligent code completion, syntax highlighting, and error detection to boost your productivity."
            }
          ].map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>

        {/* Language Showcase */}
        <div className="animate-on-mount" style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '80px auto',
          backgroundColor: 'rgba(30, 30, 46, 0.6)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '60px 20px'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '48px',
            background: 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 50%, #0EA5E9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Supported Languages
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            justifyContent: 'center',
            maxWidth: '1000px',
            margin: '0 auto',
          }}>
            {[
              { name: 'Python', icon: '🐍' },
              { name: 'JavaScript', icon: '💛' },
              { name: 'Java', icon: '☕' },
              { name: 'C++', icon: '⚡' },
              { name: 'Ruby', icon: '💎' },
              { name: 'Go', icon: '🔵' },
              { name: 'Rust', icon: '⚙️' },
              { name: 'PHP', icon: '🐘' }
            ].map((lang, index) => (
              <div key={index} style={{
                aspectRatio: '1',
                padding: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '140px',
                height: '140px',
                margin: '0 auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
              >
                <span style={{ 
                  fontSize: '2.75rem',
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: '4px'
                }}>{lang.icon}</span>
                <span style={{ 
                  color: '#E2E8F0', 
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  textAlign: 'center',
                }}>{lang.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="animate-on-mount" style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '80px auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          padding: '0 20px',
        }}>
          <StatItem number="1M+" label="Lines of Code Written" />
          <StatItem number="50K+" label="Projects Created" />
          <StatItem number="100K+" label="Happy Developers" />
          <StatItem number="12+" label="Programming Languages" />
        </div>

        {/* Testimonials */}
        <div className="animate-on-mount" style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '80px auto',
          padding: '40px 20px',
        }}>
          <h2 style={{
            fontSize: '2rem',
            textAlign: 'center',
            marginBottom: '40px',
            background: 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 50%, #0EA5E9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            What Developers Say
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {[
              {
                text: "The best online coding platform I've ever used. The real-time compilation and multi-language support is amazing!",
                author: "Sarah Chen",
                role: "Full Stack Developer"
              },
              {
                text: "Clean interface, fast execution, and great features. This is now my go-to platform for quick coding and prototyping.",
                author: "Michael Rodriguez",
                role: "Software Engineer"
              },
              {
                text: "The ability to save and organize code snippets has been a game-changer for my development workflow.",
                author: "Alex Thompson",
                role: "Senior Developer"
              }
            ].map((testimonial, index) => (
              <div key={index} style={{
                padding: '24px',
                backgroundColor: 'rgba(30, 30, 46, 0.6)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <p style={{
                  color: '#E2E8F0',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  marginBottom: '16px',
                }}>"{testimonial.text}"</p>
                <div>
                  <div style={{ color: '#FFFFFF', fontWeight: '500' }}>{testimonial.author}</div>
                  <div style={{ color: '#94A3B8', fontSize: '0.875rem' }}>{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="animate-on-mount" style={{
          width: '100%',
          maxWidth: '800px',
          margin: '80px auto',
          padding: '60px 20px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 50%, #0EA5E9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Ready to Start Coding?
          </h2>
          <p style={{
            color: '#94A3B8',
            fontSize: '1.25rem',
            marginBottom: '32px',
          }}>
            Join thousands of developers who trust our platform for their coding needs.
          </p>
          <button
            onClick={() => onNavigate('register')}
            style={{
              padding: '16px 32px',
              fontSize: '1.125rem',
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(37, 99, 235, 0.1)',
            }}
          >
            Get Started - It's Free
          </button>
        </div>
      </div>

      <style>
        {`
          .gradient-text {
            background: linear-gradient(135deg, #2563EB 0%, #8B5CF6 50%, #0EA5E9 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% 200%;
            animation: gradient 8s ease infinite;
          }

          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .glowing-text {
            animation: glow 2s ease-in-out infinite alternate;
          }

          @keyframes glow {
            from {
              text-shadow: 0 0 5px #0EA5E9, 0 0 10px #0EA5E9, 0 0 15px #0EA5E9;
            }
            to {
              text-shadow: 0 0 10px #0EA5E9, 0 0 20px #0EA5E9, 0 0 30px #0EA5E9;
            }
          }

          .primary-button {
            background: linear-gradient(45deg, #2563EB, #0EA5E9);
            background-size: 200% 200%;
            animation: gradient 4s ease infinite;
          }

          .primary-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
          }

          .primary-button::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #2563EB, #0EA5E9, #2563EB);
            background-size: 400% 400%;
            z-index: -1;
            border-radius: 10px;
            animation: gradient 4s ease infinite;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .primary-button:hover::before {
            opacity: 1;
          }

          .secondary-button:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: #0EA5E9;
            transform: translateY(-2px);
          }

          .button-content {
            position: relative;
            z-index: 1;
          }

          .feature-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .feature-card:hover {
            transform: translateY(-8px) scale(1.02);
          }

          .feature-icon {
            transition: all 0.3s ease;
          }

          .feature-card:hover .feature-icon {
            transform: rotate(10deg) scale(1.1);
            color: #0EA5E9;
          }
        `}
      </style>
    </div>
  );
}

function FeatureCard({ icon, title, description, index }) {
  return (
    <div 
      className="animate-on-mount feature-card"
      style={{
        backgroundColor: '#1E293B',
        borderRadius: '12px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        cursor: 'pointer',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        opacity: 0,
        transform: 'translateY(20px)',
        transitionDelay: `${index * 0.1}s`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="feature-icon" style={{
        width: '48px',
        height: '48px',
        borderRadius: '10px',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2563EB',
        transition: 'all 0.3s ease'
      }}>
        {icon}
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <h3 style={{ 
          fontSize: '1.25rem',
          color: '#FFFFFF',
          fontWeight: '600',
          letterSpacing: '-0.025em',
          margin: 0
        }}>
          {title}
        </h3>

        <p style={{ 
          color: '#94A3B8',
          fontSize: '1rem',
          lineHeight: '1.6',
          margin: 0
        }}>
          {description}
        </p>
      </div>

      {/* Hover effect overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, rgba(37, 99, 235, 0.1), rgba(14, 165, 233, 0.1))',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none'
      }} />
    </div>
  );
}

function getRandomBubbleStyle() {
  return {
    width: Math.random() * 150 + 200 + 'px',
    height: Math.random() * 150 + 200 + 'px',
    left: Math.random() * 60 + 20 + '%',
    top: Math.random() * 60 + 20 + '%',
    transform: `translate(-50%, -50%) rotate(${Math.random() * 180}deg)`
  };
}

function StatItem({ number, label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: '2.5rem',
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: '8px',
        background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        {number}
      </div>
      <div style={{
        color: '#CBD5E1',
        fontSize: '1.125rem',
        fontWeight: '500'
      }}>
        {label}
      </div>
    </div>
  );
}

export default Landing; 