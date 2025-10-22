/* =========================
src/components/Navbar.jsx
========================= */
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar(){
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const loc = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const linkStyle = (active) => ({
    color: active ? '#b35b6b' : '#374151',
    textDecoration: 'none',
    margin: '0 20px',
    fontWeight: active ? 700 : 600,
    fontSize: '1.125rem',
    position: 'relative',
    padding: '12px 20px',
    borderRadius: '50px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: active 
      ? 'linear-gradient(135deg, rgba(179, 91, 107, 0.1) 0%, rgba(179, 91, 107, 0.05) 100%)'
      : 'transparent',
    border: active ? '2px solid rgba(179, 91, 107, 0.2)' : '2px solid transparent',
    display: 'inline-block',
    fontFamily: "'Inter', sans-serif"
  });

  const handleLinkHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.color = '#b35b6b';
      e.target.style.background = 'linear-gradient(135deg, rgba(179, 91, 107, 0.1) 0%, rgba(179, 91, 107, 0.05) 100%)';
      e.target.style.border = '2px solid rgba(179, 91, 107, 0.3)';
      e.target.style.transform = 'translateY(-2px) scale(1.05)';
      e.target.style.boxShadow = '0 8px 25px rgba(179, 91, 107, 0.2)';
    } else {
      const isActive = e.target.getAttribute('data-active') === 'true';
      if (!isActive) {
        e.target.style.color = '#374151';
        e.target.style.background = 'transparent';
        e.target.style.border = '2px solid transparent';
        e.target.style.transform = 'translateY(0) scale(1)';
        e.target.style.boxShadow = 'none';
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        height: isScrolled ? '75px' : '85px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        background: isScrolled 
          ? 'rgba(255, 255, 255, 0.95)' 
          : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        boxShadow: isScrolled 
          ? '0 8px 32px rgba(179, 91, 107, 0.15)' 
          : '0 4px 20px rgba(0, 0, 0, 0.08)',
        zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        borderBottom: isScrolled ? '1px solid rgba(179, 91, 107, 0.1)' : 'none'
      }}>
        {/* Floating Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '10%',
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
          transition: 'transform 0.1s ease-out',
          opacity: 0.1,
          pointerEvents: 'none'
        }}>
          <svg width="60" height="60" viewBox="0 0 60 60" style={{ color: '#b35b6b' }}>
            <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M15 30 Q30 15 45 30 Q30 45 15 30" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>

        <div style={{
          position: 'absolute',
          top: '-15px',
          right: '15%',
          transform: `translate(${mousePosition.x * -0.4}px, ${mousePosition.y * -0.4}px)`,
          transition: 'transform 0.1s ease-out',
          opacity: 0.08,
          pointerEvents: 'none'
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40" style={{ color: '#d97706' }}>
            <path d="M20 5 L25 15 L35 12.5 L30 22.5 L40 25 L30 27.5 L35 37.5 L25 35 L20 45 L15 35 L5 37.5 L10 27.5 L0 25 L10 22.5 L5 12.5 L15 15 Z" fill="currentColor"/>
          </svg>
        </div>

        {/* Logo Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
          transform: 'scale(1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}>
          <div style={{
            position: 'relative',
            marginRight: '16px'
          }}>
            <img 
              src="/logo.png" 
              alt="logo" 
              style={{
                width: isScrolled ? '48px' : '52px',
                height: isScrolled ? '48px' : '52px',
                objectFit: 'cover',
                borderRadius: '16px',
                transition: 'all 0.4s ease',
                boxShadow: '0 8px 25px rgba(179, 91, 107, 0.2)',
                border: '2px solid rgba(179, 91, 107, 0.1)'
              }}
            />
            <div style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '16px',
              height: '16px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '50%',
              border: '2px solid white',
              animation: 'pulse 2s ease-in-out infinite'
            }}></div>
          </div>
          
          <div style={{
            fontWeight: 800,
            fontSize: isScrolled ? '1.5rem' : '1.75rem',
            background: 'linear-gradient(135deg, #b35b6b 0%, #8b4553 50%, #d4a574 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            transition: 'font-size 0.4s ease',
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '-0.5px'
          }}>
            Mountview Events
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          '@media (max-width: 768px)': {
            display: 'none'
          }
        }}>
          <Link 
            style={linkStyle(loc.pathname === '/')} 
            to="/"
            data-active={loc.pathname === '/'}
            onMouseEnter={(e) => handleLinkHover(e, true)}
            onMouseLeave={(e) => handleLinkHover(e, false)}
          >
            🏠 Home
          </Link>
          <Link 
            style={linkStyle(loc.pathname === '/about')} 
            to="/about"
            data-active={loc.pathname === '/about'}
            onMouseEnter={(e) => handleLinkHover(e, true)}
            onMouseLeave={(e) => handleLinkHover(e, false)}
          >
            💫 About
          </Link>
          <Link 
            style={linkStyle(loc.pathname === '/services')} 
            to="/services"
            data-active={loc.pathname === '/services'}
            onMouseEnter={(e) => handleLinkHover(e, true)}
            onMouseLeave={(e) => handleLinkHover(e, false)}
          >
            ✨ Services
          </Link>
          <Link 
            style={linkStyle(loc.pathname === '/contact')} 
            to="/contact"
            data-active={loc.pathname === '/contact'}
            onMouseEnter={(e) => handleLinkHover(e, true)}
            onMouseLeave={(e) => handleLinkHover(e, false)}
          >
            💕 Contact
          </Link>

          {/* CTA Button */}
          <Link
            to="/contact"
            style={{
              marginLeft: '32px',
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #b35b6b 0%, #8b4553 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              transform: 'scale(1)',
              fontFamily: "'Inter', sans-serif"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px) scale(1.05)';
              e.target.style.boxShadow = '0 12px 30px rgba(179, 91, 107, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            💍 Book Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          style={{
            display: 'none',
            '@media (max-width: 768px)': {
              display: 'flex'
            },
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '12px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(179, 91, 107, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'none';
          }}
        >
          <div style={{
            width: '28px',
            height: '20px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{
              width: '100%',
              height: '3px',
              background: '#b35b6b',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'
            }}></div>
            <div style={{
              width: '100%',
              height: '3px',
              background: '#b35b6b',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              opacity: isMobileMenuOpen ? 0 : 1
            }}></div>
            <div style={{
              width: '100%',
              height: '3px',
              background: '#b35b6b',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
            }}></div>
          </div>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(179, 91, 107, 0.95) 0%, rgba(139, 69, 83, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isMobileMenuOpen ? 1 : 0,
        visibility: isMobileMenuOpen ? 'visible' : 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isMobileMenuOpen ? 'scale(1)' : 'scale(0.95)'
      }}>
        {/* Mobile Menu Background Decoration */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          opacity: 0.1,
          animation: 'float 6s ease-in-out infinite'
        }}>
          <svg width="150" height="150" viewBox="0 0 150 150" style={{ color: 'white' }}>
            <path d="M75 25 C60 10, 30 10, 30 40 C30 55, 75 85, 75 85 C75 85, 120 55, 120 40 C120 10, 90 10, 75 25 Z" fill="currentColor"/>
          </svg>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          opacity: 0.08,
          animation: 'float 8s ease-in-out infinite',
          animationDelay: '-3s'
        }}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ color: 'white' }}>
            <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="3"/>
            <path d="M30 60 Q60 30 90 60 Q60 90 30 60" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>

        <nav style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px'
        }}>
          <Link 
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '2rem',
              fontWeight: '600',
              padding: '16px 32px',
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              background: loc.pathname === '/' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              fontFamily: "'Inter', sans-serif"
            }}
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              if (loc.pathname !== '/') {
                e.target.style.background = 'transparent';
              }
              e.target.style.transform = 'scale(1)';
            }}
          >
            🏠 Home
          </Link>
          
          <Link 
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '2rem',
              fontWeight: '600',
              padding: '16px 32px',
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              background: loc.pathname === '/about' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              fontFamily: "'Inter', sans-serif"
            }}
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              if (loc.pathname !== '/about') {
                e.target.style.background = 'transparent';
              }
              e.target.style.transform = 'scale(1)';
            }}
          >
            💫 About
          </Link>
          
          <Link 
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '2rem',
              fontWeight: '600',
              padding: '16px 32px',
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              background: loc.pathname === '/services' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              fontFamily: "'Inter', sans-serif"
            }}
            to="/services"
            onClick={() => setIsMobileMenuOpen(false)}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              if (loc.pathname !== '/services') {
                e.target.style.background = 'transparent';
              }
              e.target.style.transform = 'scale(1)';
            }}
          >
            ✨ Services
          </Link>
          
          <Link 
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '2rem',
              fontWeight: '600',
              padding: '16px 32px',
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              background: loc.pathname === '/contact' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              fontFamily: "'Inter', sans-serif"
            }}
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              if (loc.pathname !== '/contact') {
                e.target.style.background = 'transparent';
              }
              e.target.style.transform = 'scale(1)';
            }}
          >
            💕 Contact
          </Link>

          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              marginTop: '32px',
              padding: '20px 40px',
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: '#92400e',
              textDecoration: 'none',
              borderRadius: '50px',
              fontWeight: '700',
              fontSize: '1.5rem',
              transition: 'all 0.3s ease',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              fontFamily: "'Inter', sans-serif"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.boxShadow = '0 15px 35px rgba(251, 191, 36, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            💍 Book Your Dream Event
          </Link>
        </nav>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(1deg); }
          66% { transform: translateY(-8px) rotate(-0.5deg); }
        }
        @media (max-width: 768px) {
          nav { display: none !important; }
          button { display: flex !important; }
        }
      `}</style>
    </>
  );
}