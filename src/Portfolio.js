import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Download, Globe, Github, Linkedin, Star, Mail, MapPin, ArrowDown, Database, Server, Code, Terminal, GraduationCap, Briefcase, Moon, Sun } from 'lucide-react';
import { FaReact, FaNodeJs, FaPython, FaAws } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from './ThemeContext';
import CustomCursor from './CustomCursor';

// Componente de texto con animación de escritura
const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50 + delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span>{displayText}</span>;
};

// Componente para un ítem de la línea de tiempo (Educación o Experiencia)
const TimelineItem = ({ year, title, subtitle, description, isLast = false, icon: Icon, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    viewport={{ once: true, margin: "-50px" }}
    className="flex relative">
    {/* Línea divisoria, se extiende hasta el final excepto en el último ítem */}
    {!isLast && (
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
        viewport={{ once: true }}
        className="w-0.5 bg-gradient-to-b from-emerald-400 to-gray-700 absolute left-[1.15rem] top-0"
      />
    )}

    {/* Círculo del punto de la línea de tiempo */}
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.2 + 0.1,
        type: "spring",
        stiffness: 200,
        damping: 10
      }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.2, rotate: 360 }}
      className="h-10 w-10 min-w-10 rounded-full bg-emerald-400 flex items-center justify-center absolute left-0 top-0 z-10 border-4 border-black shadow-lg shadow-emerald-400/50">
        {Icon && <Icon size={20} className="text-black" />}
    </motion.div>

    {/* Contenido */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
      viewport={{ once: true }}
      className="ml-16 pb-12 pt-0.5">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: index * 0.2 + 0.5 }}
        viewport={{ once: true }}
        className="text-sm text-emerald-400 font-mono mb-1 font-semibold">
        {year}
      </motion.p>
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      <p className="text-gray-400 font-medium mb-3">{subtitle}</p>
      <p className="text-gray-400 text-base leading-relaxed">{description}</p>
    </motion.div>
  </motion.div>
);


