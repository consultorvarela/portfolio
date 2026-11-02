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
      title: 'Especialista en Arquitectura y Desarrollo de Software',
      location: 'Con base en',
      country: 'Honduras',
      console: 'console.log("Hello World! I\'m Pedro Varela")',
      description: 'Más de 10 años desarrollando plataformas de información para organismos internacionales e instituciones públicas.',
      descriptionFull: 'Más de 10 años diseñando, desarrollando e implementando plataformas de información para organismos internacionales (BID, FAO, GIZ, Unión Europea, USAID) e instituciones públicas de Honduras.',
      cta: 'Contrátame',
      follow: 'Sígueme:'
    },
    about: {
      tag: 'ACERCA DE MÍ',
      title: 'Del diagnóstico a la transferencia tecnológica.',
      p1: 'Especialista en arquitectura y desarrollo de software full stack con más de 10 años de experiencia en proyectos tecnológicos para organismos internacionales (BID, FAO, GIZ, Unión Europea, USAID) e instituciones públicas de Honduras. Diseño e implemento plataformas que sistematizan información institucional y respaldan programas de derechos humanos, equidad de género y desarrollo sostenible con miles de beneficiarios directos.',
      p2: 'Trabajo principalmente con Python/Django, PostgreSQL, APIs REST y React, y gestiono el ciclo completo de una consultoría: diagnóstico, diseño de arquitectura, desarrollo, implementación, capacitación de usuarios y transferencia tecnológica. Maestría en Administración de Proyectos y miembro activo del PMI.',
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
      subtitle: 'Una selección de plataformas desarrolladas para instituciones públicas y organismos internacionales.',
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
      title: 'Software Architecture & Development Specialist',
      location: 'Based in',
      country: 'Honduras',
      console: 'console.log("Hello World! I\'m Pedro Varela")',
      description: '10+ years building information platforms for international organizations and public institutions.',
      descriptionFull: '10+ years designing, building and deploying information platforms for international organizations (IDB, FAO, GIZ, European Union, USAID) and public institutions in Honduras.',
      cta: 'Hire Me',
      follow: 'Follow me:'
    },
    about: {
      tag: 'ABOUT ME',
      title: 'From assessment to technology transfer.',
      p1: 'Full stack software architecture and development specialist with over 10 years of experience in technology projects for international organizations (IDB, FAO, GIZ, European Union, USAID) and public institutions in Honduras. I design and deploy platforms that systematize institutional information and support human rights, gender equality and sustainable development programs with thousands of direct beneficiaries.',
      p2: 'I work mainly with Python/Django, PostgreSQL, REST APIs and React, and I manage the full consultancy cycle: assessment, architecture design, development, deployment, user training and technology transfer. Master in Project Management and active PMI member.',
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
      subtitle: 'A selection of platforms built for public institutions and international organizations.',
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
