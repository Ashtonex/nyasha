/* =========================
src/components/ServiceCard.jsx
========================= */
import React, { useState } from 'react'

export default function ServiceCard({ image, title, desc }){
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div 
      style={{
        width: '320px',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: isHovered 
          ? '0 25px 50px rgba(236, 72, 153, 0.25), 0 0 0 1px rgba(236, 72, 153, 0.1)' 
          : '0 10px 30px rgba(0, 0, 0, 0.08)',
        background: 'linear-gradient(135deg, #ffffff 0%, #fef7ff 100%)',
        margin: '16px',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered 
          ? `translateY(-12px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg) scale(1.02)` 
          : 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)',
        cursor: 'pointer',
        position: 'relative',
        border: '1px solid rgba(236, 72, 153, 0.1)',
        backdropFilter: 'blur(10px)'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        width: '32px',
        height: '32px',
        background: 'linear-gradient(135deg, #ec4899, #be185d)',
        borderRadius: '50%',
        opacity: isHovered ? 0.8 : 0.4,
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.875rem'
      }}>
        ✨
      </div>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '12px',
        width: '24px',
        height: '24px',
        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
        borderRadius: '50%',
        opacity: isHovered ? 0.7 : 0.3,
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.3) rotate(180deg)' : 'scale(1) rotate(0deg)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem'
      }}>
        💫
      </div>

      {/* Image Section */}
      <div style={{
        height: '200px',
        backgroundImage: `
          linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%),
          url(${image})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s ease',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
      }}>
        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.3))',
          opacity: isHovered ? 1 : 0.7,
          transition: 'opacity 0.3s ease'
        }}></div>

        {/* Floating Hearts */}
        {isHovered && (
          <>
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '15%',
              fontSize: '1.5rem',
              animation: 'floatHeart 2s ease-in-out infinite',
              opacity: 0.6
            }}>
              💕
            </div>
            <div style={{
              position: 'absolute',
              top: '60%',
              right: '20%',
              fontSize: '1.25rem',
              animation: 'floatHeart 2.5s ease-in-out infinite',
              animationDelay: '-1s',
              opacity: 0.5
            }}>
              💖
            </div>
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '70%',
              fontSize: '1rem',
              animation: 'floatHeart 3s ease-in-out infinite',
              animationDelay: '-0.5s',
              opacity: 0.4
            }}>
              💝
            </div>
          </>
        )}

        {/* Service Category Badge */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#ec4899',
          border: '1px solid rgba(236, 72, 153, 0.2)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease'
        }}>
          Premium Service
        </div>
      </div>

      {/* Content Section */}
      <div style={{
        padding: '24px',
        position: 'relative'
      }}>
        {/* Title */}
        <h3 style={{
          margin: '0 0 16px 0',
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.5rem',
          fontWeight: 'bold',
          background: isHovered 
            ? 'linear-gradient(135deg, #ec4899 0%, #be185d 50%, #7c3aed 100%)'
            : 'linear-gradient(135deg, #b35b6b 0%, #8b4553 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          transition: 'all 0.3s ease',
          lineHeight: '1.3',
          transform: isHovered ? 'translateX(8px)' : 'translateX(0)'
        }}>
          {title}
        </h3>

        {/* Description */}
        <p style={{
          margin: '0 0 20px 0',
          color: '#6b7280',
          lineHeight: '1.6',
          fontSize: '1rem',
          fontFamily: "'Inter', sans-serif",
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
        }}>
          {desc}
        </p>

        {/* Action Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '20px'
        }}>
          <button style={{
            background: isHovered 
              ? 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
              : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
            color: isHovered ? 'white' : '#6b7280',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '50px',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isHovered ? 'translateY(-2px) scale(1.05)' : 'scale(1)',
            boxShadow: isHovered 
              ? '0 8px 25px rgba(236, 72, 153, 0.3)' 
              : '0 2px 8px rgba(0, 0, 0, 0.1)',
            fontFamily: "'Inter', sans-serif"
          }}>
            <span style={{ marginRight: '8px' }}>💕</span>
            Learn More
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  fontSize: '1.25rem',
                  color: '#fbbf24',
                  transition: 'all 0.2s ease',
                  transform: isHovered ? 'scale(1.2) rotate(72deg)' : 'scale(1)',
                  transitionDelay: `${star * 0.1}s`
                }}
              >
                ⭐
              </span>
            ))}
          </div>
        </div>

        {/* Price Badge */}
        <div style={{
          position: 'absolute',
          top: '-12px',
          right: '24px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          padding: '8px 20px',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: '700',
          boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
          transform: isHovered ? 'scale(1.1) rotate(-2deg)' : 'scale(1)',
          transition: 'transform 0.3s ease',
          fontFamily: "'Inter', sans-serif"
        }}>
          Starting at $299
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '4px',
        background: isHovered 
          ? 'linear-gradient(90deg, transparent, #ec4899, transparent)'
          : 'transparent',
        borderRadius: '2px',
        transition: 'all 0.3s ease'
      }}></div>

      <style>{`
        @keyframes floatHeart {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-8px) rotate(5deg); 
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-4px) rotate(-3deg); 
            opacity: 1;
          }
          75% { 
            transform: translateY(-12px) rotate(2deg); 
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}