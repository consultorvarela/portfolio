import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, MapPin } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export const ContactSection = () => {
  const { isDark } = useTheme();

  return (
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
                <a href="mailto:consultorvarela@gmail.com" className="text-xl font-bold hover:text-emerald-400 transition-colors">consultorvarela@gmail.com</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-emerald-400">
                <Github />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Revisa mi Código</p>
                <a href="https://github.com/consultorvarela" target="_blank" rel="noopener noreferrer" className="text-xl font-bold hover:text-emerald-400 transition-colors">github.com/consultorvarela</a>
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

        {/* Contact Form - Commented out until implementation */}
        {/* <motion.div
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
        </motion.div> */}
      </div>
    </motion.section>
  );
};

export default ContactSection;
