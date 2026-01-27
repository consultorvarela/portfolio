import React from 'react';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

export const Footer = () => {
  const { isDark } = useTheme();
  const { language } = useLanguage();

  return (
    <footer className={`text-white border-t py-12 px-6 ${isDark ? 'bg-gray-950 border-gray-800' : 'bg-black border-white/10'}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center">
            <span className="text-white font-bold text-lg italic">P</span>
          </div>
          <span className="font-bold text-xl tracking-tight">Pedro Varela</span>
        </div>
        
        <div className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Pedro Varela. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
        </div>

        <div className="flex gap-6 text-sm">
          <span className="text-gray-600">{language === 'es' ? 'Hecho con' : 'Made with'} React + Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
