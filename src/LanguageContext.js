import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'es';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Acerca',
      skills: 'Habilidades',
      experience: 'Experiencia',
      projects: 'Proyectos',
      contact: 'Contacto',
      blog: 'Blog'
    },
    hero: {
      greeting: 'Pedro Varela',
      title: 'Desarrollador Fullstack',
      location: 'Con base en',
      country: 'Honduras',
      console: 'console.log("Hello World! I\'m Pedro Varela")',
      description: 'Transformo ideas en soluciones digitales escalables. Especializado en aplicaciones web de alto rendimiento.',
      descriptionFull: 'Transformo ideas en soluciones digitales escalables. Especializado en crear aplicaciones web de alto rendimiento con arquitecturas backend sólidas y experiencias frontend intuitivas.',
      cta: 'Contrátame',
      follow: 'Sígueme:'
    },
    about: {
      tag: 'ACERCA DE MÍ',
      title: 'Hablo JavaScript y Python con fluidez.',
      p1: 'Mi pasión es en la intersección entre la lógica y la creatividad. Comencé como desarrollador autodidacta y he evolucionado hacia un ingeniero fullstack capaz de manejar todo el ciclo de vida del desarrollo de software.',
      p2: 'Hoy, me especializo en construir aplicaciones web escalables utilizando tecnologías modernas. Mi enfoque combina código limpio con soluciones pragmáticas que generan valor real para el negocio.',
      statsYears: 'Años de experiencia',
      statsProjects: 'Proyectos en producción'
    },
    skills: {
      tag: 'HABILIDADES',
      title: 'Mi Stack Tecnológico',
      subtitle: 'Herramientas y tecnologías que domino para crear soluciones completas.'
    },
    experience: {
      tag: 'EXPERIENCIA',
      title: 'Mi Trayectoria Profesional',
      present: 'Presente'
    },
    projects: {
      tag: 'PROYECTOS',
      title: 'Trabajo Destacado',
      subtitle: 'Una selección de proyectos que demuestran mi experiencia en desarrollo fullstack.',
      viewProject: 'Ver Proyecto',
      viewCode: 'Ver Código'
    },
    contact: {
      tag: 'CONTACTO',
      title: 'Trabajemos Juntos',
      subtitle: '¿Tienes un proyecto en mente? Me encantaría escucharte.',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'tu@email.com',
      messagePlaceholder: '¿En qué puedo ayudarte?',
      send: 'Enviar Mensaje',
      sending: 'Enviando...',
      success: '¡Mensaje enviado!',
      successDesc: 'Te responderé pronto.',
      error: 'Error al enviar',
      errorDesc: 'Por favor intenta de nuevo.'
    },
    footer: {
      built: 'Diseñado y desarrollado por',
      rights: 'Todos los derechos reservados.'
    },
    blog: {
      title: 'Blog',
      subtitle: 'Reflexiones y aprendizajes sobre desarrollo de software, arquitectura y tecnología.',
      back: 'Volver al inicio',
      backToBlog: 'Volver al blog',
      readMore: 'Leer más',
      readTime: 'de lectura',
      share: 'Compartir:',
      listen: 'Escuchar artículo',
      pause: 'Pausar',
      continue: 'Continuar',
      noPosts: 'No hay artículos publicados todavía.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      blog: 'Blog'
    },
    hero: {
      greeting: 'Pedro Varela',
      title: 'Fullstack Developer',
      location: 'Based in',
      country: 'Honduras',
      console: 'console.log("Hello World! I\'m Pedro Varela")',
      description: 'I transform ideas into scalable digital solutions. Specialized in high-performance web applications.',
      descriptionFull: 'I transform ideas into scalable digital solutions. Specialized in building high-performance web applications with solid backend architectures and intuitive frontend experiences.',
      cta: 'Hire Me',
      follow: 'Follow me:'
    },
    about: {
      tag: 'ABOUT ME',
      title: 'I speak JavaScript and Python fluently.',
      p1: 'My passion lies at the intersection of logic and creativity. I started as a self-taught developer and have evolved into a fullstack engineer capable of handling the entire software development lifecycle.',
      p2: 'Today, I specialize in building scalable web applications using modern technologies. My approach combines clean code with pragmatic solutions that deliver real business value.',
      statsYears: 'Years of experience',
      statsProjects: 'Projects in production'
    },
    skills: {
      tag: 'SKILLS',
      title: 'My Tech Stack',
      subtitle: 'Tools and technologies I master to create complete solutions.'
    },
    experience: {
      tag: 'EXPERIENCE',
      title: 'My Professional Journey',
      present: 'Present'
    },
    projects: {
      tag: 'PROJECTS',
      title: 'Featured Work',
      subtitle: 'A selection of projects showcasing my fullstack development expertise.',
      viewProject: 'View Project',
      viewCode: 'View Code'
    },
    contact: {
      tag: 'CONTACT',
      title: "Let's Work Together",
      subtitle: 'Have a project in mind? I would love to hear from you.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'you@email.com',
      messagePlaceholder: 'How can I help you?',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent!',
      successDesc: "I'll get back to you soon.",
      error: 'Error sending',
      errorDesc: 'Please try again.'
    },
    footer: {
      built: 'Designed and developed by',
      rights: 'All rights reserved.'
    },
    blog: {
      title: 'Blog',
      subtitle: 'Thoughts and learnings about software development, architecture and technology.',
      back: 'Back to home',
      backToBlog: 'Back to blog',
      readMore: 'Read more',
      readTime: 'read',
      share: 'Share:',
      listen: 'Listen to article',
      pause: 'Pause',
      continue: 'Continue',
      noPosts: 'No articles published yet.'
    }
  }
};

export default LanguageContext;
