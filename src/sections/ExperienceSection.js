import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';
import { educationData } from '../data/education';
import { experienceData } from '../data/experience';
import { TimelineItem } from '../components/ui/TimelineItem';
import { useLanguage } from '../LanguageContext';

const CompactItem = ({ item, language }) => {
  const es = language === 'es';
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="border-l-2 border-emerald-400 bg-gray-900/60 rounded-r-lg px-4 py-2">
      <p className="text-xs text-emerald-400 font-mono font-semibold">{es ? item.year : (item.yearEn || item.year)}</p>
      <h4 className="text-[15px] font-bold leading-snug">{es ? item.title : (item.titleEn || item.title)}</h4>
      <p className="text-sm text-gray-400 leading-snug">{es ? item.subtitle : (item.subtitleEn || item.subtitle)}</p>
    </motion.div>
  );
};

export const ExperienceSection = () => {
  const { language } = useLanguage();

  return (
    <section id="experience" className="py-24 lg:py-10 px-6 md:px-12 bg-black text-white lg:min-h-[calc(100vh-80px)] lg:flex lg:flex-col lg:justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 lg:mb-8 max-w-2xl mx-auto">
           <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4">
             {language === 'es' ? 'Trayectoria Profesional' : 'Professional Journey'}
           </h4>
           <h2 className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold mb-6 lg:mb-0">
             {language === 'es' ? 'Experiencia & Educación' : 'Experience & Education'}
           </h2>
           <p className="text-gray-400 text-lg lg:hidden">
             {language === 'es'
               ? 'Un resumen de mi crecimiento académico y laboral.'
               : 'A summary of my academic and professional growth.'}
           </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:hidden">
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
                  <h3 className="text-3xl font-bold">
                    {language === 'es' ? 'Educación' : 'Education'}
                  </h3>
              </motion.div>
              <div className="relative pl-4">
                  {educationData.map((item, idx) => (
                    <TimelineItem
                      key={item.title + item.year}
                      year={language === 'es' ? item.year : (item.yearEn || item.year)}
                      title={language === 'es' ? item.title : (item.titleEn || item.title)}
                      subtitle={language === 'es' ? item.subtitle : (item.subtitleEn || item.subtitle)}
                      description={language === 'es' ? item.description : (item.descriptionEn || item.description)}
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
                  <h3 className="text-3xl font-bold">
                    {language === 'es' ? 'Experiencia Laboral' : 'Work Experience'}
                  </h3>
              </motion.div>
              <div className="relative pl-4">
                  {experienceData.map((item, idx) => (
                    <TimelineItem
                      key={item.title + item.year}
                      year={language === 'es' ? item.year : (item.yearEn || item.year)}
                      title={language === 'es' ? item.title : (item.titleEn || item.title)}
                      subtitle={language === 'es' ? item.subtitle : (item.subtitleEn || item.subtitle)}
                      description={language === 'es' ? item.description : (item.descriptionEn || item.description)}
                      isLast={idx === experienceData.length - 1}
                      icon={Briefcase}
                      index={idx}
                      showDescription={true}
                    />
                  ))}
              </div>
          </motion.div>
        </div>

        {/* Vista compacta (pantallas grandes): cabe completa en la pantalla */}
        <div className="hidden lg:grid grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <GraduationCap className="text-emerald-400" size={26} />
              <h3 className="text-2xl font-bold">{language === 'es' ? 'Educación' : 'Education'}</h3>
            </div>
            <div className="space-y-3">
              {educationData.map((item) => (
                <CompactItem key={item.title} item={item} language={language} />
              ))}
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex items-center gap-3 mb-5">
              <Briefcase className="text-emerald-400" size={26} />
              <h3 className="text-2xl font-bold">{language === 'es' ? 'Experiencia Laboral' : 'Work Experience'}</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {experienceData.map((item) => (
                <CompactItem key={item.title + item.year} item={item} language={language} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