const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isDark, toggleTheme } = useTheme();

  // Parallax scroll effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Datos de Educación y Experiencia
  const educationData = [
    { year: '2023 - 2024', title: 'Maestría en Arquitectura Cloud', subtitle: 'Universidad Tecnológica de XYZ', description: 'Especialización en arquitecturas serverless, contenedores (Docker/Kubernetes) y desarrollo de microservicios en AWS.' },
    { year: '2016 - 2020', title: 'Ingeniería de Sistemas', subtitle: 'Universidad Nacional de Ingeniería', description: 'Enfoque en algoritmos, estructuras de datos y desarrollo de software. Tesis en optimización de bases de datos.' },
    { year: '2010 - 2012', title: 'Técnico en Programación', subtitle: 'Instituto Superior de Tecnología', description: 'Formación inicial en lenguajes como C++ y Java, y bases de datos SQL.' },
  ];

  const experienceData = [
    { year: '2020 - Actualidad', title: 'Senior Fullstack Developer', subtitle: 'TechSolutions Inc.', description: 'Liderando el desarrollo de la plataforma principal SaaS, implementando Next.js para el frontend y Go/Node.js para los microservicios de backend. Mentoría de equipos junior.' },
    { year: '2018 - 2020', title: 'Junior Backend Developer', subtitle: 'Digital Agency Co.', description: 'Desarrollo y mantenimiento de APIs RESTful utilizando Express.js y MongoDB para múltiples clientes. Responsable de la integración de pasarelas de pago.' },
    { year: '2016 - 2018', title: 'Desarrollador Frontend', subtitle: 'Startup Innova', description: 'Construcción de interfaces de usuario interactivas con React y Redux. Implementación de diseños responsivos con CSS puro y posteriormente con Tailwind CSS.' },
  ];

  // Smooth scroll handler with slower scroll
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      // Duración dinámica basada en la distancia para scroll más natural
      const duration = Math.min(Math.abs(distance) * 0.5, 1500); // Máximo 1.5s
      let start = null;

      // Easing que hace el scroll más suave y lento
      const easeOutQuart = (t) => {
        return 1 - Math.pow(1 - t, 4);
      };

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeOutQuart(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'services', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <CustomCursor />
      <div className={`min-h-screen font-sans selection:bg-emerald-400 selection:text-white transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-slate-900'}`}>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 flex justify-between items-center transition-all duration-300 border-b ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
          <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center">
            <span className="text-white font-bold text-lg italic">P</span>
          </div>
          <span className="font-bold text-xl tracking-tight">Pedro</span>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-8 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {['Inicio', 'Acerca', 'Habilidades', 'Experiencia', 'Servicios', 'Proyectos', 'Contacto'].map((item, index) => {
            const ids = ['home', 'about', 'skills', 'experience', 'services', 'projects', 'contact'];
            const id = ids[index];
            const isActive = activeSection === id;
            return (
              <button
                key={item}
                onClick={() => scrollToSection(id)}
                className={`flex items-center gap-2 transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'} ${isActive ? (isDark ? 'text-white font-semibold' : 'text-black font-semibold') : ''}`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                {item}
              </button>
            );
          })}

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
          </motion.button>
        </div>

        {/* Mobile Menu Toggle and Theme */}
        <div className="md:hidden flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
          </motion.button>

          <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-full left-0 right-0 p-6 flex flex-col gap-4 md:hidden shadow-lg border-b ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
             {['Inicio', 'Acerca', 'Habilidades', 'Experiencia', 'Servicios', 'Proyectos', 'Contacto'].map((item, index) => {
              const ids = ['home', 'about', 'skills', 'experience', 'services', 'projects', 'contact'];
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(ids[index])}
                  className="text-left py-2 font-medium text-lg border-b border-gray-50 last:border-0"
                >
                  {item}
                </button>
              );
            })}
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 overflow-hidden max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ y: y2, opacity }}
            className="relative z-10 space-y-8">
            {/* Dev Tool Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block relative">
              <div className={`border-2 border-emerald-400 px-4 py-2 rounded-sm relative ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-emerald-400 border ${isDark ? 'border-gray-800' : 'border-white'}`}></div>
                <div className={`absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-emerald-400 border ${isDark ? 'border-gray-800' : 'border-white'}`}></div>
                <div className={`absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-emerald-400 border ${isDark ? 'border-gray-800' : 'border-white'}`}></div>
                <div className={`absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-emerald-400 border ${isDark ? 'border-gray-800' : 'border-white'}`}></div>
                <span className="font-bold text-sm md:text-base font-mono">
                  <TypewriterText text="console.log(&quot;Hello World! I'm Pedro&quot;)" delay={300} />
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block ml-1">|</motion.span>
                </span>
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
              Desarrollador Fullstack <br />
              Con base en <span className="text-emerald-500/90 text-black">California</span>
            </h1>

            <p className="text-gray-500 text-lg md:text-xl max-w-lg leading-relaxed">
              Arquitecto aplicaciones web escalables y experiencias digitales fluidas. Desde backends robustos hasta frontends interactivos, codifico soluciones que impulsan el crecimiento empresarial.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-2">
              <button onClick={() => scrollToSection('contact')} className="relative group">
                <div className="absolute inset-0 bg-emerald-400 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <div className="relative bg-black text-white px-8 py-4 font-bold flex items-center gap-2 border-2 border-transparent transition-transform group-hover:-translate-y-0.5 group-hover:-translate-x-0.5">
                  Contrátame <ArrowUpRight size={20} />
                </div>
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-8 py-4 font-bold border-2 transition-colors ${isDark ? 'border-gray-600 hover:border-emerald-400 bg-gray-800 text-white' : 'border-gray-200 hover:border-black bg-white'}`}>
                Descargar CV <Download size={20} />
              </motion.button>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Encuéntrame en:</span>
              <div className="flex gap-3">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-gray-600 hover:bg-white hover:text-black hover:border-white' : 'border-gray-300 hover:bg-black hover:text-white hover:border-black'}`}>
                  <Github size={18} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-gray-600 hover:bg-white hover:text-black hover:border-white' : 'border-gray-300 hover:bg-black hover:text-white hover:border-black'}`}>
                  <Globe size={18} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="w-10 h-10 rounded-full bg-emerald-400 border border-emerald-400 text-white flex items-center justify-center hover:bg-emerald-500 transition-all">
                  <Linkedin size={18} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ y: y1 }}
            className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center lg:justify-end">
             {/* Abstract Shapes */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute top-10 left-0 z-20 ${isDark ? 'text-emerald-400' : 'text-black'}`}>
              <Code size={48} strokeWidth={2.5} />
            </motion.div>

            {/* Green Blobs */}
            <div className="absolute bottom-0 right-[-20px] w-64 h-32 bg-emerald-400 rounded-full transform rotate-[-20deg] z-0 opacity-90"></div>
            <div className="absolute bottom-[-40px] left-10 w-40 h-40 bg-emerald-400 rounded-full z-0 opacity-90"></div>

            {/* Photo Frame */}
            <div className="relative z-10 w-full max-w-md bg-gray-100 h-full max-h-[550px] overflow-hidden shadow-2xl border-4 border-black">
              {/* Developer stock image */}
              <img 
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000&auto=format&fit=crop" 
                alt="Pedro Varela" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            
            {/* Floating Circular Badge */}
            <div className="absolute bottom-20 -left-10 md:left-10 z-20 bg-white rounded-full p-6 shadow-xl border border-gray-100 hidden md:flex items-center justify-center animate-spin-slow">
               <svg viewBox="0 0 100 100" width="100" height="100">
                <defs>
                  <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <text fontSize="11" fontWeight="bold">
                  <textPath xlinkHref="#circle">
                    DESPLÁZATE • VE MI STACK •
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <ArrowDown size={24} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="bg-black text-white py-8 overflow-hidden relative rotate-1 scale-105 border-y-4 border-emerald-400">
        <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
           {[1, 2, 3, 4, 5, 6].map((i) => (
             <React.Fragment key={i}>
                <div className="flex items-center gap-3">
                  <FaReact className="text-emerald-400" size={40} />
                  <span className="text-3xl font-bold uppercase font-mono">React</span>
                </div>
                <Star className="text-emerald-400 fill-emerald-400" size={24} />
                <div className="flex items-center gap-3">
                  <FaNodeJs className="text-emerald-400" size={40} />
                  <span className="text-3xl font-bold uppercase font-mono">Node.js</span>
                </div>
                <Star className="text-emerald-400 fill-emerald-400" size={24} />
                <div className="flex items-center gap-3">
                  <FaPython className="text-emerald-400" size={40} />
                  <span className="text-3xl font-bold uppercase font-mono">Python</span>
                </div>
                <Star className="text-emerald-400 fill-emerald-400" size={24} />
                <div className="flex items-center gap-3">
                  <FaAws className="text-emerald-400" size={40} />
                  <span className="text-3xl font-bold uppercase font-mono">AWS</span>
                </div>
                <Star className="text-emerald-400 fill-emerald-400" size={24} />
             </React.Fragment>
           ))}
        </div>
      </div>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        id="about"
        className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="absolute -inset-4 bg-emerald-100 rounded-lg transform -rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Coding Workspace" 
              className="relative rounded-lg shadow-xl w-full object-cover h-[500px]"
            />
            <div
              className="absolute -bottom-8 -right-8 bg-black/80 backdrop-blur-xl text-white p-8 rounded-2xl shadow-2xl max-w-xs border border-emerald-400/30"
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}>
              <p className="text-4xl font-bold text-emerald-400 mb-2">10+</p>
              <p className="font-medium">Proyectos desplegados en entornos de producción.</p>
            </div>
          </div>
          
          <div className="order-1 md:order-2 space-y-6">
            <h4 className="text-emerald-500 font-bold uppercase tracking-widest text-sm">Acerca de mí</h4>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">Hablo JavaScript y Python con fluidez.</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Mi pasión está en la intersección entre la lógica y la creatividad. Comencé como desarrollador autodidacta y he evolucionado hacia un ingeniero fullstack capaz de manejar todo el ciclo de vida del desarrollo de software.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ya sea optimizando consultas de bases de datos o creando interfaces perfectas con Tailwind, me aseguro de que cada línea de código contribuya a una experiencia de usuario robusta.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex gap-3">
                 <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-emerald-600">
                    <Database size={24} />
                 </div>
                 <div>
                    <h3 className="font-bold text-lg">Backend</h3>
                    <p className="text-gray-500 text-sm">Sólido y Escalable</p>
                 </div>
              </div>
              <div className="flex gap-3">
                 <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-emerald-600">
                    <Code size={24} />
                 </div>
                 <div>
                    <h3 className="font-bold text-lg">Frontend</h3>
                    <p className="text-gray-500 text-sm">Interactivo y Rápido</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SKILL TREE SECTION */}
      <section id="skills" className="py-24 px-6 md:px-12 bg-black text-white">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 max-w-2xl mx-auto">
               <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4">Competencia Técnica</h4>
               <h2 className="text-4xl md:text-5xl font-bold mb-6">Mi Árbol de Habilidades</h2>
               <p className="text-gray-400 text-lg">Un desglose de mis capacidades técnicas en toda la pila.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               
               {/* Frontend */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                     <Code className="text-emerald-400" />
                     <h3 className="text-2xl font-bold">Frontend</h3>
                  </div>
                  {[
                     { name: 'React / Next.js', level: '95%' },
                     { name: 'TypeScript', level: '90%' },
                     { name: 'Tailwind CSS', level: '95%' },
                     { name: 'Vue.js', level: '80%' },
                  ].map((skill, idx) => (
                     <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        viewport={{ once: true }}>
                        <div className="flex justify-between mb-1">
                           <span className="font-medium text-sm">{skill.name}</span>
                           <span className="text-emerald-400 text-sm">{skill.level}</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                           <motion.div
                              className="bg-emerald-400 h-2 rounded-full"
                              initial={{ width: '0%' }}
                              whileInView={{ width: skill.level }}
                              transition={{ duration: 1, delay: idx * 0.1 + 0.2, ease: "easeOut" }}
                              viewport={{ once: true }}
                           />
                        </div>
                     </motion.div>
                  ))}
               </div>

               {/* Backend */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                     <Server className="text-emerald-400" />
                     <h3 className="text-2xl font-bold">Backend</h3>
                  </div>
                   {[
                     { name: 'Node.js', level: '90%' },
                     { name: 'Python / Django', level: '85%' },
                     { name: 'Go', level: '70%' },
                     { name: 'GraphQL', level: '80%' },
                  ].map((skill, idx) => (
                     <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        viewport={{ once: true }}>
                        <div className="flex justify-between mb-1">
                           <span className="font-medium text-sm">{skill.name}</span>
                           <span className="text-emerald-400 text-sm">{skill.level}</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                           <motion.div
                              className="bg-emerald-400 h-2 rounded-full"
                              initial={{ width: '0%' }}
                              whileInView={{ width: skill.level }}
                              transition={{ duration: 1, delay: idx * 0.1 + 0.2, ease: "easeOut" }}
                              viewport={{ once: true }}
                           />
                        </div>
                     </motion.div>
                  ))}
               </div>

               {/* Databases */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                     <Database className="text-emerald-400" />
                     <h3 className="text-2xl font-bold">Bases de Datos</h3>
                  </div>
                   <div className="flex flex-wrap gap-2">
                     {['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'MySQL', 'Supabase'].map((db, idx) => (
                        <motion.span
                           key={db}
                           initial={{ opacity: 0, scale: 0 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           transition={{ duration: 0.3, delay: idx * 0.1, type: "spring", stiffness: 200 }}
                           viewport={{ once: true }}
                           className="px-3 py-1 border border-emerald-500/30 rounded-md text-emerald-100 text-sm hover:bg-emerald-500/20 transition-colors cursor-default">
                           {db}
                        </motion.span>
                     ))}
                   </div>
               </div>

                {/* Tools */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                     <Terminal className="text-emerald-400" />
                     <h3 className="text-2xl font-bold">Herramientas</h3>
                  </div>
                   <div className="flex flex-wrap gap-2">
                     {['Git & GitHub', 'Docker', 'AWS', 'Vercel', 'Jira', 'Figma', 'Linux', 'CI/CD'].map((tool, idx) => (
                        <motion.span
                           key={tool}
                           initial={{ opacity: 0, scale: 0 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           transition={{ duration: 0.3, delay: idx * 0.1, type: "spring", stiffness: 200 }}
                           viewport={{ once: true }}
                           className="px-3 py-1 bg-gray-800 rounded-md text-gray-300 text-sm hover:text-white transition-colors cursor-default">
                           {tool}
                        </motion.span>
                     ))}
                   </div>
               </div>

            </div>
         </div>
      </section>
      
      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-24 px-6 md:px-12 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
             <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4">Trayectoria Profesional</h4>
             <h2 className="text-4xl md:text-5xl font-bold mb-6">Experiencia & Educación</h2>
             <p className="text-gray-400 text-lg">Un resumen de mi crecimiento académico y laboral.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Columna de Educación */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-8">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                      <GraduationCap className="text-emerald-400" size={32} />
                    </motion.div>
                    <h3 className="text-3xl font-bold">Educación</h3>
                </motion.div>
                <div className="relative pl-4">
                    {educationData.map((item, idx) => (
                      <TimelineItem
                        key={item.year}
                        year={item.year}
                        title={item.title}
                        subtitle={item.subtitle}
                        description={item.description}
                        isLast={idx === educationData.length - 1}
                        icon={GraduationCap}
                        index={idx}
                      />
                    ))}
                </div>
            </motion.div>

            {/* Columna de Experiencia Laboral */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}>
                 <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-8">
                    <motion.div
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                      <Briefcase className="text-emerald-400" size={32} />
                    </motion.div>
                    <h3 className="text-3xl font-bold">Experiencia Laboral</h3>
                </motion.div>
                <div className="relative pl-4">
                    {experienceData.map((item, idx) => (
                      <TimelineItem
                        key={item.year}
                        year={item.year}
                        title={item.title}
                        subtitle={item.subtitle}
                        description={item.description}
                        isLast={idx === experienceData.length - 1}
                        icon={Briefcase}
                        index={idx}
                      />
                    ))}
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        id="services"
        className={`py-24 px-6 md:px-12 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
             <h4 className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-4">Lo que hago</h4>
             <h2 className="text-4xl md:text-5xl font-bold mb-6">Servicios de Desarrollo</h2>
             <p className="text-gray-600 text-lg">Soluciones completas para empresas modernas.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Aplicaciones Web Fullstack",
                desc: "Construyendo aplicaciones web complejas desde cero usando el stack MERN o Next.js.",
                icon: "01"
              },
              {
                title: "Desarrollo de APIs",
                desc: "Diseñando APIs RESTful y GraphQL que son seguras, documentadas y escalables.",
                icon: "02"
              },
              {
                title: "Arquitectura en la Nube",
                desc: "Desplegando y gestionando aplicaciones en AWS, Google Cloud o Vercel con pipelines CI/CD.",
                icon: "03"
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`p-10 border border-transparent hover:border-emerald-400 transition-all hover:-translate-y-2 group backdrop-blur-xl bg-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white/80 hover:bg-white/90'}`}
                style={{
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}>
                <div className="text-5xl font-black text-gray-100 mb-6 group-hover:text-emerald-100 transition-colors">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-8">{service.desc}</p>
                <a href="#contact" className={`inline-flex items-center font-bold border-b-2 pb-1 hover:text-emerald-500 hover:border-emerald-500 transition-colors ${isDark ? 'border-white' : 'border-black'}`}>
                  Discutir Proyecto <ArrowUpRight className="ml-2 w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        id="projects"
        className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h4 className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-4">Portafolio</h4>
            <h2 className="text-4xl md:text-5xl font-bold">Despliegues Destacados</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 border-2 font-bold transition-colors ${isDark ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}>
            Ver GitHub
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              title: "Panel de Analíticas SaaS",
              cat: "React • Node.js • MongoDB",
              img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            },
            {
              title: "Plataforma de E-Commerce",
              cat: "Next.js • Stripe • Postgres",
              img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            },
            {
              title: "Aplicación de Chat en Tiempo Real",
              cat: "Socket.io • Redis • Express",
              img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            },
            {
              title: "Generador de Imágenes IA",
              cat: "Python • OpenAI API • React",
              img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            }
          ].map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`project-card group cursor-pointer p-4 backdrop-blur-lg transition-all hover:shadow-2xl ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white/60 hover:bg-white/80'}`}
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}>
              <div className="relative overflow-hidden mb-6 aspect-[4/3]">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all z-10"></div>
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white p-3 rounded-full">
                    <Github className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-500 transition-colors">{project.title}</h3>
              <p className="text-gray-500 font-medium uppercase tracking-wide text-sm font-mono">{project.cat}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        id="contact"
        className={`py-24 px-6 md:px-12 text-white relative overflow-hidden ${isDark ? 'bg-gray-950' : 'bg-black'}`}>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16">
          <div>
            <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4">Ponte en Contacto</h4>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">Construyamos algo <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">escalable</span> juntos.</h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md">
              ¿Buscas un desarrollador para unirte a tu equipo o construir tu MVP? Escribamos código limpio.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-emerald-400">
                  <Mail />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Envíame un Email</p>
                  <p className="text-xl font-bold">hello@pedrovarela.io</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-emerald-400">
                  <Github />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Revisa mi Código</p>
                  <p className="text-xl font-bold">github.com/pedrovarela</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-emerald-400">
                  <MapPin />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Ubicación</p>
                  <p className="text-xl font-bold">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-2xl p-8 md:p-12 border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:border-emerald-400/50 transition-all"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold tracking-wide text-gray-400">NOMBRE</label>
                  <input type="text" className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-emerald-400 transition-colors" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold tracking-wide text-gray-400">EMAIL</label>
                  <input type="email" className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-emerald-400 transition-colors" placeholder="jane@tech.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-wide text-gray-400">TIPO DE PROYECTO</label>
                <input type="text" className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-emerald-400 transition-colors" placeholder="Aplicación Web, API, Integración..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-wide text-gray-400">MENSAJE</label>
                <textarea className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-emerald-400 transition-colors h-32 resize-none" placeholder="Cuéntame sobre el stack..."></textarea>
              </div>
              <button className="w-full bg-emerald-400 text-black font-bold py-4 hover:bg-emerald-300 transition-colors mt-4">
                Enviar Mensaje
              </button>
            </form>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className={`text-white border-t py-12 px-6 ${isDark ? 'bg-gray-950 border-gray-800' : 'bg-black border-white/10'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center">
              <span className="text-white font-bold text-lg italic">P</span>
            </div>
            <span className="font-bold text-xl tracking-tight">Pedro Varela</span>
          </div>
          
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Pedro Varela. Todos los derechos reservados.
          </div>

          <div className="flex gap-6">
            <a href="#" className="hover:text-emerald-400 transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Términos de Servicio</a>
          </div>
        </div>
      </footer>
      
      {/* Estilos CSS - Eliminados los atributos "jsx" y "global" para evitar la advertencia */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
      `}</style>
    </div>
    </>
  );
};

export default Portfolio;