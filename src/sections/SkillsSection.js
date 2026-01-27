import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Terminal, Database } from 'lucide-react';
import { frontendSkills, backendSkills, mobileSkills, databases, tools } from '../data/skills';
import { SkillBar } from '../components/ui/SkillBar';
import { useLanguage } from '../LanguageContext';

export const SkillsSection = () => {
  const { language } = useLanguage();

  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-black text-white">
       <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
             <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4">
               {language === 'es' ? 'Competencia Técnica' : 'Technical Skills'}
             </h4>
             <h2 className="text-4xl md:text-5xl font-bold mb-6">
               {language === 'es' ? 'Mi Stack Tecnológico' : 'My Tech Stack'}
             </h2>
             <p className="text-gray-400 text-lg">
               {language === 'es'
                 ? 'Herramientas y tecnologías con las que construyo soluciones de alto impacto.'
                 : 'Tools and technologies I use to build high-impact solutions.'}
             </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

             {/* Frontend */}
             <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                   <Code className="text-emerald-400" />
                   <h3 className="text-2xl font-bold">Frontend</h3>
                </div>
                {frontendSkills.map((skill, idx) => (
                   <SkillBar key={skill.name} skill={skill} index={idx} />
                ))}
             </div>

             {/* Backend */}
             <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                   <Server className="text-emerald-400" />
                   <h3 className="text-2xl font-bold">Backend</h3>
                </div>
                 {backendSkills.map((skill, idx) => (
                   <SkillBar key={skill.name} skill={skill} index={idx} />
                ))}
             </div>

             {/* Mobile Development */}
             <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                   <Terminal className="text-emerald-400" />
                   <h3 className="text-2xl font-bold">
                     {language === 'es' ? 'Desarrollo Móvil' : 'Mobile Development'}
                   </h3>
                </div>
                 {mobileSkills.map((skill, idx) => (
                   <SkillBar key={skill.name} skill={skill} index={idx} />
                ))}
             </div>

          </div>

          {/* Databases & Tools Row */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
             {/* Databases */}
             <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                   <Database className="text-emerald-400" />
                   <h3 className="text-2xl font-bold">
                     {language === 'es' ? 'Bases de Datos' : 'Databases'}
                   </h3>
                </div>
                 <div className="flex flex-wrap gap-2">
                   {databases.map((db, idx) => (
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
                   <h3 className="text-2xl font-bold">
                     {language === 'es' ? 'Herramientas' : 'Tools'}
                   </h3>
                </div>
                 <div className="flex flex-wrap gap-2">
                   {tools.map((tool, idx) => (
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
  );
};

export default SkillsSection;
