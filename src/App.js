import React, { useState, useEffect, useRef } from 'react';
import { Linkedin, Mail, ExternalLink, Menu, X, Figma } from 'lucide-react';

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [orbPositions, setOrbPositions] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ]);
  const canvasRef = useRef(null);
  const orbRef1 = useRef(null);
  const orbRef2 = useRef(null);
  const orbRef3 = useRef(null);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Calculate orb repulsion
      const orbRefs = [orbRef1, orbRef2, orbRef3];
      const newOrbPositions = orbRefs.map((orbRef) => {
        if (!orbRef.current) return { x: 0, y: 0 };
        
        const rect = orbRef.current.getBoundingClientRect();
        const orbCenterX = rect.left + rect.width / 2;
        const orbCenterY = rect.top + rect.height / 2;
        
        const dx = e.clientX - orbCenterX;
        const dy = e.clientY - orbCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200; // Repulsion radius
        
        if (distance < maxDistance) {
          const strength = (1 - distance / maxDistance) * 100;
          return {
            x: -dx / distance * strength,
            y: -dy / distance * strength
          };
        }
        return { x: 0, y: 0 };
      });
      
      setOrbPositions(newOrbPositions);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle system
  useEffect(() => {
    const particleCount = 50;
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1
    }));

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Move particles
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(96, 165, 250, 0.3)';
        ctx.fill();

        // Connect nearby particles
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.15 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "Grad Pad Website Redesign",
      description: "Led redesign efforts for 10+ web pages at Grad Pad, collaborating with product stakeholders to improve layout consistency and user experience. Supported full-site redesign initiative using Figma to increase website engagement.",
      tags: ["Figma", "UI/UX Design", "Product Design", "Stakeholder Collaboration"],
      link: null,
      confidential: true
    },
    {
      title: "Terra and Cotta Brand Kit",
      description: "Complete brand identity design for a hypothetical pottery store, including logo design, color palette, typography system, and brand guidelines to create a cohesive visual identity.",
      tags: ["Figma", "Brand Design", "Visual Identity", "Design Systems"],
      link: "https://www.figma.com/design/padm5wS5vEcWtagm7BftMB/Terra-and-Cotta?node-id=0-1&t=q8DiNpx46PbKau4A-1",
      confidential: false
    },
    {
      title: "SoundCloud Redesign",
      description: "A comprehensive UI/UX redesign of the SoundCloud mobile app, focusing on improved navigation, visual hierarchy, and user engagement through modern interface patterns.",
      tags: ["Figma", "UI/UX", "Mobile Design"],
      link: "https://www.figma.com/proto/Deq3ULfPyYcm6Y60S39nyu/Soundcloud-redesign?node-id=1-2&p=f&t=wSw8324zVIlCjHhz-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3",
      confidential: false
    },
    {
      title: "E-Commerce Prototype",
      description: "Interactive UX prototype for an e-commerce platform, featuring intuitive product discovery, streamlined checkout flow, and responsive design principles.",
      tags: ["Figma", "Prototyping", "UX Design"],
      link: "https://www.figma.com/proto/8Zb0o9efQIU6RmlXsDdp5a/Vikram-Ecom-V1?node-id=3-2&p=f&t=C1YKRqm0FUrY48nM-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A2",
      confidential: false
    },
    {
      title: "Club Event Graphics",
      description: "Promotional graphics designed for UCLA clubs including CKI Senior Spotlight, Theta Chi Cinema, and Game Night events. Each design captures the unique vibe and purpose of the event while engaging the target audience.",
      tags: ["Graphic Design", "Adobe Creative Suite", "Marketing"],
      link: "#graphics",
      confidential: false
    }
  ];

  const skills = [
    "Figma", "Adobe Photoshop", "Adobe Illustrator", "Adobe Premiere Pro",
    "Canva", "C++", "SQL", "UI/UX Design",
    "Graphic Design", "User Research", "Visual Communication", "Prototyping"
  ];

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const MagneticButton = ({ children, href, onClick, className = "" }) => {
    const buttonRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 150; // Magnetic field radius
      
      if (distance < maxDistance) {
        const strength = 1 - (distance / maxDistance);
        setPosition({ x: x * strength * 0.5, y: y * strength * 0.5 });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    const Component = href ? 'a' : 'button';

    return (
      <Component
        ref={buttonRef}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${position.x || position.y ? 1.1 : 1})`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        {children}
      </Component>
    );
  };

  const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = ((y - centerY) / centerY) * -15; // Increased from -8
      const tiltY = ((x - centerX) / centerX) * 15; // Increased from 8
      setTilt({ x: tiltX, y: tiltY });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.x || tilt.y ? 1.08 : 1})`,
          transition: 'transform 0.1s ease-out',
          transformStyle: 'preserve-3d'
        }}
      >
        <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
        <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span key={i} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs hover:bg-blue-500/30 transition-colors duration-300">
              {tag}
            </span>
          ))}
        </div>
        {project.confidential ? (
          <span className="text-gray-500 text-sm flex items-center gap-2">
            <Figma size={16} /> Confidential client work
          </span>
        ) : project.link === "#graphics" ? (
          <span className="text-gray-500 text-sm flex items-center gap-2">
            <Figma size={16} /> See designs below
          </span>
        ) : (
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors duration-300 text-sm group"
          >
            View Project <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        )}
      </div>
    );
  };

  const GraphicCard = ({ graphic }) => {
    const cardRef = useRef(null);
    const [scale, setScale] = useState(1);

    const handleMouseMove = (e) => {
      setScale(1.05);
    };

    const handleMouseLeave = () => {
      setScale(1);
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-blue-500/20 overflow-hidden hover:border-blue-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20"
        style={{
          transform: `scale(${scale})`,
          transition: 'all 0.3s ease-out'
        }}
      >
        <img 
          src={graphic.src}
          alt={graphic.alt}
          className="w-full h-auto rounded-lg mb-3"
        />
        <p className="text-gray-300 text-sm text-center">{graphic.title}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-x-hidden">
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-3000 { animation-delay: 3s; }
        
        .glitch:hover {
          animation: glitch 0.3s infinite;
        }
        
        .scroll-reveal {
          opacity: 0;
        }
        
        .scroll-reveal.active {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .gradient-shift {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
          background-size: 300% 300%;
          animation: gradient 15s ease infinite;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .text-glitch {
          position: relative;
        }
        
        .text-glitch:hover::before,
        .text-glitch:hover::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .text-glitch:hover::before {
          left: 2px;
          text-shadow: -2px 0 #ff00de;
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim 3s infinite linear alternate-reverse;
        }
        
        .text-glitch:hover::after {
          left: -2px;
          text-shadow: -2px 0 #00fff9;
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-anim {
          0% { clip: rect(61px, 9999px, 90px, 0); }
          20% { clip: rect(86px, 9999px, 132px, 0); }
          40% { clip: rect(23px, 9999px, 56px, 0); }
          60% { clip: rect(110px, 9999px, 140px, 0); }
          80% { clip: rect(45px, 9999px, 78px, 0); }
          100% { clip: rect(71px, 9999px, 120px, 0); }
        }
      `}</style>

      {/* Custom Cursor */}
      <div
        className="fixed w-8 h-8 rounded-full border-2 border-blue-400 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: cursorVariant === 'hover' ? 'scale(1.5)' : 'scale(1)',
          transition: 'transform 0.2s ease-out'
        }}
      />
      <div
        className="fixed w-2 h-2 bg-blue-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
      />

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />
      
      {/* Textured Background Overlay */}
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
          linear-gradient(to bottom right, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.1))
        `,
        backgroundSize: '100% 100%, 100% 100%, 100% 100%, 100% 100%'
      }}></div>

      {/* Floating Shapes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          ref={orbRef1}
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float"
          style={{
            transform: `translate(${orbPositions[0].x}px, ${orbPositions[0].y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
        <div 
          ref={orbRef2}
          className="absolute top-40 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-float animation-delay-2000"
          style={{
            transform: `translate(${orbPositions[1].x}px, ${orbPositions[1].y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
        <div 
          ref={orbRef3}
          className="absolute bottom-20 left-1/4 w-36 h-36 bg-pink-500/10 rounded-full blur-xl animate-float animation-delay-4000"
          style={{
            transform: `translate(${orbPositions[2].x}px, ${orbPositions[2].y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-sm z-50 border-b border-blue-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 glitch" data-text="Vikram Iyer">
              Vikram Iyer
            </span>
            
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('projects')} 
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('skills')} 
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                Skills
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                Contact
              </button>
            </div>

            <button 
              className="md:hidden text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-blue-900/30">About</button>
              <button onClick={() => scrollToSection('projects')} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-blue-900/30">Projects</button>
              <button onClick={() => scrollToSection('skills')} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-blue-900/30">Skills</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-blue-900/30">Contact</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Vikram Iyer</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-4">
            Cognitive Science Student at UCLA
          </p>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            UX Designer | Visual Storyteller | Creative Problem Solver
          </p>
          <div className="flex justify-center space-x-4 flex-wrap gap-4">
            <MagneticButton 
              href="#contact" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
            >
              Get In Touch
            </MagneticButton>
            <MagneticButton 
              href="#projects" 
              className="border-2 border-blue-500 text-blue-400 px-8 py-3 rounded-full font-semibold hover:bg-blue-500/10 transition-all duration-300"
            >
              View Work
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">About Me</h2>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 flex flex-col md:flex-row-reverse gap-8 items-center hover:border-blue-500/40 transition-all duration-500">
            <div className="flex-shrink-0">
              <img 
                src="/headshot.JPG" 
                alt="Vikram Iyer"
                className="w-48 h-48 rounded-full object-cover border-4 border-blue-500/30 shadow-lg shadow-blue-500/20"
              />
            </div>
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                I'm a third-year Cognitive Science student at UCLA with a passion for creating and designing with purpose. I love thinking about my audience — understanding what engages them and how to communicate ideas in a way that feels authentic and meaningful.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                I've designed graphics to promote events for several UCLA clubs and worked on personal Figma projects that explore user experience and visual storytelling. I'm excited to keep growing in the fields of UX design and marketing, where creativity and strategy come together to shape impactful experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          {/* Graphics Showcase */}
          <div id="graphics" className="mt-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Graphic Designs</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { src: "/cki-spotlight.png", alt: "CKI Senior Spotlight - Carter Castanha", title: "CKI Senior Spotlight" },
                { src: "/theta-cinema.png", alt: "Theta Cinema - Superbad Screening", title: "Theta Chi Cinema Event" },
                { src: "/game-night.png", alt: "Game Night Event", title: "Online Game Night" },
                { src: "/battle-of-la.png", alt: "Battle of LA - UCLA vs USC Watch Party", title: "UCLA vs USC Watch Party" },
                { src: "/bls-alumni-night.png", alt: "BLS Alumni Night", title: "BLS Alumni Night" },
                { src: "/panel-discussion.png", alt: "Panel Discussion with Peter Kelly", title: "Panel Discussion Event" },
                { src: "/hot-ruby-chocolate.png", alt: "Hot Ruby Chocolate Latte Promotion", title: "Hot Ruby Chocolate Latte" },
                { src: "/spring-menu.png", alt: "Little Ones Spring Menu", title: "Spring Menu" },
                { src: "/gradpad-badges.png", alt: "Grad Pad User Achievement Badges", title: "Grad Pad Achievement Badges" }
              ].map((graphic, index) => (
                <GraphicCard key={index} graphic={graphic} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Skills & Technologies</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl px-6 py-3 text-white font-semibold hover:scale-110 hover:from-blue-500/30 hover:to-purple-500/30 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform cursor-pointer"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center scroll-reveal">
          <h2 className="text-4xl font-bold text-white mb-8 text-glitch" data-text="Let's Connect">Let's Connect</h2>
          <p className="text-gray-300 text-lg mb-12">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <div className="flex justify-center space-x-6">
            <MagneticButton
              href="mailto:vikramiyer73@gmail.com"
              className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-full border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <Mail size={24} className="text-blue-400" />
            </MagneticButton>
            <MagneticButton
              href="https://www.linkedin.com/in/vikramiyerucla/"
              className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-full border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <Linkedin size={24} className="text-blue-400" />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-blue-500/20 relative z-10">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2024 Vikram Iyer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}