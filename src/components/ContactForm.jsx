/* =========================
src/components/ContactForm.jsx
- Simple client-side form that saves to Firestore or emails via your chosen service.
========================= */
import React, { useState, useRef } from 'react'
import { db } from '../firebase/firebaseConfig'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function ContactForm(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
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
    
    for (let i = 0; i < 25; i++) {
      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: linear-gradient(45deg, #ec4899, #fbbf24);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: sparkleOut 1.2s ease-out forwards;
      `;
      sparkles.appendChild(sparkle);
    }
    
    form.appendChild(sparkles);
    setTimeout(() => sparkles.remove(), 1200);

    try{
      await addDoc(collection(db, 'contacts'), { 
        name, 
        email, 
        message, 
        createdAt: serverTimestamp() 
      })
      
      // Custom success notification
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
          <div style="font-size: 1.125rem; margin-bottom: 4px;">Message Sent Successfully!</div>
          <div style="font-size: 0.95rem; opacity: 0.9;">We'll get back to you soon to plan your magical event!</div>
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 6000);

      setName(''); 
      setEmail(''); 
      setMessage('')
    }catch(err){
      console.error(err);
      
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
          <span style="margin-right: 12px; font-size: 1.5rem;">😔</span>
          Could not send message — please try again later
          <span style="margin-left: 12px; font-size: 1.5rem;">💔</span>
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 4000);
    }finally{ 
      setLoading(false) 
    }
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
      : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    boxShadow: focusedField === fieldName 
      ? '0 0 0 4px rgba(236, 72, 153, 0.1), 0 8px 25px rgba(236, 72, 153, 0.15)' 
      : '0 4px 12px rgba(0, 0, 0, 0.05)',
    transform: focusedField === fieldName ? 'translateY(-2px) scale(1.02)' : 'scale(1)',
    width: '100%'
  });

  const labelStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
    display: 'block',
    fontFamily: "'Inter', sans-serif"
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
      overflow: 'hidden',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        right: '-30px',
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #ec4899, #be185d)',
        borderRadius: '50%',
        opacity: 0.1,
        animation: 'pulse 4s ease-in-out infinite'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '-20px',
        left: '-20px',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
        borderRadius: '50%',
        opacity: 0.08,
        animation: 'pulse 3s ease-in-out infinite',
        animationDelay: '-1.5s'
      }}></div>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '2.25rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #ec4899 0%, #be185d 50%, #7c3aed 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '12px',
          margin: '0 0 12px 0'
        }}>
          Let's Plan Your Dream Event 💕
        </h3>
        <p style={{
          color: '#6b7280',
          fontSize: '1.125rem',
          fontStyle: 'italic',
          margin: 0
        }}>
          Tell us about your vision and we'll make it magical
        </p>
      </div>

      <form 
        ref={formRef}
        onSubmit={handleSubmit} 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '28px',
          position: 'relative'
        }}
      >
        {/* Name Field */}
        <div>
          <label htmlFor="name" style={labelStyle}>
            ✨ Your Beautiful Name
          </label>
          <input 
            id="name"
            required 
            value={name} 
            onChange={e => setName(e.target.value)}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            placeholder='Enter your name here...' 
            style={inputStyle('name')}
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" style={labelStyle}>
            💌 Email Address
          </label>
          <input 
            id="email"
            required 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            placeholder='your.email@example.com' 
            type='email' 
            style={inputStyle('email')}
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" style={labelStyle}>
            💭 Tell Us About Your Dream Event
          </label>
          <textarea 
            id="message"
            required 
            value={message} 
            onChange={e => setMessage(e.target.value)}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            placeholder='Describe your perfect event... What makes your celebration special? Include details about date, guest count, style preferences, and any special requests!' 
            rows={6} 
            style={{
              ...inputStyle('message'),
              resize: 'vertical',
              minHeight: '140px',
              lineHeight: '1.6'
            }}
          />
        </div>

        {/* Submit Button */}
        <button 
          type='submit' 
          disabled={loading} 
          style={{
            background: loading 
              ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
              : 'linear-gradient(135deg, #ec4899 0%, #be185d 50%, #7c3aed 100%)',
            color: 'white',
            border: 'none',
            padding: '20px 32px',
            borderRadius: '16px',
            fontWeight: '700',
            fontSize: '1.25rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'scale(1)',
            fontFamily: "'Inter', sans-serif",
            marginTop: '12px'
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
              Sending Your Message...
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ marginRight: '12px', fontSize: '1.5rem' }}>💕</span>
              Send Message
              <span style={{ marginLeft: '12px', fontSize: '1.5rem' }}>✨</span>
            </span>
          )}
        </button>

        {/* Trust Indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px',
          marginTop: '20px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>
            <span style={{ marginRight: '8px', fontSize: '1rem' }}>🔒</span>
            Secure & Private
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>
            <span style={{ marginRight: '8px', fontSize: '1rem' }}>⚡</span>
            Quick Response
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>
            <span style={{ marginRight: '8px', fontSize: '1rem' }}>💖</span>
            Free Consultation
          </div>
        </div>
      </form>

      <style>{`
        @keyframes sparkleOut {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(2.5) rotate(180deg);
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
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}