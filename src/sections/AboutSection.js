import React from 'react';
import { motion } from 'framer-motion';
import { Database, Code } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

export const AboutSection = () => {
  const { isDark } = useTheme();
  const { t, language } = useLanguage();

  return (
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
            <p className="font-medium">{language === 'es' ? 'Proyectos desplegados en entornos de producción.' : 'Projects deployed in production environments.'}</p>
          </div>
        </div>

        <div className="order-1 md:order-2 space-y-6">
          <h4 className="text-emerald-500 font-bold uppercase tracking-widest text-sm">{t('about.tag')}</h4>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">{t('about.title')}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {t('about.p1')}
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            {t('about.p2')}
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex gap-3">
               <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-emerald-600">
                  <Database size={24} />
               </div>
               <div>
                  <h3 className="font-bold text-lg">Backend</h3>
                  <p className="text-gray-500 text-sm">{language === 'es' ? 'Sólido y Escalable' : 'Solid & Scalable'}</p>
               </div>
            </div>
            <div className="flex gap-3">
               <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-emerald-600">
                  <Code size={24} />
               </div>
               <div>
                  <h3 className="font-bold text-lg">Frontend</h3>
                  <p className="text-gray-500 text-sm">{language === 'es' ? 'Interactivo y Rápido' : 'Interactive & Fast'}</p>
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
          <p className={`text-sm md:text-base uppercase tracking-wider font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'es' ? 'Certificaciones' : 'Certifications'}
          </p>
        </div>
        <div>
          <p className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">8+</p>
          <p className={`text-sm md:text-base uppercase tracking-wider font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('about.statsYears')}
          </p>
        </div>
        <div>
          <p className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">10+</p>
          <p className={`text-sm md:text-base uppercase tracking-wider font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('about.statsProjects')}
          </p>
        </div>
        <div>
          <p className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">10+</p>
          <p className={`text-sm md:text-base uppercase tracking-wider font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'es' ? 'Tecnologías Implementadas' : 'Technologies Implemented'}
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default AboutSection;
