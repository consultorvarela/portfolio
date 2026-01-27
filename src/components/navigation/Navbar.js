import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Github, Globe, Linkedin, BookOpen } from 'lucide-react';
import { useTheme } from '../../ThemeContext';

export const Navbar = ({ activeSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const menuItems = ['Inicio', 'Acerca', 'Habilidades', 'Experiencia', 'Proyectos', 'Contacto'];
  const menuIds = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 flex justify-between items-center transition-all duration-300 border-b ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
      <Link to="/" className="flex items-center gap-2 cursor-pointer" onClick={() => isHomePage && scrollToSection && scrollToSection('home')}>
        <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center">
          <span className="text-white font-bold text-lg italic">P</span>
        </div>
        <span className="font-bold text-xl tracking-tight">Pedro</span>
      </Link>

      {/* Desktop Menu */}
      <div className={`hidden md:flex items-center gap-8 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {isHomePage && menuItems.map((item, index) => {
          const id = menuIds[index];
          const isActive = activeSection === id;
          return (
            <button
              key={item}
              onClick={() => scrollToSection && scrollToSection(id)}
              className={`flex items-center gap-2 transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'} ${isActive ? (isDark ? 'text-white font-semibold' : 'text-black font-semibold') : ''}`}
            >
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
              {item}
            </button>
          );
        })}

        {/* Blog Link */}
        <Link
          to="/blog"
          className={`flex items-center gap-2 transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'} ${location.pathname.startsWith('/blog') ? (isDark ? 'text-white font-semibold' : 'text-black font-semibold') : ''}`}
        >
          {location.pathname.startsWith('/blog') && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
          <BookOpen size={16} />
          Blog
        </Link>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
        </motion.button>
      </div>

      {/* Mobile Menu Toggle and Theme */}
      <div className="md:hidden flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
        </motion.button>

        <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Fullscreen */}
      {isMenuOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className={`fixed inset-0 z-50 md:hidden flex flex-col ${isDark ? 'bg-gray-900' : 'bg-white'}`}>

          {/* Header del menú móvil */}
          <div className={`flex justify-between items-center p-6 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg italic">P</span>
              </div>
              <span className="font-bold text-xl tracking-tight">Pedro</span>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
              </motion.button>

              <button className="p-2" onClick={() => setIsMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>
          </div>

          {/* Links del menú */}
          <div className="flex-1 flex flex-col justify-center px-8 py-12 gap-2">
            {isHomePage && menuItems.map((item, index) => {
              const id = menuIds[index];
              const isActive = activeSection === id;

              return (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    scrollToSection && scrollToSection(id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left py-4 font-bold text-3xl border-b transition-colors ${
                    isDark ? 'border-gray-800' : 'border-gray-100'
                  } ${
                    isActive
                      ? 'text-emerald-400'
                      : isDark ? 'text-white hover:text-emerald-400' : 'text-gray-900 hover:text-emerald-500'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {isActive && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                    {item}
                  </span>
                </motion.button>
              );
            })}

            {/* Link al Blog */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: isHomePage ? menuItems.length * 0.1 : 0.1 }}
            >
              <Link
                to="/blog"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 text-left py-4 font-bold text-3xl border-b transition-colors ${
                  isDark ? 'border-gray-800' : 'border-gray-100'
                } ${
                  location.pathname.startsWith('/blog')
                    ? 'text-emerald-400'
                    : isDark ? 'text-white hover:text-emerald-400' : 'text-gray-900 hover:text-emerald-500'
                }`}
              >
                {location.pathname.startsWith('/blog') && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                <BookOpen size={24} />
                Blog
              </Link>
            </motion.div>

            {/* Link al Inicio cuando no estás en home */}
            {!isHomePage && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0 }}
              >
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 text-left py-4 font-bold text-3xl border-b transition-colors ${
                    isDark ? 'border-gray-800' : 'border-gray-100'
                  } ${isDark ? 'text-white hover:text-emerald-400' : 'text-gray-900 hover:text-emerald-500'}`}
                >
                  Inicio
                </Link>
              </motion.div>
            )}
          </div>

          {/* Footer del menú móvil */}
          <div className={`p-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
            <div className="flex justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/consultorvarela"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-gray-600 hover:bg-white hover:text-black hover:border-white' : 'border-gray-300 hover:bg-black hover:text-white hover:border-black'}`}>
                <Github size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.consultorvarela.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-gray-600 hover:bg-white hover:text-black hover:border-white' : 'border-gray-300 hover:bg-black hover:text-white hover:border-black'}`}>
                <Globe size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/in/consultorvarela/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-emerald-400 border border-emerald-400 text-white flex items-center justify-center hover:bg-emerald-500 transition-all">
                <Linkedin size={20} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
