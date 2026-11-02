import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Database, Cloud, ShieldCheck, ClipboardList } from 'lucide-react';
import { skillGroups } from '../data/skills';
import { useLanguage } from '../LanguageContext';

const icons = {
  backend: Server,
  frontend: Code,
  data: Database,
  infra: Cloud,
  security: ShieldCheck,
  methods: ClipboardList,
};

export const SkillsSection = () => {
  const { language } = useLanguage();
  const es = language === 'es';

  return (
    <section id="skills" className="py-24 lg:py-10 px-6 md:px-12 bg-black text-white lg:min-h-[calc(100vh-80px)] lg:flex lg:flex-col lg:justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 lg:mb-10 max-w-2xl mx-auto">
          <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4">
            {es ? 'Competencia Técnica' : 'Technical Skills'}
          </h4>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 lg:mb-4">
            {es ? 'Mi Stack Tecnológico' : 'My Tech Stack'}
          </h2>
          <p className="text-gray-400 text-lg">
            {es
              ? 'Tecnologías que he usado en plataformas en producción para instituciones públicas y organismos internacionales.'
              : 'Technologies I have used in production platforms for public institutions and international organizations.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gIdx) => {
            const Icon = icons[group.key] || Code;
            const items = es ? group.items : (group.itemsEn || group.items);
            return (
              <motion.div
                key={group.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: gIdx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-gray-800 bg-gray-900/60 hover:border-emerald-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-5">
                  <Icon className="text-emerald-400" size={24} />
                  <h3 className="text-xl font-bold">{es ? group.title : group.titleEn}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 border border-emerald-500/30 rounded-md text-emerald-100 text-sm hover:bg-emerald-500/20 transition-colors cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
