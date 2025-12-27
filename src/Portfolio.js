import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Download, Globe, Github, Linkedin, Star, Mail, MapPin, ArrowDown, Database, Server, Code, Terminal, GraduationCap, Briefcase, Moon, Sun, Award, ExternalLink } from 'lucide-react';
import { FaReact, FaNodeJs, FaPython, FaAws } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from './ThemeContext';
import CustomCursor from './CustomCursor';
import Particles3D from './Particles3D';

// Componente de texto con animación de escritura con error y corrección
const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasTypedError, setHasTypedError] = useState(false);

  // Posición donde ocurre el error (mitad del texto aproximadamente)
  const errorPosition = Math.floor(text.length / 2);
  const errorText = "Helo"; // Texto con error
  const correctPortion = text.substring(0, errorPosition);

  useEffect(() => {
    // Si estamos en la posición del error y no hemos cometido el error aún
    if (currentIndex === errorPosition && !hasTypedError && !isDeleting) {
      const timeout = setTimeout(() => {
        setDisplayText(correctPortion + errorText);
        setHasTypedError(true);
        // Pausar antes de empezar a borrar
        setTimeout(() => setIsDeleting(true), 400);
      }, 30);
      return () => clearTimeout(timeout);
    }

    // Si estamos borrando el error
    if (isDeleting) {
      if (displayText.length > errorPosition) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        // Terminamos de borrar, continuamos escribiendo correctamente
        setIsDeleting(false);
        setCurrentIndex(errorPosition);
      }
    }

    // Escritura normal
    if (!isDeleting && currentIndex < text.length && (currentIndex < errorPosition || hasTypedError)) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20 + delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay, isDeleting, displayText, hasTypedError, errorPosition, correctPortion, errorText]);

  return <span>{displayText}</span>;
};

