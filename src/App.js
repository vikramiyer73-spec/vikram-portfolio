import React, { useState } from 'react';
import { Linkedin, Mail, ExternalLink, Menu, X, Figma } from 'lucide-react';

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const projects = [
    {
      title: "SoundCloud Redesign",
      description: "A comprehensive UI/UX redesign of the SoundCloud mobile app, focusing on improved navigation, visual hierarchy, and user engagement through modern interface patterns.",
      tags: ["Figma", "UI/UX", "Mobile Design"],
      link: "https://www.figma.com/proto/Deq3ULfPyYcm6Y60S39nyu/Soundcloud-redesign?node-id=1-2&p=f&t=wSw8324zVIlCjHhz-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3"
    },
    {
      title: "E-Commerce Prototype",
      description: "Interactive UX prototype for an e-commerce platform, featuring intuitive product discovery, streamlined checkout flow, and responsive design principles.",
      tags: ["Figma", "Prototyping", "UX Design"],
      link: "https://www.figma.com/proto/8Zb0o9efQIU6RmlXsDdp5a/Vikram-Ecom-V1?node-id=3-2&p=f&t=C1YKRqm0FUrY48nM-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A2"
    },
    {
      title: "Club Event Graphics",
      description: "Promotional graphics designed for UCLA clubs including CKI Senior Spotlight, Theta Chi Cinema, and Game Night events. Each design captures the unique vibe and purpose of the event while engaging the target audience.",
      tags: ["Graphic Design", "Adobe Creative Suite", "Marketing"],
      link: "#graphics"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative">
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      {/* Textured Background Overlay */}
      <div className="fixed inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
          linear-gradient(to bottom right, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.1))
        `,
        backgroundSize: '100% 100%, 100% 100%, 100% 100%, 100% 100%'
      }}></div>
      {/* Noise Texture */}
      <div className="fixed inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px'
      }}></div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-sm z-50 border-b border-blue-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Vikram Iyer
            </span>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-blue-400 transition">About</button>
              <button onClick={() => scrollToSection('projects')} className="text-gray-300 hover:text-blue-400 transition">Projects</button>
              <button onClick={() => scrollToSection('skills')} className="text-gray-300 hover:text-blue-400 transition">Skills</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-blue-400 transition">Contact</button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
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
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Gradient Mesh Background */}
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
            <a href="#contact" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition transform hover:scale-105">
              Get In Touch
            </a>
            <a href="#projects" className="border-2 border-blue-500 text-blue-400 px-8 py-3 rounded-full font-semibold hover:bg-blue-500/10 transition">
              View Work
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">About Me</h2>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 flex flex-col md:flex-row-reverse gap-8 items-center">
            <div className="flex-shrink-0">
              <img 
                src="/headshot.jpg" 
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
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/50 transition transform hover:scale-105">
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link !== "#graphics" ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition text-sm">
                    View Project <ExternalLink size={16} />
                  </a>
                ) : (
                  <span className="text-gray-500 text-sm flex items-center gap-2">
                    <Figma size={16} /> See designs below
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Graphics Showcase */}
          <div id="graphics" className="mt-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Event Graphics</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-blue-500/20 overflow-hidden">
                <img 
                  src="/cki-spotlight.png" 
                  alt="CKI Senior Spotlight - Carter Castanha"
                  className="w-full h-auto rounded-lg mb-3"
                />
                <p className="text-gray-300 text-sm text-center">CKI Senior Spotlight</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-blue-500/20 overflow-hidden">
                <img 
                  src="/theta-cinema.png" 
                  alt="Theta Cinema - Superbad Screening"
                  className="w-full h-auto rounded-lg mb-3"
                />
                <p className="text-gray-300 text-sm text-center">Theta Chi Cinema Event</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-blue-500/20 overflow-hidden">
                <img 
                  src="/game-night.png" 
                  alt="Game Night Event"
                  className="w-full h-auto rounded-lg mb-3"
                />
                <p className="text-gray-300 text-sm text-center">Online Game Night</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Skills & Technologies</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl px-6 py-3 text-white font-semibold hover:scale-110 transition transform">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Let's Connect</h2>
          <p className="text-gray-300 text-lg mb-12">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <div className="flex justify-center space-x-6">
            <a href="mailto:vikramiyer73@gmail.com" className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-full border border-blue-500/20 hover:border-blue-500/50 transition transform hover:scale-110">
              <Mail size={24} className="text-blue-400" />
            </a>
            <a href="https://www.linkedin.com/in/vikramiyerucla/" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-full border border-blue-500/20 hover:border-blue-500/50 transition transform hover:scale-110">
              <Linkedin size={24} className="text-blue-400" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-blue-500/20">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2024 Vikram Iyer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}