/* =========================
src/components/HeroSection.jsx
========================= */
import React, { useState, useEffect, useRef } from 'react'

export default function HeroSection({ title, subtitle, ctaText }){
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 300);

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(console.log);
    }
  };

  const handleVideoError = () => {
    console.log('Video failed to load, falling back to image');
    setIsVideoLoaded(false);
  };

  return (
    <section style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '85vh',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #f3e8ff 100%)'
    }}>
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          objectFit: 'cover',
          opacity: isVideoLoaded ? 0.7 : 0,
          transition: 'opacity 2s ease-in-out'
        }}
      >
        {/* Local video source */}
        <source src="/images/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Fallback Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: "url('/images/hero.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: isVideoLoaded ? 0 : 1,
        opacity: isVideoLoaded ? 0 : 1,
        transition: 'opacity 2s ease-in-out'
      }}></div>

      {/* Romantic Overlay with enhanced warmth */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          linear-gradient(135deg, rgba(179, 91, 107, 0.4) 0%, rgba(143, 73, 86, 0.5) 50%, rgba(212, 165, 116, 0.4) 100%),
          radial-gradient(circle at 20% 80%, rgba(255, 218, 185, 0.3) 0%, transparent 60%),
          radial-gradient(circle at 80% 20%, rgba(255, 192, 203, 0.3) 0%, transparent 60%),
          linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%)
        `,
        zIndex: 2
      }}></div>

      {/* Floating Romantic Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '8%',
        transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
        transition: 'transform 0.2s ease-out',
        zIndex: 3,
        opacity: 0.15,
        animation: 'romanticFloat 8s ease-in-out infinite'
      }}>
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ color: 'white' }}>
          <path d="M60 25 C45 10, 15 10, 15 40 C15 55, 60 85, 60 85 C60 85, 105 55, 105 40 C105 10, 75 10, 60 25 Z" fill="currentColor"/>
        </svg>
      </div>

      <div style={{
        position: 'absolute',
        top: '15%',
        right: '12%',
        transform: `translate(${mousePosition.x * -0.4}px, ${mousePosition.y * -0.4}px)`,
        transition: 'transform 0.2s ease-out',
        zIndex: 3,
        opacity: 0.1,
        animation: 'romanticFloat 10s ease-in-out infinite',
        animationDelay: '-3s'
      }}>
        <svg width="80" height="80" viewBox="0 0 80 80" style={{ color: 'white' }}>
          <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="3"/>
          <path d="M25 40 Q40 25 55 40 Q40 55 25 40" fill="currentColor" opacity="0.4"/>
          <circle cx="40" cy="40" r="8" fill="currentColor"/>
        </svg>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '15%',
        transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        transition: 'transform 0.2s ease-out',
        zIndex: 3,
        opacity: 0.08,
        animation: 'romanticFloat 12s ease-in-out infinite',
        animationDelay: '-6s'
      }}>
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ color: 'white' }}>
          <path d="M50 15 L60 35 L80 30 L70 50 L90 55 L70 60 L80 80 L60 75 L50 95 L40 75 L20 80 L30 60 L10 55 L30 50 L20 30 L40 35 Z" fill="currentColor"/>
        </svg>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '20%',
        transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
        transition: 'transform 0.2s ease-out',
        zIndex: 3,
        opacity: 0.12,
        animation: 'romanticFloat 9s ease-in-out infinite',
        animationDelay: '-4s'
      }}>
        <svg width="60" height="60" viewBox="0 0 60 60" style={{ color: 'white' }}>
          <circle cx="30" cy="30" r="25" fill="currentColor" opacity="0.3"/>
          <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="30" cy="30" r="5" fill="currentColor"/>
        </svg>
      </div>

      {/* Floating Hearts */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden'
      }}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 15 + 20}px`,
              opacity: Math.random() * 0.2 + 0.05,
              animation: `floatUp ${Math.random() * 15 + 20}s linear infinite`,
              animationDelay: `${Math.random() * 15}s`,
              color: 'white'
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{
        background: `
          linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%),
          rgba(0, 0, 0, 0.3)
        `,
        backdropFilter: 'blur(8px)',
        padding: '60px 50px',
        borderRadius: '32px',
        maxWidth: '1000px',
        margin: '0 40px',
        textAlign: 'center',
        color: 'white',
        zIndex: 10,
        position: 'relative',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(179, 91, 107, 0.2)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
        transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '3rem',
          animation: 'heartbeat 2s ease-in-out infinite'
        }}>
          💖
        </div>

        <div style={{
          position: 'absolute',
          top: '-15px',
          right: '-15px',
          width: '40px',
          height: '40px',
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          borderRadius: '50%',
          opacity: 0.8,
          animation: 'pulse 3s ease-in-out infinite'
        }}></div>

        <div style={{
          position: 'absolute',
          bottom: '-15px',
          left: '-15px',
          width: '30px',
          height: '30px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '50%',
          opacity: 0.7,
          animation: 'pulse 2.5s ease-in-out infinite',
          animationDelay: '-1s'
        }}></div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          margin: 0,
          marginBottom: '24px',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 'bold',
          lineHeight: '1.1',
          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
          background: 'linear-gradient(135deg, #ffffff 0%, #fef3c7 50%, #fbbf24 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s ease',
          transitionDelay: '0.3s'
        }}>
          {title}
        </h1>

        <p style={{
          marginTop: '24px',
          marginBottom: '40px',
          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
          lineHeight: '1.6',
          fontWeight: '300',
          textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          maxWidth: '800px',
          margin: '24px auto 40px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s ease',
          transitionDelay: '0.6s',
          fontStyle: 'italic'
        }}>
          {subtitle}
        </p>

        <a 
          href="/contact" 
          style={{
            display: 'inline-block',
            marginTop: '32px',
            background: 'linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)',
            color: '#b35b6b',
            padding: '20px 40px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1.25rem',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            transform: 'scale(1)',
            boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)',
            fontFamily: "'Inter', sans-serif",
            opacity: isVisible ? 1 : 0,
            transitionDelay: '0.9s'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-5px) scale(1.05)';
            e.target.style.boxShadow = '0 20px 40px rgba(255, 255, 255, 0.4)';
            e.target.style.background = 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.2)';
            e.target.style.background = 'linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)';
            e.target.style.color = '#b35b6b';
          }}
        >
          <span style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ marginRight: '12px', fontSize: '1.5rem' }}>💍</span>
            {ctaText}
            <span style={{ marginLeft: '12px', fontSize: '1.5rem' }}>✨</span>
          </span>
        </a>

        {/* Video Loading Indicator */}
        {!isVideoLoaded && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '12px 20px',
            borderRadius: '20px',
            fontSize: '0.875rem',
            opacity: 0.8,
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderTop: '2px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginRight: '8px'
            }}></div>
            Loading magical video...
          </div>
        )}
      </div>

      <style>{`
        @keyframes romanticFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(2deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
          75% { transform: translateY(-25px) rotate(1deg); }
        }
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes heartbeat {
          0%, 100% { transform: translateX(-50%) scale(1); }
          25% { transform: translateX(-50%) scale(1.2); }
          50% { transform: translateX(-50%) scale(1.1); }
          75% { transform: translateX(-50%) scale(1.25); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}