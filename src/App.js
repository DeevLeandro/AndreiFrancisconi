import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: ''
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);
  const sectionRefs = useRef([]);
  const mobileMenuRef = useRef(null);
  const touchStartX = useRef(0);

  // Efeito de scroll para header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer para animações
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Fechar menu mobile ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMobileMenu && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };

    if (showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu]);

  // Detectar gesto de swipe para fechar menu mobile
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (!showMobileMenu) return;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      if (!showMobileMenu) return;
      const touchX = e.touches[0].clientX;
      const diff = touchStartX.current - touchX;
      
      // Se o usuário arrastar da direita para a esquerda (fechar menu)
      if (diff > 50) {
        setShowMobileMenu(false);
      }
    };

    if (showMobileMenu) {
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [showMobileMenu]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Olá! Meu nome é ${formData.name}. Acabei de me inscrever para a Sessão de Diagnóstico. Meu email é: ${formData.email}`;
    const encodedMessage = encodeURIComponent(message);
    const empresaWhatsapp = "54981664862";
    
    window.open(`https://wa.me/55${empresaWhatsapp}?text=${encodedMessage}`, '_blank');
    setShowModal(false);
    setFormData({ email: '', phone: '', name: '' });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    setFormData(prev => ({ ...prev, phone: value }));
  };

  // Função para tocar/pausar vídeo
  const handleVideoPlay = (videoId) => {
    if (playingVideo === videoId) {
      setPlayingVideo(null);
    } else {
      setPlayingVideo(videoId);
    }
  };

  // Função para scroll suave
  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setShowMobileMenu(false);
    }
  };

  // Depoimentos em vídeo do YouTube
  const testimonials = [
    { 
      id: 1, 
      youtubeId: "oiWf0jf6vsY",
      title: "Aumentei meu faturamento em 5x", 
      name: "Carlos Silva", 
      role: "Empresário Fitness" 
    },
    { 
      id: 2, 
      youtubeId: "26ZiRv2OXw4",
      title: "De CLT a mentora de sucesso", 
      name: "Ana Paula", 
      role: "Ex-funcionária pública" 
    },
    { 
      id: 3, 
      youtubeId: "L5kclxGuV60",
      title: "Faturando 80k/mês com mentorias", 
      name: "Roberto Alves", 
      role: "Especialista em Marketing" 
    }
  ];

  // Imagens reais de prints do WhatsApp COM NOMES E FOTOS REAIS
  const whatsappPrints = [
    { 
      id: 2, 
      name: "Rafael Costa",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      text: "Acabei de fechar mais 2 clientes premium graças à estratégia que você me passou! 🙌", 
      time: "09:15",
      status: "online",
      sent: true,
      read: true
    },
    { 
      id: 7, 
      name: "Patrícia Rocha",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      text: "Meu faturamento mensal aumentou 300% em 60 dias! Que transformação! 📈", 
      time: "Qua, 15:22",
      status: "online",
      sent: true,
      read: true
    },
    { 
      id: 8, 
      name: "Daniel Souza",
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      text: "Finalmente larguei meu emprego CLT! Agora sou mentor full-time graças a você! 🎉", 
      time: "Ter, 10:15",
      status: "online",
      sent: true,
      read: true
    }
  ];

  // Resultados
  const results = [
    {
      id: 1,
      amount: "R$ 25.000",
      description: "Primeiro mês faturando",
      imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      amount: "R$ 80.000",
      description: "Faturamento mensal atual",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      amount: "+200",
      description: "Clientes atendidos",
      imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <div className="App">
      {/* Modal Elegante */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="modal-header">
              <div className="modal-badge">EXCLUSIVO</div>
              <h2>AGENDE SUA SESSÃO <span className="text-gradient">GRATUITA</span></h2>
              <p>Preencha os dados abaixo para garantir sua vaga</p>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Seu nome completo" className="input-elegant" />
              </div>
              <div className="form-group">
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Seu melhor email" className="input-elegant" />
              </div>
              <div className="form-group">
                <input type="tel" name="phone" value={formData.phone} onChange={handlePhoneChange} required placeholder="Seu WhatsApp" className="input-elegant" />
              </div>
              <div className="form-note">
                <div className="note-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span>Seus dados estão protegidos</span>
                </div>
                <div className="note-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  <span>Não enviamos spam</span>
                </div>
              </div>
              <button type="submit" className="modal-submit-btn">
                <span>AGENDAR AGORA</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header Premium */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <nav className="navbar">
            <div className="logo">
              <div className="logo-container">
                <span className="logo-gradient">ANDREI</span>
                <span className="logo-light">FRANCISCONI</span>
              </div>
            </div>
            
            {/* Menu Desktop (visível apenas em telas grandes) */}
            <div className="nav-links">
              <a href="#hero" onClick={(e) => { e.preventDefault(); handleScrollToSection('hero'); }}>Início</a>
              <a href="#valores" onClick={(e) => { e.preventDefault(); handleScrollToSection('valores'); }}>Valor</a>
              <a href="#depoimentos" onClick={(e) => { e.preventDefault(); handleScrollToSection('depoimentos'); }}>Depoimentos</a>
              <a href="#quem-e-ele" onClick={(e) => { e.preventDefault(); handleScrollToSection('quem-e-ele'); }}>Sobre</a>
              <a href="#resultados" onClick={(e) => { e.preventDefault(); handleScrollToSection('resultados'); }}>Resultados</a>
            </div>

            {/* Botão CTA Desktop (visível apenas em telas grandes) */}
            <button className="nav-cta" onClick={() => setShowModal(true)}>
              <span>AGENDAR SESSÃO</span>
            </button>

            {/* Botão Menu Mobile (SEMPRE VISÍVEL) */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label={showMobileMenu ? "Fechar menu" : "Abrir menu"}
            >
              {showMobileMenu ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </nav>
        </div>

        {/* Overlay do Menu Mobile */}
        <div 
          className={`mobile-menu-overlay ${showMobileMenu ? 'active' : ''}`}
          onClick={() => setShowMobileMenu(false)}
        />

        {/* Menu Mobile */}
        <div 
          className={`mobile-menu ${showMobileMenu ? 'active' : ''}`}
          ref={mobileMenuRef}
        >
          <button 
            className="mobile-menu-close"
            onClick={(e) => {
              e.stopPropagation();
              setShowMobileMenu(false);
            }}
            aria-label="Fechar menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="mobile-nav-content">
            <div className="mobile-nav-links">
              <a href="#hero" onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation();
                handleScrollToSection('hero'); 
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Início</span>
              </a>
              <a href="#valores" onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation();
                handleScrollToSection('valores'); 
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>Valor</span>
              </a>
              <a href="#depoimentos" onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation();
                handleScrollToSection('depoimentos'); 
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>Depoimentos</span>
              </a>
              <a href="#quem-e-ele" onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation();
                handleScrollToSection('quem-e-ele'); 
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                </svg>
                <span>Sobre</span>
              </a>
              <a href="#resultados" onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation();
                handleScrollToSection('resultados'); 
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                <span>Resultados</span>
              </a>
            </div>

            <div className="mobile-menu-footer">
              <button className="mobile-cta" onClick={(e) => { 
                e.stopPropagation();
                setShowMobileMenu(false); 
                setShowModal(true); 
              }}>
                <span>AGENDAR SESSÃO</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section Luxuosa */}
      <section id="hero" className="hero" ref={el => sectionRefs.current[0] = el}>
        <div className="hero-background">
          <div className="gradient-orbs">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
          </div>
        </div>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="badge-animated">
                <span className="badge-text">EXCLUSIVO PARA QUEM TRANSFORMA EXPERIÊNCIA EM LEGADO</span>
                <div className="badge-glow"></div>
              </div>
              
              <h1 className="hero-title">
                <span className="title-line">Em 35 minutos Você e Meu Time</span>
                <span className="title-line highlight">
                  <span className="text-gradient">criam uma estratégia para você</span>
                  <span className="highlight-glow"></span>
                </span>
                <span className="title-line">faturar 10 a 100 mil todo mês</span>
              </h1>
              
              <p className="hero-subtitle">
                Se você quer aumentar seu faturamento transformando seu conhecimento, 
                <span className="text-gradient"> agende uma ligação gratuita com meu time </span> 
                para um diagnóstico personalizado e a estratégia ideal para seu caso.
              </p>
              
              <div className="features">
                {[
                  "Diagnóstico personalizado do seu modelo atual",
                  "Estratégia de posicionamento premium",
                  "Sistema de escalabilidade comprovado",
                  "Modelo de precificação de alto valor"
                ].map((feature, index) => (
                  <div className="feature" key={index}>
                    <div className="feature-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <path d="M22 4L12 14.01l-3-3" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className="hero-cta" onClick={() => setShowModal(true)}>
                <div className="cta-content">
                  <span className="cta-main">QUERO MINHA SESSÃO EXCLUSIVA</span>
                  <span className="cta-sub">Vagas limitadas • Apenas para profissionais sérios</span>
                </div>
                <div className="cta-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="cta-glow"></div>
              </button>

              <div className="trust-signals">
                <div className="trust-item">
                  <div className="trust-icon">🏆</div>
                  <span>Mentor de elite</span>
                </div>
                <div className="trust-item">
                  <div className="trust-icon">💎</div>
                  <span>Resultados comprovados</span>
                </div>
                <div className="trust-item">
                  <div className="trust-icon">🛡️</div>
                  <span>100% confidencial</span>
                </div>
              </div>
            </div>

            <div className="hero-image">
              <div className="image-container">
                <div className="image-wrapper">
                  <img 
                    src="/images/Banner-1.jpeg"
                    alt="ANDREI FRANCISCONI"
                    className="mentor-photo"
                  />
                  <div className="image-frame"></div>
                  <div className="image-glow"></div>
                </div>
                
                <div className="floating-cards">
                  <div className="floating-card card-1">
                    <div className="card-value">+R$ 500K</div>
                    <div className="card-label">Faturamento</div>
                  </div>
                  <div className="floating-card card-2">
                    <div className="card-value">98%</div>
                    <div className="card-label">Satisfação</div>
                  </div>
                  <div className="floating-card card-3">
                    <div className="card-value">+200</div>
                    <div className="card-label">Alunos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Valor Premium */}
      <section id="valores" className="value-section" ref={el => sectionRefs.current[1] = el}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">DESCUBRA O PROCESSO</div>
            <h2>O QUE VOCÊ VAI RECEBER NA <span className="text-gradient">SESSÃO EXCLUSIVA</span></h2>
            <p className="section-subtitle">35 minutos que podem transformar completamente sua trajetória</p>
          </div>
          
          <div className="value-grid">
            {[
              {
                number: "01",
                title: "Análise do seu modelo atual",
                description: "Identificamos lacunas e oportunidades não exploradas no seu modelo de negócios.",
                icon: "🔍"
              },
              {
                number: "02",
                title: "Estratégia de posicionamento",
                description: "Como se diferenciar e atrair clientes que pagam premium pelo seu conhecimento.",
                icon: "🎯"
              },
              {
                number: "03",
                title: "Modelo de precificação",
                description: "Estrutura para cobrar o valor real do seu trabalho sem perder oportunidades.",
                icon: "💰"
              },
              {
                number: "04",
                title: "Fórmula de escalabilidade",
                description: "Sistema comprovado para multiplicar seu impacto e faturamento.",
                icon: "🚀",
                highlight: true
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`value-card ${item.highlight ? 'highlight' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-header">
                  <div className="card-number">{item.number}</div>
                  <div className="card-icon">{item.icon}</div>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.highlight && (
                  <div className="highlight-badge">
                    <span>ESTRATÉGIA EXCLUSIVA</span>
                  </div>
                )}
                <div className="card-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos em Vídeo */}
      <section id="depoimentos" className="testimonials-section" ref={el => sectionRefs.current[2] = el}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">HISTÓRIAS REAIS</div>
            <h2>QUEM JÁ <span className="text-gradient">TRANSFORMOU</span> A VIDA</h2>
            <p className="section-subtitle">Assista aos depoimentos de profissionais que aplicaram o método</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="testimonial-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="video-container">
                  <div className="video-wrapper">
                    {playingVideo === testimonial.youtubeId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${testimonial.youtubeId}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0`}
                        title={`Depoimento ${testimonial.name}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="video-iframe"
                      ></iframe>
                    ) : (
                      <div 
                        className="video-thumbnail-wrapper" 
                        onClick={() => handleVideoPlay(testimonial.youtubeId)}
                        style={{ cursor: 'pointer' }}
                      >
                        <img 
                          src={`https://img.youtube.com/vi/${testimonial.youtubeId}/maxresdefault.jpg`}
                          alt={`Depoimento ${testimonial.name}`}
                          className="video-thumbnail"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                        <div className="video-play-button">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="testimonial-content">
                  <div className="testimonial-quote">"</div>
                  <h3>{testimonial.title}</h3>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                    <div className="author-rating">★★★★★</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção "Quem é Ele" - COMPACTA */}
      <section id="quem-e-ele" className="compact-about-section" ref={el => sectionRefs.current[3] = el}>
        <div className="container">
          <div className="compact-about-container">
            {/* Cabeçalho */}
            <div className="section-header">
              <div className="section-badge">A HISTÓRIA</div>
              <h2>QUEM É <span className="text-gradient">ANDREI FRANCISCONI?</span></h2>
              <p className="section-subtitle">De empresário a mentor de transformação</p>
            </div>
            
            <div className="compact-about-grid">
              {/* Coluna da Imagem */}
              <div className="compact-image-column">
                <div className="compact-image-wrapper">
                  <img 
                    src="/images/Banner-2.jpeg"
                    alt="Andrei Francisconi"
                    className="compact-mentor-photo"
                  />
                  <div className="compact-image-frame"></div>
                  <div className="compact-image-glow"></div>
                </div>
                
                {/* Estatísticas Rápidas */}
                <div className="compact-stats">
                  <div className="compact-stat">
                    <div className="stat-number">13+</div>
                    <div className="stat-label">anos como empresário</div>
                  </div>
                  <div className="compact-stat">
                    <div className="stat-number">R$ 174mi+</div>
                    <div className="stat-label">em vendas totais</div>
                  </div>
                  <div className="compact-stat highlight">
                    <div className="stat-number">500+</div>
                    <div className="stat-label">vidas transformadas</div>
                  </div>
                </div>
              </div>
              
              {/* Coluna do Conteúdo */}
              <div className="compact-content-column">
                {/* Jornada */}
                <div className="compact-journey">
                  <h3>Minha Jornada:</h3>
                  <div className="journey-tags">
                    <span className="journey-tag">💼 13 anos como empresário</span>
                    <span className="journey-tag">💰 +R$ 140mi em consórcios</span>
                    <span className="journey-tag">🏢 +R$ 14mi no mercado financeiro</span>
                    <span className="journey-tag">✈️ +R$ 20mi em turismo</span>
                  </div>
                  
                  <div className="compact-highlight">
                    <p><strong>Mas nada disso veio fácil.</strong> Passei por crises, dívidas, perdas e recomeços.</p>
                  </div>
                </div>
                
                {/* Transformação */}
                <div className="compact-transformation">
                  <h3>Minha Transformação:</h3>
                  <ul className="transformation-list">
                    <li>Programação Neurolinguística (PNL)</li>
                    <li>Coaching e Inteligência Emocional</li>
                    <li>Análise Corporal</li>
                    <li>Autoconhecimento Profundo</li>
                    <li>Princípios Espirituais</li>
                  </ul>
                  
                  <div className="discovery-box">
                    <div className="discovery-icon">💡</div>
                    <div className="discovery-text">
                      <strong>Descoberta que mudou tudo:</strong>
                      <p>"A vida não trava fora — ela trava dentro."</p>
                    </div>
                  </div>
                </div>
                
                {/* Missão */}
                <div className="compact-mission">
                  <h3>Minha Missão:</h3>
                  <p className="mission-statement">
                    Destravar pessoas que sentem que nasceram para algo maior, mas estão presas por crenças limitantes.
                  </p>
                  
                  <div className="mission-highlights">
                    <div className="mission-item">
                      <div className="mission-icon">🎯</div>
                      <span>Cura de crenças limitantes</span>
                    </div>
                    <div className="mission-item">
                      <div className="mission-icon">⚡</div>
                      <span>Realinhamento interno</span>
                    </div>
                    <div className="mission-item">
                      <div className="mission-icon">🌟</div>
                      <span>Ativação de propósito</span>
                    </div>
                  </div>
                </div>
                
                {/* CTA Final da Seção */}
                <div className="compact-cta">
                  <h4>Se você:</h4>
                  <ul className="compact-list">
                    <li>✅ Sente que está travado</li>
                    <li>✅ Cansou de tentar sozinho</li>
                    <li>✅ Sabe que nasceu para mais</li>
                    <li>✅ Precisa de quem já passou pelo fogo</li>
                  </ul>
                  
                  <div className="compact-promise">
                    <p>
                      <strong>Eu não vou apenas te ensinar a prosperar —<br />
                      vou te ajudar a se tornar a pessoa que prospera.</strong>
                    </p>
                  </div>
                  
                  <button className="compact-cta-button" onClick={() => setShowModal(true)}>
                    <span>QUERO MEU DESTRAVAMENTO</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Prints Reais do WhatsApp */}
      <section className="whatsapp-section" ref={el => sectionRefs.current[4] = el}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">FEEDBACK EM TEMPO REAL</div>
            <h2>MENSAGENS <span className="text-gradient">REAIS</span> DOS ALUNOS</h2>
            <p className="section-subtitle">Veja o que nossos alunos estão dizendo no WhatsApp</p>
          </div>
          
          <div className="whatsapp-grid">
            {whatsappPrints.map((print, index) => (
              <div 
                key={print.id} 
                className="whatsapp-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="whatsapp-header">
                  <div className="whatsapp-contact">
                    <div className="contact-avatar">
                      <img 
                        src={print.avatar} 
                        alt={print.name}
                        className="avatar-image"
                      />
                    </div>
                    <div className="contact-info">
                      <strong>{print.name}</strong>
                      <span>{print.status}</span>
                    </div>
                  </div>
                  <div className="whatsapp-time">{print.time}</div>
                </div>
                
                <div className="whatsapp-message">
                  <div className="message-bubble">
                    <p>{print.text}</p>
                    <div className="message-info">
                      <span className="message-time">{print.time.split(', ').pop()}</span>
                      <div className="message-status">
                        {print.read ? (
                          <>
                            <span className="double-check">✓✓</span>
                            <span className="status-text">Lido</span>
                          </>
                        ) : print.sent ? (
                          <>
                            <span className="single-check">✓</span>
                            <span className="status-text">Enviado</span>
                          </>
                        ) : (
                          <span className="clock-icon">🕒</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria de Resultados */}
      <section id="resultados" className="results-section" ref={el => sectionRefs.current[5] = el}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">NÚMEROS QUE IMPRESSIONAM</div>
            <h2>RESULTADOS <span className="text-gradient">COMPROVADOS</span></h2>
            <p className="section-subtitle">Alguns dos muitos cases de sucesso do nosso método</p>
          </div>
          
          <div className="results-grid">
            {results.map((result, index) => (
              <div 
                key={result.id} 
                className="result-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="result-image">
                  <img 
                    src={result.imageUrl} 
                    alt={result.description}
                    className="result-img"
                  />
                  <div className="result-overlay">
                    <div className="result-amount">{result.amount}</div>
                    <div className="result-description">{result.description}</div>
                  </div>
                </div>
                <div className="result-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Premium */}
      <section className="final-cta-section" ref={el => sectionRefs.current[6] = el}>
        <div className="container">
          <div className="cta-content">
            <div className="cta-badge-animated">
              <span>ÚLTIMAS VAGAS DISPONÍVEIS</span>
              <div className="badge-pulse"></div>
            </div>
            
            <h2 className="cta-title">
              PRONTO PARA <span className="text-gradient">ESCREVER SUA HISTÓRIA</span> DE SUCESSO?
            </h2>
            
            <p className="cta-subtitle">
              Sessão gratuita • Diagnóstico personalizado • Estratégia exclusiva • Sem compromisso
            </p>
            
            <button className="cta-button" onClick={() => setShowModal(true)}>
              <div className="button-content">
                <span className="button-text">GARANTIR MINHA VAGA AGORA</span>
                <span className="button-subtext">Apenas para profissionais comprometidos</span>
              </div>
              <div className="button-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <div className="button-glow"></div>
            </button>
            
            <div className="cta-stats">
              {[
                { number: "+200", label: "Alunos transformados" },
                { number: "95%", label: "Taxa de satisfação" },
                { number: "35min", label: "Sessão gratuita" },
                { number: "R$ 1M+", label: "Em resultados" }
              ].map((stat, index) => (
                <div key={index} className="stat">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="cta-guarantee">
              <div className="guarantee-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>100% seguro e confidencial</span>
              </div>
              <div className="guarantee-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                <span>Garantia de qualidade premium</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Premium */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-main">
              <div className="footer-brand">
                <div className="footer-logo">
                  <span className="logo-gradient">ANDREI</span>
                  <span className="logo-light">FRANCISCONI</span>
                </div>
                <p className="footer-tagline">
                  Transformando conhecimento em legado financeiro
                </p>
                <div className="footer-social">
                  <a href="#" className="social-link" aria-label="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                    </svg>
                  </a>
                  <a href="#" className="social-link" aria-label="YouTube">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </a>
                  <a href="#" className="social-link" aria-label="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="footer-links">
                <div className="link-group">
                  <h4>NAVEGAÇÃO</h4>
                  <a href="#hero" onClick={(e) => { e.preventDefault(); handleScrollToSection('hero'); }}>Início</a>
                  <a href="#valores" onClick={(e) => { e.preventDefault(); handleScrollToSection('valores'); }}>Metodologia</a>
                  <a href="#depoimentos" onClick={(e) => { e.preventDefault(); handleScrollToSection('depoimentos'); }}>Depoimentos</a>
                  <a href="#quem-e-ele" onClick={(e) => { e.preventDefault(); handleScrollToSection('quem-e-ele'); }}>Quem Sou</a>
                  <a href="#resultados" onClick={(e) => { e.preventDefault(); handleScrollToSection('resultados'); }}>Resultados</a>
                </div>
                
                <div className="link-group">
                  <h4>LEGAL</h4>
                  <a href="#termos">Termos de Uso</a>
                  <a href="#privacidade">Privacidade</a>
                  <a href="#disclaimer">Disclaimer</a>
                </div>
                
                <div className="link-group">
                  <h4>CONTATO</h4>
                  <a href="mailto:contato@andreifrancisconi.com">contato@andreifrancisconi.com</a>
                  <a href="tel:+5554981664862">(54) 98166-4862</a>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} Andrei Francisconi. Todos os direitos reservados.</p>
              <p className="disclaimer">
                Os resultados podem variar de acordo com o esforço e dedicação de cada pessoa. 
                Este site não é afiliado ao Facebook, Instagram ou WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div> 
  );
}

export default App;