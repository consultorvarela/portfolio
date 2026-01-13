import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export const CertificationsSection = () => {
  const { isDark } = useTheme();

  const certifications = [
    {
      name: 'Cisco Certified',
      subtitle: 'Network Professional',
      badge: 'CCNA / CCNP',
      url: '#'
    },
    {
      name: 'Google Cloud',
      subtitle: 'Certified Professional',
      badge: 'GCP Developer',
      url: '#'
    },
    {
      name: 'Microsoft Azure',
      subtitle: 'Certified Developer',
      badge: 'AZ-204',
      url: '#'
    }
  ];

  return (
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
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`group relative p-8 border-2 transition-all hover:shadow-2xl hover:-translate-y-2 ${isDark ? 'bg-gray-800 border-gray-700 hover:border-emerald-400' : 'bg-white border-gray-200 hover:border-emerald-500'}`}>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={20} className="text-emerald-500" />
              </div>

              <div className="flex items-center justify-center mb-6 h-20">
                <Award size={64} className="text-emerald-500" />
              </div>

              <div className="text-center">
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{cert.name}</h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{cert.subtitle}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Award size={16} className="text-emerald-500" />
                  <span className="text-sm font-mono text-emerald-500">{cert.badge}</span>
                </div>
                <a href={cert.url} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
                  Ver Credencial <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
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
  );
};

export default CertificationsSection;
