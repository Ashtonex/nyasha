/* =========================
src/pages/Contact.jsx
========================= */
import React, { useState, useEffect, useRef } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Calendar from "../components/Calendar";

// Loading Screen Component
const LoadingScreen = ({ isVisible }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #f3e8ff 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? 'visible' : 'hidden',
    transition: 'opacity 0.8s ease, visibility 0.8s ease'
  }}>
    <div style={{
      textAlign: 'center',
      animation: 'pulse 2s ease-in-out infinite'
    }}>
      <div style={{
        width: '100px',
        height: '100px',
        position: 'relative',
        margin: '0 auto 30px'
      }}>
        <div style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          border: '3px solid rgba(236, 72, 153, 0.2)',
          borderRadius: '50%',
          animation: 'spin 2s linear infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          width: '80px',
          height: '80px',
          border: '3px solid #ec4899',
          borderTop: '3px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1.5s linear infinite reverse'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '35px',
          left: '35px',
          fontSize: '2rem',
          animation: 'heartbeat 1.5s ease-in-out infinite'
        }}>💕</div>
      </div>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '2.5rem',
        background: 'linear-gradient(135deg, #ec4899 0%, #be185d 50%, #7c3aed 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '12px',
        fontWeight: 'bold'
      }}>Your Love Story Awaits</h2>
      <p style={{
        color: '#be185d',
        fontSize: '1.25rem',
        fontStyle: 'italic'
      }}>Creating magical moments...</p>
    </div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.2); }
        50% { transform: scale(1.1); }
        75% { transform: scale(1.25); }
      }
    `}</style>
  </div>
);

// Floating Hearts Component
const FloatingHearts = () => {
  const hearts = ['💕', '💖', '💗', '💝', '💘', '💞'];
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
      overflow: 'hidden'
    }}>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 15}px`,
            opacity: Math.random() * 0.3 + 0.1,
            animation: `floatUp ${Math.random() * 10 + 15}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`
          }}
        >
          {hearts[Math.floor(Math.random() * hearts.length)]}
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Hero Section Component
const ContactHeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section style={{
      background: `
        linear-gradient(135deg, rgba(236, 72, 153, 0.9) 0%, rgba(190, 24, 93, 0.9) 50%, rgba(124, 58, 237, 0.9) 100%),
        radial-gradient(circle at 20% 80%, rgba(255, 182, 193, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(196, 181, 253, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(252, 231, 243, 0.3) 0%, transparent 50%)
      `,
      minHeight: '80vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Romantic Floating Elements */}
      <div style={{
        position: 'absolute',
        top: '60px',
        left: '60px',
        transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
        animation: 'romanticFloat 8s ease-in-out infinite',
        transition: 'transform 0.2s ease-out'
      }}>
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ color: 'white', opacity: 0.2 }}>
          <path d="M60 25 C45 10, 15 10, 15 40 C15 55, 60 85, 60 85 C60 85, 105 55, 105 40 C105 10, 75 10, 60 25 Z" fill="currentColor"/>
        </svg>
      </div>

      <div style={{
        position: 'absolute',
        top: '100px',
        right: '80px',
        transform: `translate(${mousePosition.x * -0.4}px, ${mousePosition.y * -0.4}px)`,
        animation: 'romanticFloat 10s ease-in-out infinite',
        animationDelay: '-3s',
        transition: 'transform 0.2s ease-out'
      }}>
        <svg width="80" height="80" viewBox="0 0 80 80" style={{ color: 'white', opacity: 0.15 }}>
          <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M25 40 Q40 25 55 40 Q40 55 25 40" fill="currentColor" opacity="0.4"/>
          <circle cx="40" cy="40" r="8" fill="currentColor"/>
        </svg>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '120px',
        left: '25%',
        transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.6}px)`,
        animation: 'romanticFloat 12s ease-in-out infinite',
        animationDelay: '-6s',
        transition: 'transform 0.2s ease-out'
      }}>
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ color: 'white', opacity: 0.1 }}>
          <path d="M50 15 L60 35 L80 30 L70 50 L90 55 L70 60 L80 80 L60 75 L50 95 L40 75 L20 80 L30 60 L10 55 L30 50 L20 30 L40 35 Z" fill="currentColor"/>
        </svg>
      </div>

      <div style={{
        textAlign: 'center',
        color: 'white',
        zIndex: 10,
        maxWidth: '900px',
        padding: '0 40px'
      }}>
        <div style={{
          opacity: 0,
          transform: 'translateY(50px)',
          animation: 'fadeInUp 1.5s ease forwards',
          animationDelay: '0.3s'
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3.5rem, 8vw, 6rem)',
            fontWeight: 'bold',
            marginBottom: '32px',
            lineHeight: '1.1',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            Let's Create Your
            <span style={{
              color: '#fef3c7',
              display: 'block',
              position: 'relative'
            }}>
              Perfect Love Story
              <div style={{
                position: 'absolute',
                top: '-30px',
                right: '-50px',
                fontSize: '4rem',
                animation: 'heartbeat 2s ease-in-out infinite'
              }}>💕</div>
            </span>
          </h1>
        </div>
        
        <div style={{
          opacity: 0,
          transform: 'translateY(50px)',
          animation: 'fadeInUp 1.5s ease forwards',
          animationDelay: '0.6s'
        }}>
          <p style={{
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            opacity: 0.95,
            lineHeight: '1.6',
            fontWeight: '300',
            maxWidth: '700px',
            margin: '0 auto 40px',
            fontStyle: 'italic'
          }}>
            "Every love story is beautiful, but yours will be our masterpiece"
          </p>
        </div>

        <div style={{
          opacity: 0,
          transform: 'translateY(50px)',
          animation: 'fadeInUp 1.5s ease forwards',
          animationDelay: '0.9s'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '60px',
            flexWrap: 'wrap',
            marginTop: '40px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>💍</div>
              <div style={{ fontSize: '1.25rem', opacity: 0.9 }}>Dream Weddings</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>💖</div>
              <div style={{ fontSize: '1.25rem', opacity: 0.9 }}>Romantic Moments</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✨</div>
              <div style={{ fontSize: '1.25rem', opacity: 0.9 }}>Magical Memories</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes romanticFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-25px) rotate(3deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
          75% { transform: translateY(-30px) rotate(1deg); }
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

// Enhanced Form Component
const EnhancedContactForm = ({ formData, handleChange, handleSubmit, loading, selectedDate }) => {
  const formRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Add magical submit effect
    const form = formRef.current;
    const sparkles = document.createElement('div');
    sparkles.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 100;
    `;
    
    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: linear-gradient(45deg, #ec4899, #fbbf24);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: sparkleOut 1s ease-out forwards;
      `;
      sparkles.appendChild(sparkle);
    }
    
    form.appendChild(sparkles);
    setTimeout(() => sparkles.remove(), 1000);
    
    handleSubmit(e);
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '16px 20px',
    marginBottom: '24px',
    border: '2px solid #f1f5f9',
    borderRadius: '16px',
    fontSize: '1.125rem',
    fontFamily: "'Inter', sans-serif",
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const focusStyle = {
    borderColor: '#ec4899',
    boxShadow: '0 0 0 4px rgba(236, 72, 153, 0.1)',
    background: 'white'
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(252, 231, 243, 0.95) 100%)',
      borderRadius: '32px',
      padding: '48px',
      boxShadow: '0 25px 50px rgba(236, 72, 153, 0.15)',
      border: '1px solid rgba(236, 72, 153, 0.1)',
      backdropFilter: 'blur(20px)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '100px',
        height: '100px',
        background: 'linear-gradient(135deg, #ec4899, #be185d)',
        borderRadius: '50%',
        opacity: 0.1,
        animation: 'pulse 4s ease-in-out infinite'
      }}></div>

      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '2.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #ec4899 0%, #be185d 50%, #7c3aed 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px'
        }}>
          Tell Us About Your Dream Event 💕
        </h3>
        <p style={{
          color: '#6b7280',
          fontSize: '1.25rem',
          fontStyle: 'italic'
        }}>
          Every detail matters when creating your perfect moment
        </p>
      </div>

      <form ref={formRef} onSubmit={handleFormSubmit} style={{ position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '24px'
        }}>
          <input
            type="text"
            name="name"
            placeholder="Your Beautiful Name ✨"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#f1f5f9';
              e.target.style.boxShadow = 'none';
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
            }}
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email Address 💌"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#f1f5f9';
              e.target.style.boxShadow = 'none';
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
            }}
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '24px'
        }}>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number 📞"
            value={formData.phone}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#f1f5f9';
              e.target.style.boxShadow = 'none';
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
            }}
          />
          
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
            style={{
              ...inputStyle,
              cursor: 'pointer'
            }}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#f1f5f9';
              e.target.style.boxShadow = 'none';
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
            }}
          >
            <option value="">Select Your Event Type 💖</option>
            <option value="wedding">💍 Wedding Ceremony</option>
            <option value="engagement">💕 Engagement Party</option>
            <option value="anniversary">🥂 Anniversary Celebration</option>
            <option value="bridal-shower">👰 Bridal Shower</option>
            <option value="birthday">🎂 Birthday Party</option>
            <option value="corporate">🏢 Corporate Event</option>
            <option value="other">✨ Other Special Event</option>
          </select>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '24px'
        }}>
          <input
            type="number"
            name="guests"
            placeholder="Number of Guests 👥"
            value={formData.guests}
            onChange={handleChange}
            required
            min={1}
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#f1f5f9';
              e.target.style.boxShadow = 'none';
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
            }}
          />
          
          <input
            type="text"
            name="venue"
            placeholder="Dream Venue Location 🏰"
            value={formData.venue}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#f1f5f9';
              e.target.style.boxShadow = 'none';
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
            }}
          />
        </div>

        <input
          type="text"
          name="budget"
          placeholder="Estimated Budget 💰"
          value={formData.budget}
          onChange={handleChange}
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => {
            e.target.style.borderColor = '#f1f5f9';
            e.target.style.boxShadow = 'none';
            e.target.style.background = 'rgba(255, 255, 255, 0.9)';
          }}
        />

        <textarea
          name="notes"
          placeholder="Tell us about your dream event... What makes your love story special? ✨💕"
          value={formData.notes}
          onChange={handleChange}
          rows={5}
          style={{
            ...inputStyle,
            resize: 'vertical',
            minHeight: '120px'
          }}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => {
            e.target.style.borderColor = '#f1f5f9';
            e.target.style.boxShadow = 'none';
            e.target.style.background = 'rgba(255, 255, 255, 0.9)';
          }}
        />

        {selectedDate && (
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            padding: '20px',
            borderRadius: '16px',
            marginBottom: '32px',
            border: '2px solid #f59e0b',
            textAlign: 'center'
          }}>
            <p style={{
              color: '#92400e',
              fontSize: '1.25rem',
              fontWeight: '600',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ marginRight: '12px', fontSize: '1.5rem' }}>📅</span>
              Selected Date: {selectedDate.toDateString()}
              <span style={{ marginLeft: '12px', fontSize: '1.5rem' }}>💕</span>
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '20px 40px',
            background: loading 
              ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
              : 'linear-gradient(135deg, #ec4899 0%, #be185d 50%, #7c3aed 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            fontSize: '1.25rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'scale(1)',
            fontFamily: "'Inter', sans-serif"
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.transform = 'translateY(-3px) scale(1.02)';
              e.target.style.boxShadow = '0 20px 40px rgba(236, 72, 153, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }
          }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: '24px',
                height: '24px',
                border: '3px solid rgba(255,255,255,0.3)',
                borderTop: '3px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginRight: '12px'
              }}></div>
              Creating Your Magic...
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              💕 Book Your Dream Event 💕
            </span>
          )}
        </button>
      </form>

      <style>{`
        @keyframes sparkleOut {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(2) rotate(180deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Enhanced Calendar Component
const EnhancedCalendarSection = ({ onRequestBooking, selectedDate }) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(243, 232, 255, 0.95) 100%)',
      borderRadius: '32px',
      padding: '48px',
      boxShadow: '0 25px 50px rgba(124, 58, 237, 0.15)',
      border: '1px solid rgba(124, 58, 237, 0.1)',
      backdropFilter: 'blur(20px)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        left: '-30px',
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
        borderRadius: '50%',
        opacity: 0.1,
        animation: 'pulse 3s ease-in-out infinite'
      }}></div>

      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h4 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '2.25rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 50%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px'
        }}>
          Choose Your Perfect Date 📅💕
        </h4>
        <p style={{
          color: '#6b7280',
          fontSize: '1.125rem',
          lineHeight: '1.6',
          fontStyle: 'italic'
        }}>
          Select your preferred date and let us make it magical. We accept up to 2 bookings per day 
          to ensure each event gets our complete attention.
        </p>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '20px',
        padding: '24px',
        border: '1px solid rgba(124, 58, 237, 0.1)'
      }}>
        <Calendar onRequestBooking={onRequestBooking} />
      </div>

      {selectedDate && (
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
          padding: '20px',
          borderRadius: '16px',
          border: '2px solid #10b981'
        }}>
          <p style={{
            color: '#065f46',
            fontSize: '1.25rem',
            fontWeight: '600',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ marginRight: '12px', fontSize: '1.5rem' }}>✨</span>
            Perfect! You've selected: {selectedDate.toDateString()}
            <span style={{ marginLeft: '12px', fontSize: '1.5rem' }}>💖</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default function Contact() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    guests: "",
    venue: "",
    budget: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Calendar date selection
  const handleRequestBooking = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    setSelectedDate(date);
    
    // Custom romantic notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
      color: white;
      padding: 20px 28px;
      border-radius: 16px;
      box-shadow: 0 15px 35px rgba(236, 72, 153, 0.4);
      z-index: 10000;
      animation: slideInRight 0.5s ease;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
    `;
    notification.innerHTML = `
      <div style="display: flex; align-items: center;">
        <span style="margin-right: 12px; font-size: 1.5rem;">💕</span>
        Perfect choice! ${date.toDateString()} selected. Now tell us about your dream event below!
        <span style="margin-left: 12px; font-size: 1.5rem;">✨</span>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
  };

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate) {
      // Custom error notification
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
        padding: 20px 28px;
        border-radius: 16px;
        box-shadow: 0 15px 35px rgba(239, 68, 68, 0.4);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
      `;
      notification.innerHTML = `
        <div style="display: flex; align-items: center;">
          <span style="margin-right: 12px; font-size: 1.5rem;">📅</span>
          Please select your perfect date from the calendar first!
          <span style="margin-left: 12px; font-size: 1.5rem;">💕</span>
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 4000);
      return;
    }

    setLoading(true);

    try {
      console.log("Submitting booking:", { ...formData, date: selectedDate });

      await addDoc(collection(db, "bookings"), {
        ...formData,
        guests: Number(formData.guests),
        date: Timestamp.fromDate(selectedDate),
        createdAt: Timestamp.now(),
      });

      // Success notification with hearts
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 24px 32px;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(16, 185, 129, 0.4);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        max-width: 400px;
      `;
      notification.innerHTML = `
        <div style="text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 8px;">💕✨💖</div>
          <div style="font-size: 1.125rem; margin-bottom: 4px;">Booking Submitted Successfully!</div>
          <div style="font-size: 0.95rem; opacity: 0.9;">We'll contact you soon to make your dream event a reality!</div>
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 6000);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        guests: "",
        venue: "",
        budget: "",
        notes: "",
      });
      setSelectedDate(null);
    } catch (err) {
      console.error("Booking submission failed:", err);
      
      // Error notification
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
        padding: 20px 28px;
        border-radius: 16px;
        box-shadow: 0 15px 35px rgba(239, 68, 68, 0.4);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
      `;
      notification.innerHTML = `
        <div style="display: flex; align-items: center;">
          <span style="margin-right: 12px; font-size: 1.5rem;">😔</span>
          Could not save booking — please try again later
          <span style="margin-left: 12px; font-size: 1.5rem;">💔</span>
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LoadingScreen isVisible={isLoading} />
      <FloatingHearts />
      
      <div style={{ 
        opacity: isLoading ? 0 : 1, 
        transition: 'opacity 1s ease',
        fontFamily: "'Inter', sans-serif"
      }}>
        <ContactHeroSection />
        
        <section style={{
          padding: '120px 40px',
          background: `
            linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #f3e8ff 50%, #ede9fe 75%, #fdf2f8 100%),
            radial-gradient(circle at 25% 25%, rgba(236, 72, 153, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(124, 58, 237, 0.05) 0%, transparent 50%)
          `,
          position: 'relative',
          minHeight: '100vh'
        }}>
          {/* Background Decorations */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            opacity: 0.03,
            transform: 'rotate(-20deg)'
          }}>
            <svg width="300" height="300" viewBox="0 0 300 300" style={{ color: '#ec4899' }}>
              <path d="M150 50 C125 25, 75 25, 75 75 C75 100, 150 175, 150 175 C150 175, 225 100, 225 75 C225 25, 175 25, 150 50 Z" fill="currentColor"/>
            </svg>
          </div>

          <div style={{
            position: 'absolute',
            bottom: '15%',
            right: '8%',
            opacity: 0.02,
            transform: 'rotate(30deg)'
          }}>
            <svg width="250" height="250" viewBox="0 0 250 250" style={{ color: '#7c3aed' }}>
              <circle cx="125" cy="125" r="100" fill="none" stroke="currentColor" strokeWidth="4"/>
              <path d="M75 125 Q125 75 175 125 Q125 175 75 125" fill="currentColor" opacity="0.3"/>
            </svg>
          </div>
          
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 10
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
              gap: '60px',
              alignItems: 'start'
            }}>
              {/* Left - Form */}
              <div style={{
                opacity: 0,
                transform: 'translateX(-50px)',
                animation: 'slideInLeft 1s ease forwards',
                animationDelay: '0.3s'
              }}>
                <EnhancedContactForm 
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  loading={loading}
                  selectedDate={selectedDate}
                />
              </div>

              {/* Right - Calendar */}
              <div style={{
                opacity: 0,
                transform: 'translateX(50px)',
                animation: 'slideInRight 1s ease forwards',
                animationDelay: '0.5s'
              }}>
                <EnhancedCalendarSection 
                  onRequestBooking={handleRequestBooking}
                  selectedDate={selectedDate}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}