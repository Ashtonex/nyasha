/* =========================
src/components/Footer.jsx
========================= */
import React, { useState, useEffect } from 'react'

export default function Footer(){
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight - 100);
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll(); // Check initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    
    // Create sparkle effect
    const button = e.target.querySelector('button');
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
    
    for (let i = 0; i < 15; i++) {
      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: linear-gradient(45deg, #ec4899, #fbbf24);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: sparkleOut 1s ease-out forwards;
      `;
      sparkles.appendChild(sparkle);
    }
    
    button.appendChild(sparkles);
    setTimeout(() => sparkles.remove(), 1000);

    // Show success message
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 20px 28px;
      border-radius: 16px;
      box-shadow: 0 15px 35px rgba(16, 185, 129, 0.4);
      z-index: 10000;
      animation: slideInRight 0.5s ease;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
    `;
    notification.innerHTML = `
      <div style="display: flex; align-items: center;">
        <span style="margin-right: 12px; font-size: 1.5rem;">💕</span>
        Thank you for subscribing! We'll keep you updated on magical events!
        <span style="margin-left: 12px; font-size: 1.5rem;">✨</span>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);

    setEmail('');
  };

  const socialIcons = [
    { name: 'Facebook', icon: '📘', color: '#1877f2', url: '#' },
    { name: 'Instagram', icon: '📷', color: '#e4405f', url: '#' },
    { name: 'Twitter', icon: '🐦', color: '#1da1f2', url: '#' },
    { name: 'Pinterest', icon: '📌', color: '#bd081c', url: '#' },
    { name: 'LinkedIn', icon: '💼', color: '#0077b5', url: '#' }
  ];

  return (
    <footer style={{
      marginTop: '80px',
      background: `
        linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #f3e8ff 50%, #ede9fe 75%, #fdf2f8 100%),
        radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.05) 0%, transparent 50%)
      `,
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(179, 91, 107, 0.1)'
    }}>
      {/* Floating Background Elements */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '5%',
        transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
        transition: 'transform 0.2s ease-out',
        opacity: 0.08,
        pointerEvents: 'none'
      }}>
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ color: '#ec4899' }}>
          <path d="M60 20 C45 5, 15 5, 15 35 C15 50, 60 80, 60 80 C60 80, 105 50, 105 35 C105 5, 75 5, 60 20 Z" fill="currentColor"/>
        </svg>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '30px',
        right: '8%',
        transform: `translate(${mousePosition.x * -0.4}px, ${mousePosition.y * -0.4}px)`,
        transition: 'transform 0.2s ease-out',
        opacity: 0.06,
        pointerEvents: 'none'
      }}>
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ color: '#7c3aed' }}>
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3"/>
          <path d="M25 50 Q50 25 75 50 Q50 75 25 50" fill="currentColor" opacity="0.3"/>
        </svg>
      </div>

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
        transition: 'transform 0.2s ease-out',
        opacity: 0.04,
        pointerEvents: 'none'
      }}>
        <svg width="200" height="200" viewBox="0 0 200 200" style={{ color: '#d97706' }}>
          <path d="M100 30 L120 70 L160 65 L140 105 L180 120 L140 135 L160 175 L120 170 L100 210 L80 170 L40 175 L60 135 L20 120 L60 105 L40 65 L80 70 Z" fill="currentColor"/>
        </svg>
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '80px 40px 40px'
      }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '60px',
          marginBottom: '60px'
        }}>
          {/* Company Info */}
          <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
            transitionDelay: '0.1s'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                fontSize: '1.5rem'
              }}>
                🎉
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.75rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #ec4899 0%, #be185d 50%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>
                Mountview Events
              </h3>
            </div>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.7',
              fontSize: '1.125rem',
              marginBottom: '24px'
            }}>
              Creating magical moments and unforgettable experiences. From intimate gatherings to grand celebrations, we bring your vision to life with love and attention to detail.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              {socialIcons.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'white',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    fontSize: '1.25rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '2px solid rgba(179, 91, 107, 0.1)',
                    transform: 'scale(1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-4px) scale(1.1)';
                    e.target.style.background = social.color;
                    e.target.style.boxShadow = `0 12px 25px ${social.color}40`;
                    e.target.style.borderColor = social.color;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.background = 'white';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                    e.target.style.borderColor = 'rgba(179, 91, 107, 0.1)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
            transitionDelay: '0.2s'
          }}>
            <h4 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '24px'
            }}>
              Quick Links
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {[
                { name: '🏠 Home', url: '/' },
                { name: '💫 About Us', url: '/about' },
                { name: '✨ Our Services', url: '/services' },
                { name: '💕 Contact', url: '/contact' },
                { name: '📸 Portfolio', url: '#' },
                { name: '📝 Blog', url: '#' }
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    fontSize: '1.125rem',
                    padding: '8px 0',
                    transition: 'all 0.3s ease',
                    borderRadius: '8px',
                    paddingLeft: '12px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#ec4899';
                    e.target.style.paddingLeft = '20px';
                    e.target.style.background = 'rgba(236, 72, 153, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#6b7280';
                    e.target.style.paddingLeft = '12px';
                    e.target.style.background = 'transparent';
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
            transitionDelay: '0.3s'
          }}>
            <h4 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '24px'
            }}>
              Our Services
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {[
                '🎨 Event Decor & Styling',
                '🍽️ Catering & Menu Planning',
                '📋 Full Event Coordination',
                '💍 Wedding Planning',
                '🎂 Birthday Celebrations',
                '🏢 Corporate Events'
              ].map((service, index) => (
                <div
                  key={index}
                  style={{
                    color: '#6b7280',
                    fontSize: '1.125rem',
                    padding: '8px 12px',
                    transition: 'all 0.3s ease',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#7c3aed';
                    e.target.style.background = 'rgba(124, 58, 237, 0.05)';
                    e.target.style.transform = 'translateX(8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#6b7280';
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateX(0)';
                  }}
                >
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
            transitionDelay: '0.4s'
          }}>
            <h4 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '16px'
            }}>
              Stay Updated 💌
            </h4>
            <p style={{
              color: '#6b7280',
              fontSize: '1.125rem',
              marginBottom: '24px',
              lineHeight: '1.6'
            }}>
              Subscribe to our newsletter for event planning tips, inspiration, and exclusive offers!
            </p>
            <form onSubmit={handleNewsletterSubmit} style={{
              position: 'relative'
            }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address ✨"
                required
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  border: '2px solid rgba(179, 91, 107, 0.2)',
                  fontSize: '1.125rem',
                  marginBottom: '16px',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  fontFamily: "'Inter', sans-serif"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ec4899';
                  e.target.style.boxShadow = '0 0 0 4px rgba(236, 72, 153, 0.1)';
                  e.target.style.background = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(179, 91, 107, 0.2)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                }}
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  background: 'linear-gradient(135deg, #ec4899 0%, #be185d 50%, #7c3aed 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: 'scale(1)',
                  fontFamily: "'Inter', sans-serif"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px) scale(1.02)';
                  e.target.style.boxShadow = '0 12px 30px rgba(236, 72, 153, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                💕 Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(252, 231, 243, 0.8) 100%)',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '40px',
          border: '1px solid rgba(179, 91, 107, 0.1)',
          backdropFilter: 'blur(10px)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
          transitionDelay: '0.5s'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                fontSize: '1.25rem'
              }}>
                📞
              </div>
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  marginBottom: '4px'
                }}>
                  Call Us
                </div>
                <a
                  href="tel:+263771234567"
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#10b981'}
                  onMouseLeave={(e) => e.target.style.color = '#1f2937'}
                >
                  +263 77 123 4567
                </a>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                fontSize: '1.25rem'
              }}>
                📧
              </div>
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  marginBottom: '4px'
                }}>
                  Email Us
                </div>
                <a
                  href="mailto:hello@mountview.events"
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                  onMouseLeave={(e) => e.target.style.color = '#1f2937'}
                >
                  hello@mountview.events
                </a>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                fontSize: '1.25rem'
              }}>
                📍
              </div>
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  marginBottom: '4px'
                }}>
                  Visit Us
                </div>
                <div style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>
                  Harare, Zimbabwe
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(179, 91, 107, 0.1)',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
          transitionDelay: '0.6s'
        }}>
          <div style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            fontWeight: '500'
          }}>
            © {new Date().getFullYear()} Mountview Events — Creating Magical Moments ✨
          </div>
          <div style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, index) => (
              <a
                key={index}
                href="#"
                style={{
                  color: '#6b7280',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ec4899'}
                onMouseLeave={(e) => e.target.style.color = '#6b7280'}
              >
                {link}
              </a>
            ))}
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
            transform: scale(2) rotate(180deg);
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
      `}</style>
    </footer>
  )
}