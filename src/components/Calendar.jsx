/* =========================
src/components/Calendar.jsx
- Simple monthly calendar. Uses Firestore to fetch bookings and onSnapshot for realtime updates.
========================= */
import React, { useEffect, useState, useMemo } from 'react'
import { db } from '../firebase/firebaseConfig'
import { collection, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'

function startOfMonth(d){ return new Date(d.getFullYear(), d.getMonth(), 1) }
function endOfMonth(d){ return new Date(d.getFullYear(), d.getMonth()+1, 0) }

export default function Calendar({ onRequestBooking }) {
  const [current, setCurrent] = useState(new Date())
  const [bookingsMap, setBookingsMap] = useState({})
  const [hoveredDate, setHoveredDate] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Entrance animation
    setTimeout(() => setIsVisible(true), 200)

    // subscribe to entire bookings collection (small scale). For production, query by month.
    const collRef = collection(db, 'bookings')
    const unsub = onSnapshot(collRef, (snap) => {
      const map = {}
      snap.docs.forEach(d => { const data = d.data(); map[d.id] = data })
      setBookingsMap(map)
    }, (err) => { console.error('bookings listen err', err) })

    return () => unsub()
  }, [])

  const firstDay = useMemo(() => startOfMonth(current), [current])
  const lastDay = useMemo(() => endOfMonth(current), [current])

  const days = []
  const startWeekday = new Date(firstDay).getDay() // 0-6
  const totalDays = lastDay.getDate()

  for (let i = 0; i < startWeekday; i++) days.push(null)
  for (let d = 1; d <= totalDays; d++) days.push(new Date(current.getFullYear(), current.getMonth(), d))

  const monthLabel = current.toLocaleString(undefined, { month: 'long', year: 'numeric' })

  const isFull = (dateStr) => {
    const docData = bookingsMap[dateStr]
    if (!docData || !Array.isArray(docData.bookings)) return false
    const bookings = docData.bookings
    if (bookings.length >= 2) return true 
    if (bookings.length === 1 && bookings[0].guests >= 30) return true
    return false 
  }

  const isToday = (date) => {
    const today = new Date()
    return date && 
           date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear()
  }

  const isWeekend = (date) => {
    return date && (date.getDay() === 0 || date.getDay() === 6)
  }

  const handleDateClick = (dateStr, isFull) => {
    if (isFull) {
      // Show full date notification
      const notification = document.createElement('div')
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        color: white;
        padding: 20px 28px;
        border-radius: 16px;
        box-shadow: 0 15px 35px rgba(245, 158, 11, 0.4);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
      `
      notification.innerHTML = `
        <div style="display: flex; align-items: center;">
          <span style="margin-right: 12px; font-size: 1.5rem;">😔</span>
          This date is fully booked!
          <span style="margin-left: 12px; font-size: 1.5rem;">📅</span>
        </div>
      `
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
      return
    }
    onRequestBooking(dateStr)
  }

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '40px auto',
      padding: '48px',
      background: `
        linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(252, 231, 243, 0.95) 100%)
      `,
      borderRadius: '32px',
      boxShadow: '0 25px 50px rgba(236, 72, 153, 0.15)',
      border: '1px solid rgba(236, 72, 153, 0.1)',
      backdropFilter: 'blur(20px)',
      position: 'relative',
      overflow: 'hidden',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '120px',
        height: '120px',
        background: 'linear-gradient(135deg, #ec4899, #be185d)',
        borderRadius: '50%',
        opacity: 0.08,
        animation: 'pulse 6s ease-in-out infinite'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '-30px',
        left: '-30px',
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
        borderRadius: '50%',
        opacity: 0.06,
        animation: 'pulse 4s ease-in-out infinite',
        animationDelay: '-2s'
      }}></div>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '2.5rem',
            marginRight: '16px',
            animation: 'heartbeat 3s ease-in-out infinite'
          }}>
            📅
          </div>
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ec4899 0%, #be185d 50%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 4px 0'
            }}>
              {monthLabel}
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.125rem',
              margin: 0,
              fontStyle: 'italic'
            }}>
              Choose your perfect date ✨
            </p>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          <button 
            onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1))} 
            style={{
              padding: '12px 20px',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
              color: '#374151',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'scale(1)',
              fontFamily: "'Inter', sans-serif"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px) scale(1.05)'
              e.target.style.background = 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
              e.target.style.color = 'white'
              e.target.style.boxShadow = '0 8px 25px rgba(236, 72, 153, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)'
              e.target.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
              e.target.style.color = '#374151'
              e.target.style.boxShadow = 'none'
            }}
          >
            <span style={{ marginRight: '8px' }}>←</span>
            Previous
          </button>

          <button 
            onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1))} 
            style={{
              padding: '12px 20px',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
              color: '#374151',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'scale(1)',
              fontFamily: "'Inter', sans-serif"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px) scale(1.05)'
              e.target.style.background = 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
              e.target.style.color = 'white'
              e.target.style.boxShadow = '0 8px 25px rgba(236, 72, 153, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)'
              e.target.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
              e.target.style.color = '#374151'
              e.target.style.boxShadow = 'none'
            }}
          >
            Next
            <span style={{ marginLeft: '8px' }}>→</span>
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '12px',
        textAlign: 'center',
        marginBottom: '16px'
      }}>
        {[
          { day: 'Sun', emoji: '☀️' },
          { day: 'Mon', emoji: '💼' },
          { day: 'Tue', emoji: '✨' },
          { day: 'Wed', emoji: '💕' },
          { day: 'Thu', emoji: '🌟' },
          { day: 'Fri', emoji: '🎉' },
          { day: 'Sat', emoji: '💖' }
        ].map(({ day, emoji }) => (
          <div 
            key={day} 
            style={{
              fontWeight: '700',
              fontSize: '1rem',
              color: '#374151',
              padding: '12px 8px',
              background: 'rgba(236, 72, 153, 0.05)',
              borderRadius: '12px',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            <div style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{emoji}</div>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '12px'
      }}>
        {days.map((d, idx) => {
          if (!d) return (
            <div 
              key={idx} 
              style={{
                padding: '16px',
                minHeight: '100px',
                background: 'rgba(243, 244, 246, 0.5)',
                borderRadius: '16px',
                border: '1px solid rgba(229, 231, 235, 0.5)'
              }}
            ></div>
          )

          const dateStr = d.toISOString().slice(0, 10)
          const full = isFull(dateStr)
          const dayBookings = bookingsMap[dateStr]?.bookings || []
          const today = isToday(d)
          const weekend = isWeekend(d)
          const hovered = hoveredDate === dateStr

          return (
            <div
              key={idx}
              onClick={() => handleDateClick(dateStr, full)}
              onMouseEnter={() => setHoveredDate(dateStr)}
              onMouseLeave={() => setHoveredDate(null)}
              style={{
                padding: '16px',
                minHeight: '100px',
                background: full 
                  ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
                  : today
                  ? 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'
                  : weekend
                  ? 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)'
                  : hovered
                  ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                  : 'rgba(255, 255, 255, 0.8)',
                borderRadius: '16px',
                border: today 
                  ? '2px solid #3b82f6'
                  : full
                  ? '2px solid #f59e0b'
                  : hovered && !full
                  ? '2px solid #10b981'
                  : '1px solid rgba(229, 231, 235, 0.3)',
                cursor: full ? 'not-allowed' : 'pointer',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hovered && !full ? 'translateY(-4px) scale(1.02)' : 'scale(1)',
                boxShadow: hovered && !full 
                  ? '0 12px 30px rgba(16, 185, 129, 0.2)'
                  : full
                  ? '0 8px 25px rgba(245, 158, 11, 0.2)'
                  : today
                  ? '0 8px 25px rgba(59, 130, 246, 0.2)'
                  : '0 4px 12px rgba(0, 0, 0, 0.05)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Date Number */}
              <div style={{
                fontWeight: '700',
                fontSize: '1.25rem',
                color: full ? '#d97706' : today ? '#1d4ed8' : '#374151',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                {d.getDate()}
                {today && <span style={{ fontSize: '1rem' }}>🌟</span>}
                {weekend && !today && <span style={{ fontSize: '1rem' }}>💕</span>}
              </div>

              {/* Bookings */}
              {dayBookings.map((booking, i) => (
                <div 
                  key={i} 
                  style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginTop: '6px',
                    padding: '4px 8px',
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '8px',
                    border: '1px solid rgba(236, 72, 153, 0.1)',
                    fontWeight: '500'
                  }}
                >
                  <span style={{ marginRight: '4px' }}>👥</span>
                  {booking.guests} guests
                </div>
              ))}

              {/* Full Overlay */}
              {full && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(245, 158, 11, 0.9)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  <span style={{ marginRight: '6px' }}>🔒</span>
                  FULLY BOOKED
                </div>
              )}

              {/* Available Indicator */}
              {!full && hovered && (
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  animation: 'pulse 2s ease-in-out infinite'
                }}>
                  ✨ Available
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{
        marginTop: '32px',
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          <div style={{
            width: '16px',
            height: '16px',
            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
            borderRadius: '4px',
            marginRight: '8px',
            border: '2px solid #3b82f6'
          }}></div>
          Today 🌟
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          <div style={{
            width: '16px',
            height: '16px',
            background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
            borderRadius: '4px',
            marginRight: '8px'
          }}></div>
          Weekend 💕
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          <div style={{
            width: '16px',
            height: '16px',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderRadius: '4px',
            marginRight: '8px',
            border: '2px solid #f59e0b'
          }}></div>
          Fully Booked 🔒
        </div>
      </div>

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
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1.05); }
          75% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  )
}