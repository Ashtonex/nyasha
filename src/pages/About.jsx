/* =========================
src/pages/About.jsx
- includes the Calendar + booking flow that writes to Firestore.
========================= */
import React, { useState, useEffect, useRef } from 'react'
//import Calendar from '../components/Calendar'
import BookingModal from '../components/BookingModal'
import { db } from '../firebase/firebaseConfig'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

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
      }}>Our Story</h2>
      <p style={{
        color: '#6b7280',
        fontSize: '1.125rem'
      }}>Loading our journey...</p>
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
const AboutHeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section style={{
      background: `
        linear-gradient(135deg, rgba(179, 91, 107, 0.9) 0%, rgba(139, 69, 83, 0.9) 100%),
        radial-gradient(circle at 30% 70%, rgba(255, 182, 193, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 70% 30%, rgba(255, 218, 185, 0.2) 0%, transparent 50%)
      `,
      minHeight: '60vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Floating Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '60px',
        left: '60px',
        transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
        animation: 'float 8s ease-in-out infinite',
        transition: 'transform 0.1s ease-out'
      }}>
        <svg width="60" height="60" viewBox="0 0 60 60" style={{ color: 'white', opacity: 0.15 }}>
          <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M15 30 Q30 15 45 30 Q30 45 15 30" fill="currentColor" opacity="0.3"/>
        </svg>
      </div>

      <div style={{
        position: 'absolute',
        top: '80px',
        right: '80px',
        transform: `translate(${mousePosition.x * -0.4}px, ${mousePosition.y * -0.4}px)`,
        animation: 'float 6s ease-in-out infinite',
        animationDelay: '-2s',
        transition: 'transform 0.1s ease-out'
      }}>
        <svg width="80" height="80" viewBox="0 0 80 80" style={{ color: 'white', opacity: 0.1 }}>
          <path d="M40 10 L50 30 L70 25 L60 45 L80 50 L60 55 L70 75 L50 70 L40 90 L30 70 L10 75 L20 55 L0 50 L20 45 L10 25 L30 30 Z" fill="currentColor"/>
        </svg>
      </div>

      <div style={{
        textAlign: 'center',
        color: 'white',
        zIndex: 10,
        maxWidth: '800px',
        padding: '0 40px'
      }}>
        <div style={{
          opacity: 0,
          transform: 'translateY(30px)',
          animation: 'fadeInUp 1s ease forwards',
          animationDelay: '0.2s'
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3rem, 6vw, 4.5rem)',
            fontWeight: 'bold',
            marginBottom: '24px',
            lineHeight: '1.1'
          }}>
            Our Story of
            <span style={{
              color: '#fef3c7',
              display: 'block'
            }}>
              Elegant Celebrations
            </span>
          </h1>
        </div>
        
        <div style={{
          opacity: 0,
          transform: 'translateY(30px)',
          animation: 'fadeInUp 1s ease forwards',
          animationDelay: '0.4s'
        }}>
          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
            opacity: 0.9,
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Over a decade of creating unforgettable moments across Zimbabwe
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(1deg); }
          66% { transform: translateY(-8px) rotate(-0.5deg); }
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

