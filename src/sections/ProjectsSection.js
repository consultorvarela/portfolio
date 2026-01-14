import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { projectsData } from '../data/projects';

export const ProjectsSection = () => {
  const { isDark } = useTheme();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      id="projects"
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h4 className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-4">Proyectos Destacados</h4>
          <h2 className="text-4xl md:text-5xl font-bold">Soluciones Empresariales</h2>
          <p className={`mt-4 text-lg max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Proyectos desarrollados para clientes empresariales bajo acuerdos de confidencialidad.
          </p>
        </div>
        <motion.a
          href="https://github.com/consultorvarela"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 border-2 font-bold transition-colors flex items-center gap-2 ${isDark ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}>
          Ver GitHub <ExternalLink size={18} />
        </motion.a>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`project-card group p-6 backdrop-blur-lg transition-all hover:shadow-2xl border-2 ${isDark ? 'bg-gray-800/50 border-gray-700 hover:border-emerald-400' : 'bg-white/80 border-gray-200 hover:border-emerald-500'}`}
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}>

            {/* Header with confidential badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold group-hover:text-emerald-500 transition-colors">{project.title}</h3>
                </div>
                <p className={`text-xs font-semibold mb-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{project.type}</p>
                <p className={`text-xs font-mono font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{project.year}</p>
              </div>
              {project.confidential && (
                <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-emerald-500 text-xs font-bold uppercase">NDA</span>
                </div>
              )}
            </div>

            {/* Tech Stack */}
            <p className={`font-medium uppercase tracking-wide text-sm font-mono mb-4 pb-4 border-b ${isDark ? 'text-gray-500 border-gray-700' : 'text-gray-500 border-gray-200'}`}>
              {project.cat}
            </p>

            {/* Role */}
            <div className="mb-3">
              <p className={`text-xs uppercase tracking-wider font-bold mb-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Mi Rol</p>
              <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.role}</p>
            </div>

            {/* Impact */}
            <div className="mb-4">
              <p className={`text-xs uppercase tracking-wider font-bold mb-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Impacto</p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{project.impact}</p>
            </div>

            {/* Footer note or link */}
            {project.confidential ? (
              <div className={`mt-4 pt-4 border-t text-xs italic ${isDark ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-500'}`}>
                Código fuente bajo acuerdo de confidencialidad con el cliente
              </div>
            ) : project.url ? (
              <div className="mt-4 pt-4 border-t">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
                  Ver Proyecto en Vivo <ExternalLink size={14} />
                </a>
              </div>
            ) : (
              <div className={`mt-4 pt-4 border-t text-xs ${isDark ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-500'}`}>
                Proyecto implementado y en producción
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Open Source CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className={`mt-16 p-8 rounded-2xl border-2 text-center ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <h3 className="text-2xl font-bold mb-3">¿Quieres ver código real?</h3>
        <p className={`mb-6 max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Visita mi GitHub para proyectos open source donde demuestro las mismas tecnologías y arquitecturas que uso en proyectos empresariales.
        </p>
        <motion.a
          href="https://github.com/consultorvarela"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 font-bold rounded-lg hover:bg-emerald-600 transition-colors">
          <Github size={20} />
          Ver Proyectos Open Source
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

export default ProjectsSection;
