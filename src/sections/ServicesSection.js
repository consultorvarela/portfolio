import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { servicesData } from '../data/services';

export const ServicesSection = () => {
  const { isDark } = useTheme();

  return (
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
          {servicesData.map((service, idx) => (
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
  );
};

export default ServicesSection;
