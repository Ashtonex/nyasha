/* =========================
src/pages/Services.jsx
========================= */
import React, { useState, useEffect, useRef } from 'react'
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
      }}>Our Services</h2>
      <p style={{
        color: '#6b7280',
        fontSize: '1.125rem'
      }}>Crafting perfect moments...</p>
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

// Hero Section Component
const ServicesHeroSection = () => {
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

  return (
    <section style={{
      background: `
        linear-gradient(135deg, rgba(179, 91, 107, 0.95) 0%, rgba(139, 69, 83, 0.95) 100%),
        radial-gradient(circle at 25% 75%, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 75% 25%, rgba(255, 218, 185, 0.3) 0%, transparent 50%)
      `,
      minHeight: '70vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Floating Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '80px',
        transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
        animation: 'float 7s ease-in-out infinite',
        transition: 'transform 0.1s ease-out'
      }}>
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ color: 'white', opacity: 0.15 }}>
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M25 50 Q50 25 75 50 Q50 75 25 50" fill="currentColor" opacity="0.3"/>
          <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.6"/>
        </svg>
      </div>

      <div style={{
        position: 'absolute',
        top: '120px',
        right: '100px',
        transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
        animation: 'float 9s ease-in-out infinite',
        animationDelay: '-3s',
        transition: 'transform 0.1s ease-out'
      }}>
        <svg width="80" height="80" viewBox="0 0 80 80" style={{ color: 'white', opacity: 0.1 }}>
          <path d="M40 10 L50 30 L70 25 L60 45 L80 50 L60 55 L70 75 L50 70 L40 90 L30 70 L10 75 L20 55 L0 50 L20 45 L10 25 L30 30 Z" fill="currentColor"/>
        </svg>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '100px',
        left: '30%',
        transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.6}px)`,
        animation: 'float 6s ease-in-out infinite',
        animationDelay: '-1s',
        transition: 'transform 0.1s ease-out'
      }}>
        <svg width="60" height="60" viewBox="0 0 60 60" style={{ color: 'white', opacity: 0.2 }}>
          <rect x="15" y="15" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" rx="5"/>
          <circle cx="30" cy="30" r="12" fill="currentColor" opacity="0.4"/>
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
          transform: 'translateY(40px)',
          animation: 'fadeInUp 1.2s ease forwards',
          animationDelay: '0.2s'
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
            fontWeight: 'bold',
            marginBottom: '32px',
            lineHeight: '1.1'
          }}>
            Exceptional Services for
            <span style={{
              color: '#fef3c7',
              display: 'block',
              position: 'relative'
            }}>
              Extraordinary Events
              <svg style={{
                position: 'absolute',
                top: '-20px',
                right: '-40px',
                width: '80px',
                height: '80px',
                color: '#fde68a',
                opacity: 0.6
              }} viewBox="0 0 80 80">
                <path d="M40 8 L50 28 L70 23 L60 43 L80 48 L60 53 L70 73 L50 68 L40 88 L30 68 L10 73 L20 53 L0 48 L20 43 L10 23 L30 28 Z" fill="currentColor"/>
              </svg>
            </span>
          </h1>
        </div>
        
        <div style={{
          opacity: 0,
          transform: 'translateY(40px)',
          animation: 'fadeInUp 1.2s ease forwards',
          animationDelay: '0.4s'
        }}>
          <p style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            opacity: 0.9,
            lineHeight: '1.6',
            fontWeight: '300',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            From intimate gatherings to grand celebrations, we bring your vision to life with 
            meticulous attention to detail and unparalleled creativity.
          </p>
        </div>

        <div style={{
          opacity: 0,
          transform: 'translateY(40px)',
          animation: 'fadeInUp 1.2s ease forwards',
          animationDelay: '0.6s',
          marginTop: '40px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎨</div>
              <div style={{ fontSize: '1.125rem', opacity: 0.8 }}>Creative Design</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🍽️</div>
              <div style={{ fontSize: '1.125rem', opacity: 0.8 }}>Gourmet Catering</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>⚡</div>
              <div style={{ fontSize: '1.125rem', opacity: 0.8 }}>Flawless Execution</div>
            </div>
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
        accentColor: '#fb7185',
        icon: (
          <svg width="100" height="100" viewBox="0 0 100 100" style={{ color: '#fb7185' }}>
            <path d="M50 15 L60 35 L80 30 L70 50 L90 55 L70 60 L80 80 L60 75 L50 95 L40 75 L20 80 L30 60 L10 55 L30 50 L20 30 L40 35 Z" fill="currentColor" opacity="0.6"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.8"/>
            <path d="M35 50 Q50 35 65 50 Q50 65 35 50" fill="currentColor" opacity="0.7"/>
          </svg>
        )
      };
    } else if (title.includes('Catering')) {
      return {
        gradient: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
        textColor: '#d97706',
        accentColor: '#f59e0b',
        icon: (
          <svg width="100" height="100" viewBox="0 0 100 100" style={{ color: '#f59e0b' }}>
            <circle cx="50" cy="35" r="15" fill="currentColor" opacity="0.6"/>
            <path d="M20 55 Q50 40 80 55 L75 75 Q50 85 25 75 Z" fill="currentColor" opacity="0.7"/>
            <circle cx="40" cy="68" r="8" fill="currentColor" opacity="0.5"/>
            <circle cx="60" cy="68" r="8" fill="currentColor" opacity="0.5"/>
            <path d="M30 85 Q50 78 70 85" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.8"/>
          </svg>
        )
      };
    } else if (title.includes('Coordination')) {
      return {
        gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
        textColor: '#059669',
        accentColor: '#10b981',
        icon: (
          <svg width="100" height="100" viewBox="0 0 100 100" style={{ color: '#10b981' }}>
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.6"/>
            <path d="M30 50 L45 65 L70 40" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.8"/>
            <circle cx="20" cy="20" r="8" fill="currentColor" opacity="0.5"/>
            <circle cx="80" cy="20" r="8" fill="currentColor" opacity="0.5"/>
            <circle cx="20" cy="80" r="8" fill="currentColor" opacity="0.5"/>
            <circle cx="80" cy="80" r="8" fill="currentColor" opacity="0.5"/>
          </svg>
        )
      };
    } else {
      return {
        gradient: 'linear-gradient(135d, #e0e7ff 0%, #c7d2fe 100%)',
        textColor: '#7c3aed',
        accentColor: '#8b5cf6',
        icon: (
          <svg width="100" height="100" viewBox="0 0 100 100" style={{ color: '#8b5cf6' }}>
            <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="3" rx="8" opacity="0.6"/>
            <circle cx="50" cy="50" r="18" fill="currentColor" opacity="0.4"/>
            <path d="M35 35 L65 35 M35 50 L65 50 M35 65 L65 65" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
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
        borderRadius: '28px',
        overflow: 'hidden',
        boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        margin: '16px',
        maxWidth: '420px',
        width: '100%',
        opacity: 0,
        transform: 'translateY(50px)',
        animation: 'slideInUp 0.8s ease forwards',
        border: '1px solid rgba(179, 91, 107, 0.1)'
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-20px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 35px 70px rgba(179, 91, 107, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)';
      }}
    >
      {/* Shine Effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        transition: 'left 0.6s',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>

      <div style={{
        height: '280px',
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
        
        {/* Floating particles */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '12px',
          height: '12px',
          background: 'rgba(255,255,255,0.4)',
          borderRadius: '50%',
          animation: 'float 4s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '30px',
          width: '8px',
          height: '8px',
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite',
          animationDelay: '-2s'
        }}></div>

        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" style={{ color: 'white' }}>
              <path d="M10 3 L17 10 L10 17 M17 10 L3 10" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
      </div>

      <div style={{
        padding: '40px 32px',
        position: 'relative'
      }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.75rem',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '20px',
          lineHeight: '1.3'
        }}>
          {title}
        </h3>
        <p style={{
          color: '#6b7280',
          lineHeight: '1.7',
          marginBottom: '32px',
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
            fontWeight: '600',
            fontSize: '1.125rem'
          }}>
            <span>Learn More</span>
            <svg width="24" height="24" viewBox="0 0 24 24" style={{ 
              marginLeft: '12px',
              transition: 'transform 0.3s ease'
            }}>
              <path d="M12 4 L20 12 L12 20 M20 12 L4 12" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          
          <div style={{
            width: '56px',
            height: '56px',
            background: `linear-gradient(135deg, ${config.accentColor}15 0%, ${config.accentColor}25 100%)`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            border: `2px solid ${config.accentColor}30`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
            e.currentTarget.style.background = config.accentColor;
            e.currentTarget.querySelector('svg').style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            e.currentTarget.style.background = `linear-gradient(135deg, ${config.accentColor}15 0%, ${config.accentColor}25 100%)`;
            e.currentTarget.querySelector('svg').style.color = config.accentColor;
          }}>
            <svg width="28" height="28" viewBox="0 0 28 28" style={{ 
              color: config.accentColor,
              transition: 'color 0.3s ease'
            }}>
              <path d="M14 7 L21 14 L14 21 M21 14 L7 14" stroke="currentColor" strokeWidth="2.5" fill="none"/>
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes ripple {
          to {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default function Services(){
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      image: '/images/decor.jpg',
      title: 'Decor & Venue Setup',
      desc: 'Transform any space into a breathtaking wonderland with full styling, premium furniture, ambient lighting, and stunning floral arrangements that reflect your unique vision.'
    },
    {
      image: '/images/catering.jpg',
      title: 'Catering & Menu Planning',
      desc: 'Indulge your guests with bespoke menus crafted by expert chefs, complete with tastings, dietary accommodations, and presentation that delights all the senses.'
    },
    {
      image: '/images/coordination.jpg',
      title: 'Event Coordination',
      desc: 'Experience flawless execution with our comprehensive timeline creation, vendor management, and seamless on-day coordination that ensures every moment flows perfectly.'
    },
    {
      image: '/images/decor.jpg',
      title: 'Themed Parties',
      desc: 'Create unforgettable experiences with unique themes for bridal showers, milestone birthdays, and corporate events that leave lasting impressions on every guest.'
    }
  ];

  return (
    <div>
      <LoadingScreen isVisible={isLoading} />
      
      <div style={{ 
        opacity: isLoading ? 0 : 1, 
        transition: 'opacity 1s ease',
        fontFamily: "'Inter', sans-serif"
      }}>
        <ServicesHeroSection />
        
        <section style={{
          padding: '120px 40px',
          background: 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 30%, #ffffff 70%, #f8fafc 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Decorations */}
          <div style={{
            position: 'absolute',
            top: '15%',
            left: '5%',
            opacity: 0.03,
            transform: 'rotate(-15deg)'
          }}>
            <svg width="400" height="400" viewBox="0 0 400 400" style={{ color: '#b35b6b' }}>
              <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="200" cy="200" r="50" fill="none" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>

          <div style={{
            position: 'absolute',
            bottom: '10%',
            right: '8%',
            opacity: 0.02,
            transform: 'rotate(25deg)'
          }}>
            <svg width="300" height="300" viewBox="0 0 300 300" style={{ color: '#d97706' }}>
              <path d="M150 50 L200 100 L250 75 L225 125 L275 150 L225 175 L250 225 L200 200 L150 250 L100 200 L50 225 L75 175 L25 150 L75 125 L50 75 L100 100 Z" fill="currentColor"/>
            </svg>
          </div>
          
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 10
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '80px'
            }}>
              <div style={{
                opacity: 0,
                animation: 'fadeInUp 1s ease forwards',
                animationDelay: '0.2s'
              }}>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #b35b6b 0%, #8b4553 50%, #d4a574 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '24px',
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 4s ease-in-out infinite, fadeInUp 1s ease forwards'
                }}>
                  Comprehensive Event Solutions
                </h2>
              </div>
              
              <div style={{
                opacity: 0,
                animation: 'fadeInUp 1s ease forwards',
                animationDelay: '0.4s'
              }}>
                <p style={{
                  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                  color: '#6b7280',
                  maxWidth: '800px',
                  margin: '0 auto',
                  lineHeight: '1.7'
                }}>
                  Every service we offer is designed to exceed expectations and create moments 
                  that will be treasured for a lifetime. Let us handle every detail while you enjoy your special day.
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
              gap: '40px',
              justifyItems: 'center',
              marginBottom: '80px'
            }}>
              {services.map((service, index) => (
                <div key={index} style={{
                  animationDelay: `${0.6 + index * 0.15}s`
                }}>
                  <EnhancedServiceCard {...service} />
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div style={{
              textAlign: 'center',
              opacity: 0,
              animation: 'fadeInUp 1s ease forwards',
              animationDelay: '1.2s'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                padding: '60px 40px',
                borderRadius: '32px',
                border: '1px solid rgba(179, 91, 107, 0.1)',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '20px'
                }}>
                  Ready to Plan Your Perfect Event?
                </h3>
                <p style={{
                  fontSize: '1.25rem',
                  color: '#6b7280',
                  marginBottom: '40px',
                  lineHeight: '1.6'
                }}>
                  Let's discuss your vision and create something extraordinary together. 
                  Your dream celebration is just one conversation away.
                </p>
                
                <div style={{
                  display: 'flex',
                  gap: '24px',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <button 
                    style={{
                      background: 'linear-gradient(135deg, #b35b6b 0%, #8b4553 100%)',
                      color: 'white',
                      padding: '18px 40px',
                      borderRadius: '50px',
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: 'scale(1)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-3px) scale(1.05)';
                      e.target.style.boxShadow = '0 15px 35px rgba(179, 91, 107, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Get Free Consultation
                  </button>

                  <button 
                    style={{
                      background: 'transparent',
                      color: '#b35b6b',
                      padding: '18px 40px',
                      borderRadius: '50px',
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      border: '2px solid #b35b6b',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: 'scale(1)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#b35b6b';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#b35b6b';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    View Our Portfolio
                  </button>
                </div>
              </div>
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