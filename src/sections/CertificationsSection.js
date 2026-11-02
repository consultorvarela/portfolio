import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

const certifications = [
  {
    issuer: 'Google',
    title: 'Ciberseguridad',
    titleEn: 'Cybersecurity',
    year: '2026',
    highlight: true,
    items: [
      'Foundations of Cybersecurity',
      'Play It Safe: Manage Security Risks',
      'Connect and Protect: Networks and Network Security',
    ],
  },
  {
    issuer: 'Cisco',
    title: 'Python y Linux',
    titleEn: 'Python & Linux',
    year: '2019 - 2026',
    items: ['Python Essentials 1', 'Python Essentials 2', 'NDG Linux'],
  },
  {
    issuer: 'Platzi',
    title: 'Ingeniería de Software y DevOps',
    titleEn: 'Software Engineering & DevOps',
    year: '2019 - 2026',
    items: ['Ingeniería de Software', 'Introducción a DevOps y Docker', 'Git y GitHub · Flask · JavaScript ES6+'],
    itemsEn: ['Software Engineering', 'Introduction to DevOps and Docker', 'Git & GitHub · Flask · JavaScript ES6+'],
  },
  {
    issuer: 'Microsoft',
    title: 'Cloud Computing',
    titleEn: 'Cloud Computing',
    year: '2025 - 2026',
    items: ['Cloud Computing'],
  },
  {
    issuer: 'Adobe',
    title: 'Diseño de UX',
    titleEn: 'UX Design',
    year: '2025 - 2026',
    items: ['Diseño de experiencia de usuario'],
    itemsEn: ['User experience design'],
  },
  {
    issuer: 'PMI',
    title: 'Project Management Institute',
    titleEn: 'Project Management Institute',
    year: 'Miembro activo',
    yearEn: 'Active member',
    items: ['Maestría con acreditación PMI (UNITEC)', 'Certificación Scrum Master'],
    itemsEn: ['PMI-accredited Master\'s degree (UNITEC)', 'Scrum Master certification'],
  },
];

export const CertificationsSection = () => {
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const es = language === 'es';

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      id="certifications"
      className={`py-24 lg:py-10 px-6 md:px-12 lg:min-h-[calc(100vh-80px)] lg:flex lg:flex-col lg:justify-center ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 lg:mb-10 max-w-2xl mx-auto">
          <h4 className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-4">
            {es ? 'Formación Continua' : 'Continuous Learning'}
          </h4>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 lg:mb-4">
            {es ? 'Certificaciones' : 'Certifications'}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {es
              ? 'Cursos y certificaciones recientes en seguridad, desarrollo e infraestructura.'
              : 'Recent courses and certifications in security, development and infrastructure.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => {
            const Icon = cert.highlight ? ShieldCheck : Award;
            const items = es ? cert.items : (cert.itemsEn || cert.items);
            return (
              <motion.div
                key={cert.issuer}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 border-2 transition-all hover:shadow-xl ${cert.highlight
                  ? (isDark ? 'bg-gray-800 border-emerald-500/60' : 'bg-emerald-50/60 border-emerald-400')
                  : (isDark ? 'bg-gray-800 border-gray-700 hover:border-emerald-400' : 'bg-white border-gray-200 hover:border-emerald-500')}`}>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-500">{cert.issuer}</p>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {es ? cert.title : cert.titleEn}
                    </h3>
                  </div>
                  <Icon size={28} className="text-emerald-500 shrink-0" />
                </div>
                <ul className={`space-y-1.5 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-emerald-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className={`mt-4 text-xs font-mono ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {es ? cert.year : (cert.yearEn || cert.year)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default CertificationsSection;