// Stats Component
const StatsSection = () => {
  const stats = [
    { number: '10+', label: 'Years Experience', icon: '🏆' },
    { number: '500+', label: 'Events Planned', icon: '🎉' },
    { number: '100%', label: 'Client Satisfaction', icon: '💖' },
    { number: '50+', label: 'Vendor Partners', icon: '🤝' }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '32px',
      margin: '80px 0',
      padding: '0 20px'
    }}>
      {stats.map((stat, index) => (
        <div key={index} style={{
          textAlign: 'center',
          padding: '40px 20px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(179, 91, 107, 0.1)',
          border: '1px solid rgba(179, 91, 107, 0.1)',
          opacity: 0,
          transform: 'translateY(30px)',
          animation: 'fadeInUp 0.8s ease forwards',
          animationDelay: `${0.6 + index * 0.1}s`,
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-10px)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(179, 91, 107, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(179, 91, 107, 0.1)';
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '16px'
          }}>
            {stat.icon}
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#b35b6b',
            marginBottom: '8px',
            fontFamily: "'Playfair Display', serif"
          }}>
            {stat.number}
          </div>
          <div style={{
            color: '#6b7280',
            fontSize: '1.125rem',
            fontWeight: '500'
          }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

// Enhanced About Content Component
const AboutContent = ({ onBookingClick }) => {
  const imageRef = useRef(null);

  const handleBookingClick = (e) => {
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
    
    if (onBookingClick) onBookingClick();
  };

  return (
    <div style={{
      display: 'flex',
      gap: '60px',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 40px'
    }}>
      <div style={{
        opacity: 0,
        transform: 'translateX(-50px)',
        animation: 'slideInLeft 1s ease forwards',
        animationDelay: '0.3s'
      }}>
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px',
          boxShadow: '0 25px 50px rgba(179, 91, 107, 0.2)'
        }}>
          <img 
            ref={imageRef}
            src="/images/about.jpg" 
            alt="about" 
            style={{ 
              width: '400px',
              height: '500px',
              objectFit: 'cover',
              borderRadius: '24px',
              transition: 'transform 0.5s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(179, 91, 107, 0.1) 0%, transparent 50%)',
            borderRadius: '24px'
          }}></div>
        </div>
      </div>

      <div style={{
        maxWidth: '600px',
        opacity: 0,
        transform: 'translateX(50px)',
        animation: 'slideInRight 1s ease forwards',
        animationDelay: '0.5s'
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #b35b6b 0%, #8b4553 50%, #d4a574 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '32px',
          lineHeight: '1.2'
        }}>
          About Mountview Events
        </h2>

        <div style={{
          marginBottom: '32px'
        }}>
          <p style={{
            color: '#374151',
            lineHeight: '1.8',
            fontSize: '1.25rem',
            marginBottom: '24px',
            fontWeight: '400'
          }}>
            Mountview Events brings over a decade of experience in wedding and events planning across Zimbabwe. 
            Our specialties are <span style={{ color: '#b35b6b', fontWeight: '600' }}>decor</span>, 
            <span style={{ color: '#b35b6b', fontWeight: '600' }}> customized catering</span>, and 
            <span style={{ color: '#b35b6b', fontWeight: '600' }}> day-of coordination</span>.
          </p>
          
          <p style={{
            color: '#374151',
            lineHeight: '1.8',
            fontSize: '1.25rem',
            marginBottom: '24px'
          }}>
            We focus on detail, hospitality, and making your event feel personal and effortless. 
            Every celebration we craft tells a unique story of love, joy, and unforgettable memories.
          </p>

          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid #f59e0b',
            marginBottom: '32px'
          }}>
            <p style={{
              color: '#92400e',
              fontSize: '1.125rem',
              fontWeight: '500',
              margin: 0,
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ marginRight: '12px', fontSize: '1.5rem' }}>💡</span>
              We do not provide photography or music. For those, we gladly recommend trusted partners.
            </p>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <button 
            style={{
              background: 'linear-gradient(135deg, #b35b6b 0%, #8b4553 100%)',
              color: 'white',
              padding: '16px 32px',
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
            onClick={handleBookingClick}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 15px 35px rgba(179, 91, 107, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Book Consultation
          </button>

          <button 
            style={{
              background: 'transparent',
              color: '#b35b6b',
              padding: '16px 32px',
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
            View Portfolio
          </button>
        </div>
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

export default function About(){
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDayBookings, setSelectedDayBookings] = useState([])

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleRequestBooking = (dateStr, dayBookings) => {
    setSelectedDate(dateStr)
    setSelectedDayBookings(dayBookings)
    setModalOpen(true)
  }

  const handleSubmitBooking = async ({ name, guests }) => {
    if(!selectedDate) return
    try{
      const ref = doc(db, 'bookings', selectedDate)
      const snap = await getDoc(ref)
      if(snap.exists()){
        const data = snap.data()
        const bookings = data.bookings || []
        // enforce rules locally before writing
        if(bookings.length >= 2) {
          // Custom notification instead of alert
          const notification = document.createElement('div');
          notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
          `;
          notification.textContent = 'That date already has 2 bookings';
          document.body.appendChild(notification);
          setTimeout(() => notification.remove(), 3000);
          return;
        }
        if(bookings.length === 1 && bookings[0].guests >= 30) {
          const notification = document.createElement('div');
          notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
          `;
          notification.textContent = 'That date is already reserved by a large booking';
          document.body.appendChild(notification);
          setTimeout(() => notification.remove(), 3000);
          return;
        }
        bookings.push({ name, guests })
        await setDoc(ref, { bookings })
      }else{
        await setDoc(ref, { bookings:[{ name, guests }] })
      }
      
      // Success notification
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
      `;
      notification.textContent = 'Booking confirmed — we will contact you soon';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 4000);
      
    }catch(err){
      console.error(err);
      
      // Error notification
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
      `;
      notification.textContent = 'Could not save booking — try again later';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    }finally{
      setModalOpen(false)
    }
  }

  return (
    <div>
      <LoadingScreen isVisible={isLoading} />
      
      <div style={{ 
        opacity: isLoading ? 0 : 1, 
        transition: 'opacity 1s ease',
        fontFamily: "'Inter', sans-serif"
      }}>
        <AboutHeroSection />
        
        <section style={{
          padding: '120px 40px',
          background: 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 50%, #ffffff 100%)',
          position: 'relative'
        }}>
          {/* Background Decoration */}
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            opacity: 0.03,
            transform: 'rotate(15deg)'
          }}>
            <svg width="300" height="300" viewBox="0 0 300 300" style={{ color: '#b35b6b' }}>
              <path d="M150 50 L200 100 L250 75 L225 125 L275 150 L225 175 L250 225 L200 200 L150 250 L100 200 L50 225 L75 175 L25 150 L75 125 L50 75 L100 100 Z" fill="currentColor"/>
            </svg>
          </div>

          <AboutContent onBookingClick={() => setModalOpen(true)} />
          <StatsSection />
        </section>
      </div>

      <BookingModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        date={selectedDate} 
        onSubmit={handleSubmitBooking} 
      />

      <style>{`
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
  )
}