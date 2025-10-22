/* =========================
src/components/BookingModal.jsx
- Modal for booking submission. Uses callback onSubmit({name, guests})
========================= */
import React, { useState, useEffect } from 'react'

export default function BookingModal({ open, onClose, date, onSubmit }){
  const [name, setName] = useState('')
  const [guests, setGuests] = useState(50)
  const [isVisible, setIsVisible] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (open) {
      setTimeout(() => setIsVisible(true), 50)
    } else {
      setIsVisible(false)
    }
  }, [open])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10
    setMousePosition({ x, y })
  }

  const handleSubmit = () => {
    if (!name.trim()) {
      // Custom error notification instead of alert
      const notification = document.createElement('div')
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
      `
      notification.innerHTML = `
        <div style="display: flex; align-items: center;">
          <span style="margin-right: 12px; font-size: 1.5rem;">😔</span>
          Please enter your beautiful name!
          <span style="margin-left: 12px; font-size: 1.5rem;">💔</span>
        </div>
      `
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
      return
    }

    // Add sparkle effect
    const modal = document.querySelector('[data-modal="true"]')
    const sparkles = document.createElement('div')
    sparkles.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 100;
    `
    
    for (let i = 0; i < 30; i++) {
      const sparkle = document.createElement('div')
      sparkle.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: linear-gradient(45deg, #ec4899, #fbbf24);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: sparkleOut 1.5s ease-out forwards;
      `
      sparkles.appendChild(sparkle)
    }
    
    modal.appendChild(sparkles)
    setTimeout(() => sparkles.remove(), 1500)

    onSubmit({ name, guests })
    setName('')
    setGuests(50)
  }

  if (!open) return null

  const overlay = {
    position: 'fixed',
    inset: 0,
    background: `
      linear-gradient(135deg, rgba(236, 72, 153, 0.4) 0%, rgba(124, 58, 237, 0.4) 100%),
      rgba(0, 0, 0, 0.5)
    `,
    backdropFilter: 'blur(20px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    opacity: isVisible ? 1 : 0,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  }

  const modal = {
    background: `
      linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(252, 231, 243, 0.95) 100%)
    `,
    backdropFilter: 'blur(30px)',
    padding: '48px',
    borderRadius: '32px',
    width: '480px',
    maxWidth: '90vw',
    boxShadow: '0 25px 50px rgba(236, 72, 153, 0.3), 0 0 0 1px rgba(236, 72, 153, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    transform: isVisible 
      ? `scale(1) translateY(0) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)` 
      : 'scale(0.8) translateY(50px)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  }

  const inputStyle = (fieldName) => ({
    padding: '18px 24px',
    borderRadius: '16px',
    border: focusedField === fieldName 
      ? '2px solid #ec4899' 
      : '2px solid rgba(179, 91, 107, 0.2)',
    fontSize: '1.125rem',
    fontFamily: "'Inter', sans-serif",
    background: focusedField === fieldName 
      ? 'rgba(255, 255, 255, 1)' 
      : 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    boxShadow: focusedField === fieldName 
      ? '0 0 0 4px rgba(236, 72, 153, 0.1), 0 8px 25px rgba(236, 72, 153, 0.15)' 
      : '0 4px 12px rgba(0, 0, 0, 0.05)',
    transform: focusedField === fieldName ? 'translateY(-2px) scale(1.02)' : 'scale(1)',
    width: '100%'
  })

  return (
    <div style={overlay} onClick={onClose}>
      <div 
        style={modal} 
        onClick={e => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        data-modal="true"
      >
        {/* Floating Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, #ec4899, #be185d)',
          borderRadius: '50%',
          opacity: 0.1,
          animation: 'pulse 4s ease-in-out infinite'
        }}></div>

        <div style={{
          position: 'absolute',
          bottom: '-15px',
          left: '-15px',
          width: '40px',
          height: '40px',
          background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
          borderRadius: '50%',
          opacity: 0.08,
          animation: 'pulse 3s ease-in-out infinite',
          animationDelay: '-1.5s'
        }}></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            transition: 'all 0.3s ease',
            transform: 'scale(1)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#ef4444'
            e.target.style.color = 'white'
            e.target.style.transform = 'scale(1.1) rotate(90deg)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.1)'
            e.target.style.color = '#ef4444'
            e.target.style.transform = 'scale(1) rotate(0deg)'
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '16px',
            animation: 'heartbeat 2s ease-in-out infinite'
          }}>
            💕
          </div>
          <h3 style={{
            marginTop: 0,
            marginBottom: '12px',
            fontFamily: "'Playfair Display', serif",
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #ec4899 0%, #be185d 50%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Book Your Dream Event
          </h3>
          <p style={{
            color: '#6b7280',
            fontSize: '1.125rem',
            margin: 0,
            fontStyle: 'italic'
          }}>
            {date ? `Selected Date: ${date}` : 'Let\'s make it magical!'}
          </p>
        </div>

        {/* Form */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          {/* Name Field */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px',
              fontFamily: "'Inter', sans-serif"
            }}>
              ✨ Your Beautiful Name
            </label>
            <input 
              placeholder='Enter your name here...' 
              value={name} 
              onChange={e => setName(e.target.value)}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              style={inputStyle('name')}
            />
          </div>

          {/* Guests Field */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px',
              fontFamily: "'Inter', sans-serif"
            }}>
              👥 Number of Guests
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type='number' 
                min={1} 
                max={1000} 
                value={guests} 
                onChange={e => setGuests(Number(e.target.value))}
                onFocus={() => setFocusedField('guests')}
                onBlur={() => setFocusedField(null)}
                style={inputStyle('guests')}
              />
              <div style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6b7280',
                fontSize: '0.875rem',
                pointerEvents: 'none'
              }}>
                people
              </div>
            </div>
            <div style={{
              marginTop: '8px',
              fontSize: '0.875rem',
              color: '#6b7280',
              textAlign: 'center'
            }}>
              Perfect for {guests < 25 ? 'intimate gatherings' : guests < 100 ? 'medium celebrations' : 'grand events'} 🎉
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'flex-end',
            marginTop: '20px'
          }}>
            <button 
              onClick={onClose} 
              style={{
                background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                color: '#6b7280',
                border: 'none',
                padding: '16px 28px',
                borderRadius: '16px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'scale(1)',
                fontFamily: "'Inter', sans-serif"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px) scale(1.05)'
                e.target.style.background = 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)'
                e.target.style.boxShadow = '0 8px 25px rgba(107, 114, 128, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)'
                e.target.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                e.target.style.boxShadow = 'none'
              }}
            >
              <span style={{ marginRight: '8px' }}>😔</span>
              Cancel
            </button>

            <button 
              onClick={handleSubmit}
              style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #be185d 50%, #7c3aed 100%)',
                color: 'white',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '16px',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'scale(1)',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: "'Inter', sans-serif"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.05)'
                e.target.style.boxShadow = '0 15px 35px rgba(236, 72, 153, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)'
                e.target.style.boxShadow = 'none'
              }}
            >
              <span style={{ marginRight: '12px', fontSize: '1.25rem' }}>💍</span>
              Confirm Booking
              <span style={{ marginLeft: '12px', fontSize: '1.25rem' }}>✨</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(179, 91, 107, 0.1)',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              <span style={{ marginRight: '8px', fontSize: '1rem' }}>🔒</span>
              Secure Booking
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              <span style={{ marginRight: '8px', fontSize: '1rem' }}>💖</span>
              No Hidden Fees
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              <span style={{ marginRight: '8px', fontSize: '1rem' }}>⚡</span>
              Instant Confirmation
            </div>
          </div>
        </div>

        <style>{`
          @keyframes sparkleOut {
            0% {
              transform: scale(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: scale(3) rotate(180deg);
              opacity: 0;
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
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.1; }
            50% { transform: scale(1.1); opacity: 0.15; }
          }
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.2); }
            50% { transform: scale(1.1); }
            75% { transform: scale(1.25); }
          }
        `}</style>
      </div>
    </div>
  )
}