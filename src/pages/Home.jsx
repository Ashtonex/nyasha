/* =========================
src/pages/Home.jsx
========================= */
import React, { useState, useEffect, useRef } from 'react'
import HeroSection from '../components/HeroSection'
import ServiceCard from '../components/ServiceCard'

// Loading Screen Component
const LoadingScreen = ({ isVisible }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 100%)',
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
        width: '80px',
        height: '80px',
        border: '3px solid rgba(179, 91, 107, 0.1)',
        borderTop: '3px solid #b35b6b',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 20px'
      }}></div>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '2rem',
        color: '#374151',
        marginBottom: '8px',
        fontWeight: 'bold'
      }}>Eternal Moments</h2>
      <p style={{
        color: '#6b7280',
        fontSize: '1.125rem'
      }}>Creating magical experiences...</p>
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
    `}</style>
  </div>
);

// Enhanced Hero Section Component
const EnhancedHeroSection = ({ title, subtitle, ctaText }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCtaClick = (e) => {
    e.preventDefault();
    // Add ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255,255,255,0.4);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    console.log('Book Your Event clicked!');
  };

  return (
    <section style={{
      background: `
        linear-gradient(135deg, rgba(179, 91, 107, 0.95) 0%, rgba(139, 69, 83, 0.95) 100%),
        radial-gradient(circle at 20% 80%, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 218, 185, 0.3) 0%, transparent 50%)
      `,
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '40px',
        transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        animation: 'float 6s ease-in-out infinite',
        transition: 'transform 0.1s ease-out'
      }}>
        <svg width="80" height="80" viewBox="0 0 80 80" style={{ color: 'white', opacity: 0.2 }}>
          <path d="M40 5 L50 25 L70 20 L60 40 L80 45 L60 50 L70 70 L50 65 L40 85 L30 65 L10 70 L20 50 L0 45 L20 40 L10 20 L30 25 Z" fill="currentColor"/>
        </svg>
      </div>

      <div style={{
        position: 'absolute',
        top: '160px',
        right: '80px',
        transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
        animation: 'float 6s ease-in-out infinite',
        animationDelay: '-2s',
        transition: 'transform 0.1s ease-out'
      }}>
        <svg width="60" height="60" viewBox="0 0 60 60" style={{ color: 'white', opacity: 0.15 }}>
          <circle cx="30" cy="30" r="5" fill="currentColor"/>
          <path d="M30 10 Q40 20 30 30 Q20 20 30 10" fill="currentColor"/>
          <path d="M50 30 Q40 40 30 30 Q40 20 50 30" fill="currentColor"/>
          <path d="M30 50 Q20 40 30 30 Q40 40 30 50" fill="currentColor"/>
          <path d="M10 30 Q20 20 30 30 Q20 40 10 30" fill="currentColor"/>
        </svg>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '128px',
        left: '25%',
        transform: `translate(${mousePosition.x * 0.7}px, ${mousePosition.y * 0.7}px)`,
        animation: 'float 8s ease-in-out infinite',
        animationDelay: '-4s',
        transition: 'transform 0.1s ease-out'
      }}>
        <svg width="70" height="70" viewBox="0 0 70 70" style={{ color: 'white', opacity: 0.1 }}>
          <path d="M35 15 Q45 25 35 35 Q25 25 35 15" fill="currentColor"/>
          <path d="M55 35 Q45 45 35 35 Q45 25 55 35" fill="currentColor"/>
          <circle cx="35" cy="35" r="20" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
        </svg>
      </div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 24px',
        textAlign: 'center',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div className="fade-in" style={{
          opacity: 0,
          transform: 'translateY(30px)',
          animation: 'fadeInUp 0.8s ease forwards',
          animationDelay: '0.1s'
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 'bold',
            marginBottom: '32px',
            lineHeight: '1.1'
          }}>
            Turning Your<br/>
            <span style={{
              color: '#fef3c7',
              position: 'relative'
            }}>
              Dream Event
              <svg style={{
                position: 'absolute',
                top: '-16px',
                right: '-32px',
                width: '64px',
                height: '64px',
                color: '#fde68a',
                opacity: 0.6
              }} viewBox="0 0 64 64">
                <path d="M32 8 L40 24 L56 16 L48 32 L64 40 L48 48 L56 64 L40 56 L32 72 L24 56 L8 64 L16 48 L0 40 L16 32 L8 16 L24 24 Z" fill="currentColor"/>
              </svg>
            </span><br/>
            Into Reality
          </h1>
        </div>
        
        <div className="fade-in" style={{
          opacity: 0,
          transform: 'translateY(30px)',
          animation: 'fadeInUp 0.8s ease forwards',
          animationDelay: '0.2s'
        }}>
          <p style={{
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            marginBottom: '24px',
            fontWeight: '300',
            letterSpacing: '0.1em',
            color: '#fef3c7'
          }}>
            {subtitle}
          </p>
        </div>
        
        <div className="fade-in" style={{
          opacity: 0,
          transform: 'translateY(30px)',
          animation: 'fadeInUp 0.8s ease forwards',
          animationDelay: '0.3s'
        }}>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            marginBottom: '48px',
            maxWidth: '768px',
            margin: '0 auto 48px',
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            Where every detail whispers elegance and every moment becomes a cherished memory. 
            Let us craft the wedding of your dreams with unparalleled sophistication and artistry.
          </p>
        </div>
        
        <div className="fade-in" style={{
          opacity: 0,
          transform: 'translateY(30px)',
          animation: 'fadeInUp 0.8s ease forwards',
          animationDelay: '0.4s'
        }}>
          <button 
            style={{
              background: 'linear-gradient(135deg, #b35b6b 0%, #8b4553 100%)',
              color: 'white',
              padding: '20px 48px',
              borderRadius: '9999px',
              fontSize: '1.25rem',
              fontWeight: '600',
              letterSpacing: '0.05em',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'scale(1)'
            }}
            onClick={handleCtaClick}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 15px 35px rgba(179, 91, 107, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {ctaText}
          </button>
        </div>
        
        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0,
          animation: 'fadeInUp 0.8s ease forwards',
          animationDelay: '0.5s'
        }}>
          <div style={{
            animation: 'bounce 2s infinite'
          }}>
            <div style={{
              width: '24px',
              height: '40px',
              border: '2px solid white',
              borderRadius: '20px',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '4px',
                height: '12px',
                background: 'white',
                borderRadius: '2px',
                marginTop: '8px',
                animation: 'pulse 2s infinite'
              }}></div>
            </div>
            <p style={{
              fontSize: '0.875rem',
              marginTop: '8px',
              opacity: 0.75
            }}>Scroll to explore</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(2deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
          40%, 43% { transform: translate3d(0,-15px,0); }
          70% { transform: translate3d(0,-7px,0); }
          90% { transform: translate3d(0,-2px,0); }
        }
        @keyframes ripple {
          to {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

// Enhanced Service Card Component
const EnhancedServiceCard = ({ image, title, desc }) => {
  const cardRef = useRef(null);

  const handleClick = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255,255,255,0.4);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 10;
    `;
    
    card.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  const getServiceConfig = (title) => {
    if (title.includes('Decor')) {
      return {
        gradient: 'linear-gradient(135deg, #fce7f3 0%, #fecaca 100%)',
        textColor: '#f43f5e',
        icon: (
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ color: '#fb7185' }}>
            <path d="M60 20 L70 40 L90 35 L80 55 L100 60 L80 65 L90 85 L70 80 L60 100 L50 80 L30 85 L40 65 L20 60 L40 55 L30 35 L50 40 Z" fill="currentColor" opacity="0.6"/>
            <circle cx="60" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.8"/>
            <path d="M45 60 Q60 45 75 60 Q60 75 45 60" fill="currentColor" opacity="0.7"/>
          </svg>
        )
      };
    } else if (title.includes('Catering')) {
      return {
        gradient: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
        textColor: '#d97706',
        icon: (
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ color: '#f59e0b' }}>
            <circle cx="60" cy="40" r="18" fill="currentColor" opacity="0.6"/>
            <path d="M25 65 Q60 50 95 65 L90 85 Q60 95 30 85 Z" fill="currentColor" opacity="0.7"/>
            <circle cx="45" cy="78" r="10" fill="currentColor" opacity="0.5"/>
            <circle cx="75" cy="78" r="10" fill="currentColor" opacity="0.5"/>
            <path d="M35 95 Q60 88 85 95" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.8"/>
          </svg>
        )
      };
    } else {
      return {
        gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
        textColor: '#059669',
        icon: (
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ color: '#10b981' }}>
            <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.6"/>
            <path d="M35 60 L55 80 L85 45" stroke="currentColor" strokeWidth="5" fill="none" opacity="0.8"/>
            <circle cx="25" cy="25" r="10" fill="currentColor" opacity="0.5"/>
            <circle cx="95" cy="25" r="10" fill="currentColor" opacity="0.5"/>
            <circle cx="25" cy="95" r="10" fill="currentColor" opacity="0.5"/>
            <circle cx="95" cy="95" r="10" fill="currentColor" opacity="0.5"/>
          </svg>
        )
      };
    }
  };

  const config = getServiceConfig(title);

  return (
    <div 
      ref={cardRef}
      style={{
        background: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        margin: '12px',
        maxWidth: '380px',
        opacity: 0,
        transform: 'translateX(-50px)',
        animation: 'slideInLeft 0.8s ease forwards'
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-15px) scale(1.03)';
        e.currentTarget.style.boxShadow = '0 30px 60px rgba(179, 91, 107, 0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
      }}
    >
      <div style={{
        height: '320px',
        background: config.gradient,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {config.icon}
        </div>
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" style={{ color: 'white' }}>
              <path d="M8 2 L14 8 L8 14 M14 8 L2 8" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
      </div>
      <div style={{
        padding: '32px',
        position: 'relative'
      }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '16px'
        }}>
          {title}
        </h3>
        <p style={{
          color: '#6b7280',
          lineHeight: '1.6',
          marginBottom: '24px',
          fontSize: '1.125rem'
        }}>
          {desc}
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: config.textColor,
            fontWeight: '600'
          }}>
            <span>Explore More</span>
            <svg width="20" height="20" viewBox="0 0 20 20" style={{ marginLeft: '8px' }}>
              <path d="M10 3 L17 10 L10 17 M17 10 L3 10" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <div style={{
            width: '48px',
            height: '48px',
            background: '#f3f4f6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" style={{ color: '#6b7280' }}>
              <path d="M12 5 L19 12 L12 19 M19 12 L5 12" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default function Home(){
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleFinalCtaClick = (e) => {
    e.preventDefault();
    // Add ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255,255,255,0.4);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    console.log('Start Planning clicked!');
  };

  return (
    <div>
      <LoadingScreen isVisible={isLoading} />
      
      <div style={{ 
        opacity: isLoading ? 0 : 1, 
        transition: 'opacity 1s ease',
        fontFamily: "'Inter', sans-serif"
      }}>
        <HeroSection 
          title="Turning Your Dream Event Into Reality"
          subtitle="Decor • Catering • Coordination"
          ctaText="Book Your Dream Event"
        />

        <section style={{
          padding: '96px 40px',
          textAlign: 'center',
          background: 'linear-gradient(to bottom, #f9fafb 0%, white 50%, #f9fafb 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Decorations */}
          <div style={{
            position: 'absolute',
            top: '80px',
            left: '40px',
            opacity: 0.05
          }}>
            <svg width="200" height="200" viewBox="0 0 200 200" style={{ color: '#f43f5e' }}>
              <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
          
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 10
          }}>
            <div style={{ marginBottom: '80px' }}>
              <div style={{
                opacity: 0,
                animation: 'fadeInUp 0.8s ease forwards',
                animationDelay: '0.2s'
              }}>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(3rem, 7vw, 5rem)',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #b35b6b 0%, #8b4553 50%, #d4a574 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '32px',
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 4s ease-in-out infinite, fadeInUp 0.8s ease forwards'
                }}>
                  What We Do
                </h2>
              </div>
              <div style={{
                opacity: 0,
                animation: 'fadeInUp 0.8s ease forwards',
                animationDelay: '0.3s'
              }}>
                <p style={{
                  fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                  color: '#6b7280',
                  maxWidth: '896px',
                  margin: '0 auto',
                  lineHeight: '1.6'
                }}>
                  From intimate gatherings to grand celebrations, we orchestrate every detail with 
                  meticulous care and artistic vision, ensuring your special day exceeds every expectation.
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '24px',
              marginBottom: '80px',
              maxWidth: '1400px',
              margin: '0 auto 80px'
            }}>
              <EnhancedServiceCard 
                image="/images/decor.jpg" 
                title="Decor & Venue Setup" 
                desc="Transform any space into a breathtaking wonderland with our signature elegant setups, perfectly tailored to reflect your unique love story and personal style." 
              />
              <EnhancedServiceCard 
                image="/images/catering.jpg" 
                title="Catering & Menu" 
                desc="Indulge your guests with exquisite culinary experiences crafted by renowned chefs, featuring seasonal ingredients and presentation as stunning as it is delicious." 
              />
              <EnhancedServiceCard 
                image="/images/coordination.jpg" 
                title="Event Coordination" 
                desc="Experience seamless planning and flawless execution with our dedicated coordination team, ensuring every moment flows perfectly while you celebrate your love." 
              />
            </div>

            {/* Call to Action */}
            <div style={{
              textAlign: 'center',
              opacity: 0,
              animation: 'fadeInUp 0.8s ease forwards',
              animationDelay: '0.6s'
            }}>
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '16px'
                }}>
                  Ready to Begin Your Journey?
                </h3>
                <p style={{
                  fontSize: '1.25rem',
                  color: '#6b7280',
                  maxWidth: '512px',
                  margin: '0 auto'
                }}>
                  Let's create something extraordinary together. Your dream wedding awaits.
                </p>
              </div>
              <button 
                style={{
                  background: 'linear-gradient(135deg, #b35b6b 0%, #8b4553 100%)',
                  color: 'white',
                  padding: '24px 64px',
                  borderRadius: '9999px',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'scale(1)'
                }}
                onClick={handleFinalCtaClick}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px) scale(1.05)';
                  e.target.style.boxShadow = '0 15px 35px rgba(179, 91, 107, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Start Planning Your Dream Wedding
              </button>
            </div>
          </div>

          <style>{`
            @keyframes gradientShift {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
          `}</style>
        </section>
      </div>
    </div>
  )
}