// Componente para un ítem de la línea de tiempo (Educación o Experiencia)
const TimelineItem = ({ year, title, subtitle, description, isLast = false, icon: Icon, index, showDescription = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
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

        {showDescription && (
          <>
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden">
              <p className="text-gray-400 text-base leading-relaxed mb-3">{description}</p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
              {isExpanded ? 'Ocultar descripción' : 'Ver descripción'}
              <motion.svg
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};


const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isDark, toggleTheme } = useTheme();

  // Parallax scroll effect - Disabled
  // const { scrollY } = useScroll();
  // const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  // const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  // Datos de Educación y Experiencia
  const educationData = [
    { year: '2022 - 2024', title: 'Maestría en Administración de Proyectos', subtitle: 'Universidad Tecnológica Centroamericana (UNITEC)', description: 'Programa acreditado por el Global Accreditation Center (GAC) del Project Management Institute (PMI), una de solo 5 universidades latinoamericanas con esta distinción. Formación profesional en planificación, dirección y evaluación de proyectos aplicando estándares internacionales de calidad (PMI, SCRUM). Competencias adquiridas: gestión de riesgos, adquisiciones, recursos humanos, comunicaciones, calidad, evaluación de impacto social y ambiental, metodologías ágiles (Certificación SCRUM Master), análisis de negocios y preparación para certificación PMP. Incluye membresía al PMI y acceso a intercambios académicos internacionales.' },
    { year: '2011 - 2015', title: 'Ingeniería en Sistemas', subtitle: 'Universidad Nacional Autónoma de Honduras (UNAH)', description: 'Formación integral en desarrollo de software, arquitectura de sistemas, bases de datos y gestión de proyectos tecnológicos.' },
    { year: '2008 - 2010', title: 'Técnico en Computación', subtitle: 'Instituto Técnico Honduras', description: 'Fundamentos de programación, redes, hardware y mantenimiento de sistemas informáticos.' },
  ];

  const experienceData = [
    { year: '2021 - 2025', title: 'Consultant - Lead Technology Architect & Digital Solutions Specialist', subtitle: 'BID / Programa Ciudad Mujer', description: 'Desarrollo e implementación del ecosistema digital: plataformas INNOVA MUJER, INNOVA Tech Mujer, Conocimiento, Conecta e integración con SIRM. Stack: Python, JavaScript, PostgreSQL, MySQL, Nginx. Infraestructura: Linux/Windows, redes Fortinet y Cisco.' },
    { year: '2022 - 2025', title: 'Freelance - Web Developer & Infrastructure Engineer', subtitle: 'Centro de Estudios de la Mujer (CEM-H)', description: 'Desarrollo de funcionalidades web institucionales y gestión de infraestructura. Stack: WordPress, PHP, Python, JavaScript, MySQL. Infraestructura: Linux/Windows, redes Fortinet/Cisco, Git/GitHub.' },
    { year: '2020 - 2021', title: 'Consultant - Senior Systems Analyst & Technical Advisor', subtitle: 'Banco Interamericano de Desarrollo (BID)', description: 'Diagnóstico técnico y automatización de procesos operativos. Stack: Python, JavaScript, PostgreSQL. Infraestructura: Linux, Nginx, redes Fortinet/Cisco.' },
    { year: '2019 - 2020', title: 'Consultant - Full-Stack Developer & Mobile Solutions Architect', subtitle: 'USAID/GIZ - Secretaría de Derechos Humanos', description: 'Implementación de plataformas web (ODH, SIPNADH) y aplicaciones móviles de recolección de datos. Stack: Python, JavaScript, PostgreSQL, Nginx. Infraestructura: Linux, seguridad de red.' },
    { year: '2018 - 2019', title: 'Freelance - Full-Stack Developer & Cloud DevOps Engineer', subtitle: 'Fundación GLANF', description: 'Desarrollo de sistema administrativo y app móvil Android para seguimiento de proyectos. Stack: PHP, Java, SQLite, MySQL. Infraestructura: AWS, Linux.' },
    { year: '2016 - 2018', title: 'Consultant - Software Developer & Government Systems Architect', subtitle: 'MiAmbiente Honduras (PNUD)', description: 'Desarrollo de plataformas gubernamentales: SINIA, CESCCO, RETC, OCP. Stack: Python, JavaScript, PHP, MySQL. Infraestructura: Linux, redes Cisco.' },
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
      const sections = ['home', 'about', 'skills', 'certifications', 'experience', 'services', 'projects', 'contact'];
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
          {['Inicio', 'Acerca', 'Habilidades', 'Certificados', 'Experiencia', 'Servicios', 'Proyectos', 'Contacto'].map((item, index) => {
            const ids = ['home', 'about', 'skills', 'certifications', 'experience', 'services', 'projects', 'contact'];
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

        {/* Mobile Menu Fullscreen */}
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed inset-0 z-50 md:hidden flex flex-col ${isDark ? 'bg-gray-900' : 'bg-white'}`}>

            {/* Header del menú móvil */}
            <div className={`flex justify-between items-center p-6 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center">
                  <span className="text-white font-bold text-lg italic">P</span>
                </div>
                <span className="font-bold text-xl tracking-tight">Pedro</span>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className={`p-2 rounded-full transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
                </motion.button>

                <button className="p-2" onClick={() => setIsMenuOpen(false)}>
                  <X size={28} />
                </button>
              </div>
            </div>

            {/* Links del menú */}
            <div className="flex-1 flex flex-col justify-center px-8 py-12 gap-2">
              {['Inicio', 'Acerca', 'Habilidades', 'Certificados', 'Experiencia', 'Servicios', 'Proyectos', 'Contacto'].map((item, index) => {
                const ids = ['home', 'about', 'skills', 'certifications', 'experience', 'services', 'projects', 'contact'];
                const id = ids[index];
                const isActive = activeSection === id;

                return (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(id)}
                    className={`text-left py-4 font-bold text-3xl border-b transition-colors ${
                      isDark ? 'border-gray-800' : 'border-gray-100'
                    } ${
                      isActive
                        ? 'text-emerald-400'
                        : isDark ? 'text-white hover:text-emerald-400' : 'text-gray-900 hover:text-emerald-500'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {isActive && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                      {item}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Footer del menú móvil */}
            <div className={`p-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
              <div className="flex justify-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-gray-600 hover:bg-white hover:text-black hover:border-white' : 'border-gray-300 hover:bg-black hover:text-white hover:border-black'}`}>
                  <Github size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-gray-600 hover:bg-white hover:text-black hover:border-white' : 'border-gray-300 hover:bg-black hover:text-white hover:border-black'}`}>
                  <Globe size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="w-12 h-12 rounded-full bg-emerald-400 border border-emerald-400 text-white flex items-center justify-center hover:bg-emerald-500 transition-all">
                  <Linkedin size={20} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 overflow-hidden">
        {/* Partículas 3D de fondo - Todo el ancho */}
        <div className="absolute inset-0 left-0 right-0 z-0 opacity-30 w-screen ml-[calc(-50vw+50%)]">
          <Particles3D />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 max-w-7xl mx-auto">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Dev Tool Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block relative mx-auto lg:mx-0">
              <div className={`border-2 border-emerald-400 px-3 py-2 md:px-4 rounded-sm relative ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-emerald-400 border ${isDark ? 'border-gray-800' : 'border-white'}`}></div>
                <div className={`absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-emerald-400 border ${isDark ? 'border-gray-800' : 'border-white'}`}></div>
                <div className={`absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-emerald-400 border ${isDark ? 'border-gray-800' : 'border-white'}`}></div>
                <div className={`absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-emerald-400 border ${isDark ? 'border-gray-800' : 'border-white'}`}></div>
                <span className="font-bold text-xs md:text-base font-mono">
                  <TypewriterText text="console.log(&quot;Hello World! I'm Pedro Varela&quot;)" delay={200} />
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block ml-1">|</motion.span>
                </span>
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              <span className="block lg:inline">Desarrollador Fullstack</span>
              <br className="hidden lg:block" />
              <span className="block lg:inline"> Con base en </span>
              <span className="text-emerald-500/90 text-black">Honduras</span>
            </h1>

            <p className="text-gray-500 text-base md:text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Transformo ideas en soluciones digitales escalables. Especializado en crear aplicaciones web de alto rendimiento con arquitecturas backend sólidas y experiencias frontend intuitivas.
            </p>

            <div className="flex flex-row gap-3 md:gap-5 pt-2 justify-center lg:justify-start">
              <button onClick={() => scrollToSection('contact')} className="relative group flex-1 md:flex-none">
                <div className="absolute inset-0 bg-emerald-400 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <div className="relative bg-black text-white px-6 md:px-8 py-3 md:py-4 font-bold flex items-center justify-center gap-2 border-2 border-transparent transition-transform group-hover:-translate-y-0.5 group-hover:-translate-x-0.5 text-sm md:text-base">
                  Contrátame <ArrowUpRight size={18} className="md:w-5 md:h-5" />
                </div>
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 font-bold border-2 transition-colors text-sm md:text-base ${isDark ? 'border-gray-600 hover:border-emerald-400 bg-gray-800 text-white' : 'border-gray-200 hover:border-black bg-white'}`}>
                CV <Download size={18} className="md:w-5 md:h-5" />
              </motion.button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <span className={`text-xs md:text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Sígueme:</span>
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
            className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center lg:justify-end order-1 lg:order-2">
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
                src="./img/herovarela.png"
                alt="Pedro Varela"
                className="w-full h-full object-cover object-left grayscale hover:grayscale-0 transition-all duration-500"
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
              src="./img/aboutmevarela.png" 
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

        {/* Stats Row Below About Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">3+</p>
            <p className={`text-sm md:text-base uppercase tracking-wider font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Certificaciones</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">5+</p>
            <p className={`text-sm md:text-base uppercase tracking-wider font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Años Experiencia</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">50+</p>
            <p className={`text-sm md:text-base uppercase tracking-wider font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Proyectos Completados</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">10+</p>
            <p className={`text-sm md:text-base uppercase tracking-wider font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Tecnologías Implementadas</p>
          </div>
        </motion.div>
      </motion.section>

      {/* SKILL TREE SECTION */}
      <section id="skills" className="py-24 px-6 md:px-12 bg-black text-white">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 max-w-2xl mx-auto">
               <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4">Competencia Técnica</h4>
               <h2 className="text-4xl md:text-5xl font-bold mb-6">Mi Stack Tecnológico</h2>
               <p className="text-gray-400 text-lg">Herramientas y tecnologías con las que construyo soluciones de alto impacto.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

               {/* Frontend */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                     <Code className="text-emerald-400" />
                     <h3 className="text-2xl font-bold">Frontend</h3>
                  </div>
                  {[
                     { name: 'React / Next.js', level: '90%' },
                     { name: 'TypeScript', level: '90%' },
                     { name: 'Tailwind CSS', level: '75%' },
                     { name: 'Angular', level: '80%' },
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
                     { name: 'Python / Django / Flask', level: '95%' },
                     { name: 'Node.js', level: '90%' },
                     { name: 'PHP / Laravel', level: '70%' },
                     { name: 'ASP.net', level: '80%' },
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

               {/* Mobile Development */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                     <Terminal className="text-emerald-400" />
                     <h3 className="text-2xl font-bold">Desarrollo Móvil</h3>
                  </div>
                   {[
                     { name: 'Ionic', level: '90%' },
                     { name: 'React Native', level: '80%' },
                     { name: 'Java / Kotlin', level: '80%' },
                     { name: 'Swift', level: '50%' },
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

            </div>

            {/* Databases & Tools Row */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
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

      {/* CERTIFICATIONS SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        id="certifications"
        className={`py-24 px-6 md:px-12 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h4 className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-4">Validación Profesional</h4>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Certificaciones</h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Certificado por las empresas tecnológicas líderes de la industria.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cisco Certification */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className={`group relative p-8 border-2 transition-all hover:shadow-2xl hover:-translate-y-2 ${isDark ? 'bg-gray-800 border-gray-700 hover:border-emerald-400' : 'bg-white border-gray-200 hover:border-emerald-500'}`}>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={20} className="text-emerald-500" />
              </div>

              <div className="flex items-center justify-center mb-6 h-20">
                {/* Cisco Logo - Color azul característico */}
                <svg className="w-32 h-16" viewBox="0 0 200 80" fill="none">
                  <rect x="10" y="15" width="8" height="50" fill="#049fd9" className="group-hover:fill-emerald-500 transition-colors"/>
                  <rect x="10" y="15" width="8" height="25" fill="#049fd9" opacity="0.7"/>
                  <rect x="25" y="10" width="8" height="60" fill="#049fd9" className="group-hover:fill-emerald-500 transition-colors"/>
                  <rect x="25" y="10" width="8" height="30" fill="#049fd9" opacity="0.7"/>
                  <rect x="40" y="20" width="8" height="45" fill="#049fd9" className="group-hover:fill-emerald-500 transition-colors"/>
                  <rect x="40" y="20" width="8" height="22" fill="#049fd9" opacity="0.7"/>
                  <rect x="80" y="15" width="8" height="50" fill="#049fd9" className="group-hover:fill-emerald-500 transition-colors"/>
                  <rect x="80" y="15" width="8" height="25" fill="#049fd9" opacity="0.7"/>
                  <rect x="95" y="10" width="8" height="60" fill="#049fd9" className="group-hover:fill-emerald-500 transition-colors"/>
                  <rect x="95" y="10" width="8" height="30" fill="#049fd9" opacity="0.7"/>
                  <rect x="110" y="20" width="8" height="45" fill="#049fd9" className="group-hover:fill-emerald-500 transition-colors"/>
                  <rect x="110" y="20" width="8" height="22" fill="#049fd9" opacity="0.7"/>
                  <rect x="125" y="25" width="8" height="40" fill="#049fd9" className="group-hover:fill-emerald-500 transition-colors"/>
                  <rect x="125" y="25" width="8" height="20" fill="#049fd9" opacity="0.7"/>
                  <rect x="140" y="15" width="8" height="50" fill="#049fd9" className="group-hover:fill-emerald-500 transition-colors"/>
                  <rect x="140" y="15" width="8" height="25" fill="#049fd9" opacity="0.7"/>
                  <rect x="155" y="20" width="8" height="45" fill="#049fd9" className="group-hover:fill-emerald-500 transition-colors"/>
                  <rect x="155" y="20" width="8" height="22" fill="#049fd9" opacity="0.7"/>
                  <rect x="170" y="25" width="8" height="40" fill="#049fd9" className="group-hover:fill-emerald-500 transition-colors"/>
                  <rect x="170" y="25" width="8" height="20" fill="#049fd9" opacity="0.7"/>
                </svg>
              </div>

              <div className="text-center">
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Cisco Certified</h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Network Professional</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Award size={16} className="text-emerald-500" />
                  <span className="text-sm font-mono text-emerald-500">CCNA / CCNP</span>
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
                  Ver Credencial <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>

            {/* Google Certification */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className={`group relative p-8 border-2 transition-all hover:shadow-2xl hover:-translate-y-2 ${isDark ? 'bg-gray-800 border-gray-700 hover:border-emerald-400' : 'bg-white border-gray-200 hover:border-emerald-500'}`}>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={20} className="text-emerald-500" />
              </div>

              <div className="flex items-center justify-center mb-6 h-20">
                {/* Google Logo */}
                <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
                  <path d="M50 20C33.43 20 20 33.43 20 50C20 66.57 33.43 80 50 80C66.57 80 80 66.57 80 50C80 48.5 79.87 47.03 79.63 45.6H50V54.4H66.32C65.42 58.93 62.52 62.73 58.37 65.07V71.43H69.58C75.83 65.63 79.5 57.4 79.5 48C79.5 46.5 79.37 45.03 79.13 43.6H50V52.4H66.32C65.67 55.43 64.03 58.07 61.67 59.93L50 59.93V52.4H66.32C65.67 55.43 64.03 58.07 61.67 59.93" fill="#4285F4" className="group-hover:fill-emerald-500 transition-colors"/>
                  <circle cx="50" cy="50" r="25" stroke="#EA4335" strokeWidth="3" className="group-hover:stroke-emerald-500 transition-colors" fill="none"/>
                  <path d="M35 50C35 45.5 36.5 41.5 39 38.5L31 32C26.5 37 24 43 24 50C24 57 26.5 63 31 68L39 61.5C36.5 58.5 35 54.5 35 50Z" fill="#FBBC05" className="group-hover:fill-emerald-600 transition-colors"/>
                  <path d="M50 65C54.5 65 58.5 63.5 61.5 61L69 67C63 71.5 56 74 50 74C43 74 37 71.5 32 68L40 61.5C42 63.5 45.5 65 50 65Z" fill="#34A853" className="group-hover:fill-emerald-700 transition-colors"/>
                </svg>
              </div>

              <div className="text-center">
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Google Cloud</h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Certified Professional</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Award size={16} className="text-emerald-500" />
                  <span className="text-sm font-mono text-emerald-500">GCP Developer</span>
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
                  Ver Credencial <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>

            {/* Microsoft Certification */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className={`group relative p-8 border-2 transition-all hover:shadow-2xl hover:-translate-y-2 ${isDark ? 'bg-gray-800 border-gray-700 hover:border-emerald-400' : 'bg-white border-gray-200 hover:border-emerald-500'}`}>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={20} className="text-emerald-500" />
              </div>

              <div className="flex items-center justify-center mb-6 h-20">
                {/* Microsoft Logo - 4 cuadrados */}
                <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
                  <rect x="10" y="10" width="38" height="38" fill="#F25022" className="group-hover:fill-emerald-500 transition-colors"/>
                  <rect x="52" y="10" width="38" height="38" fill="#7FBA00" className="group-hover:fill-emerald-600 transition-colors"/>
                  <rect x="10" y="52" width="38" height="38" fill="#00A4EF" className="group-hover:fill-emerald-400 transition-colors"/>
                  <rect x="52" y="52" width="38" height="38" fill="#FFB900" className="group-hover:fill-emerald-300 transition-colors"/>
                </svg>
              </div>

              <div className="text-center">
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Microsoft Azure</h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Certified Developer</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Award size={16} className="text-emerald-500" />
                  <span className="text-sm font-mono text-emerald-500">AZ-204</span>
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
                  Ver Credencial <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-emerald-500 mb-2">3+</p>
              <p className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Certificaciones</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-500 mb-2">5+</p>
              <p className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Años Experiencia</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-500 mb-2">50+</p>
              <p className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Proyectos Completados</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-500 mb-2">10+</p>
              <p className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Tecnologías Implementadas</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

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
                        showDescription={true}
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
                        showDescription={true}
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
            <h4 className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-4">Proyectos Destacados</h4>
            <h2 className="text-4xl md:text-5xl font-bold">Soluciones Empresariales</h2>
            <p className={`mt-4 text-lg max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Proyectos desarrollados para clientes empresariales bajo acuerdos de confidencialidad.
            </p>
          </div>
          <motion.a
            href="https://github.com/pedrovarela"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 border-2 font-bold transition-colors flex items-center gap-2 ${isDark ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}>
            Ver GitHub <ExternalLink size={18} />
          </motion.a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Plataforma INNOVA MUJER & SIRM",
              cat: "Python • JavaScript • PostgreSQL • Linux",
              type: "BID - Programa Ciudad Mujer",
              year: "2021 - 2025",
              impact: "Ecosistema digital integrado para 50K+ usuarias",
              role: "Consultor Especialista en Tecnología",
              confidential: false,
              url: ""
            },
            {
              title: "Observatorio de Derechos Humanos (ODH)",
              cat: "Python • JavaScript • PostgreSQL • Nginx",
              type: "SEDH - USAID/DAI",
              year: "2019 - 2020",
              impact: "Plataforma de visualización y recolección de datos nacional",
              role: "Arquitecto de Soluciones Full-Stack",
              confidential: false,
              url: "https://odh.sedh.gob.hn"
            },
            {
              title: "SIPNADH - Sistema de Políticas Públicas",
              cat: "Python • JavaScript • PostgreSQL • Linux",
              type: "SEDH - GIZ",
              year: "2019",
              impact: "Gestión digital de Plan Nacional de Acción en DDHH",
              role: "Lead Developer",
              confidential: false,
              url: "https://sipnadh.sedh.gob.hn/"
            },
            {
              title: "Sistema de Gestión Empresarial ERP",
              cat: "React • Node.js • PostgreSQL • Docker",
              type: "Cliente Confidencial - Sector Retail",
              year: "2023",
              impact: "Reducción del 40% en tiempo de procesamiento operativo",
              role: "Lead Fullstack Developer",
              confidential: true,
              url: ""
            },
            {
              title: "Sistema Nacional de Información Ambiental",
              cat: "Python • JavaScript • MySQL • Linux",
              type: "MiAmbiente - PNUD",
              year: "2016 - 2018",
              impact: "Portal gubernamental con 10+ módulos integrados",
              role: "Consultor en Desarrollo e Implementación",
              confidential: false,
              url: "http://www.miambiente.gob.hn"
            },
            {
              title: "RETC - Registro de Emisiones y Transferencias",
              cat: "Python • JavaScript • MySQL • Nginx",
              type: "MiAmbiente/CESCCO - PNUD",
              year: "2016 - 2018",
              impact: "Sistema nacional de monitoreo de contaminantes",
              role: "Diseñador Web & Desarrollador",
              confidential: false,
              url: "http://www.retchn.org/"
            },
            {
              title: "Plataforma E-Commerce B2B",
              cat: "Next.js • Python • AWS • Stripe",
              type: "Cliente Confidencial - Fortune 500",
              year: "2022",
              impact: "100K+ transacciones mensuales procesadas",
              role: "Backend Architect",
              confidential: true,
              url: ""
            },
            {
              title: "Sistema de Punto de Venta & Contabilidad",
              cat: "PHP • Python • PostgreSQL • MySQL • AWS",
              type: "Grupo Tecnológico CROP",
              year: "2020",
              impact: "Suite empresarial con inventario y reportería avanzada",
              role: "Fullstack Developer",
              confidential: true,
              url: ""
            },
            {
              title: "App Móvil de Seguimiento de Proyectos",
              cat: "Java • SQLite • MySQL • AWS",
              type: "Fundación GLANF",
              year: "2018 - 2019",
              impact: "Control en campo de proyectos sociales con sincronización offline",
              role: "Desarrollador Android Full-Stack",
              confidential: false,
              url: ""
            },
            {
              title: "Plataforma de Encuestas sobre Cambio Climático",
              cat: "Python • JavaScript • MySQL • Linux",
              type: "MiAmbiente/SINIA",
              year: "2016 - 2018",
              impact: "Recolección de datos nacionales sobre sostenibilidad",
              role: "Desarrollador Full-Stack",
              confidential: false,
              url: "http://encuestas.miambiente.gob.hn/"
            },
            {
              title: "Sistema de Inventario IoT",
              cat: "Angular • Python • MongoDB • AWS IoT",
              type: "Cliente Confidencial - Manufactura",
              year: "2021",
              impact: "500+ sensores integrados, 99.9% uptime",
              role: "Fullstack Developer",
              confidential: true,
              url: ""
            },
            {
              title: "App Móvil de Logística en Tiempo Real",
              cat: "React Native • Django • PostgreSQL",
              type: "Cliente Confidencial - Logística",
              year: "2020",
              impact: "50+ vehículos monitoreados, reducción 30% en tiempos",
              role: "Mobile Lead Developer",
              confidential: true,
              url: ""
            }
          ].map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`project-card group p-6 backdrop-blur-lg transition-all hover:shadow-2xl border-2 ${isDark ? 'bg-gray-800/50 border-gray-700 hover:border-emerald-400' : 'bg-white/80 border-gray-200 hover:border-emerald-500'}`}
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}>

              {/* Header with confidential badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold group-hover:text-emerald-500 transition-colors">{project.title}</h3>
                  </div>
                  <p className={`text-xs font-semibold mb-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{project.type}</p>
                  <p className={`text-xs font-mono font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{project.year}</p>
                </div>
                {project.confidential && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-emerald-500 text-xs font-bold uppercase">NDA</span>
                  </div>
                )}
              </div>

              {/* Tech Stack */}
              <p className={`font-medium uppercase tracking-wide text-sm font-mono mb-4 pb-4 border-b ${isDark ? 'text-gray-500 border-gray-700' : 'text-gray-500 border-gray-200'}`}>
                {project.cat}
              </p>

              {/* Role */}
              <div className="mb-3">
                <p className={`text-xs uppercase tracking-wider font-bold mb-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Mi Rol</p>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.role}</p>
              </div>

              {/* Impact */}
              <div className="mb-4">
                <p className={`text-xs uppercase tracking-wider font-bold mb-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Impacto</p>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{project.impact}</p>
              </div>

              {/* Footer note or link */}
              {project.confidential ? (
                <div className={`mt-4 pt-4 border-t text-xs italic ${isDark ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-500'}`}>
                  Código fuente bajo acuerdo de confidencialidad con el cliente
                </div>
              ) : project.url ? (
                <div className="mt-4 pt-4 border-t">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
                    Ver Proyecto en Vivo <ExternalLink size={14} />
                  </a>
                </div>
              ) : (
                <div className={`mt-4 pt-4 border-t text-xs ${isDark ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-500'}`}>
                  Proyecto implementado y en producción
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Open Source CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className={`mt-16 p-8 rounded-2xl border-2 text-center ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
          <h3 className="text-2xl font-bold mb-3">¿Quieres ver código real?</h3>
          <p className={`mb-6 max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Visita mi GitHub para proyectos open source donde demuestro las mismas tecnologías y arquitecturas que uso en proyectos empresariales.
          </p>
          <motion.a
            href="https://github.com/pedrovarela"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 font-bold rounded-lg hover:bg-emerald-600 transition-colors">
            <Github size={20} />
            Ver Proyectos Open Source
          </motion.a>
        </motion.div>
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
                  <p className="text-xl font-bold">Honduras</p>
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