import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Globe, Linkedin, ArrowDown, Code } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import Particles3D from '../Particles3D';
import { TypewriterText } from '../components/ui/TypewriterText';

export const HeroSection = ({ scrollToSection }) => {
  const { isDark } = useTheme();

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 overflow-hidden">
      {/* Partículas 3D de fondo - Todo el ancho */}
      <div className="absolute inset-0 left-0 right-0 z-0 opacity-30 w-screen ml-[calc(-50vw+50%)]">
        <Particles3D />
      </div>

      {/* ============ LAYOUT MÓVIL ============ */}
      <div className="md:hidden relative z-10 max-w-7xl mx-auto">
        {/* Header compacto: Foto circular + Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          {/* Foto circular */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-emerald-400 shadow-lg">
              <img
                src="./img/herovarela.png"
                alt="Pedro Varela"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Punto verde de estado */}
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
          </div>

          {/* Título */}
          <div>
            <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pedro Varela</p>
            <h1 className="text-xl font-extrabold leading-tight">
              Desarrollador Fullstack
            </h1>
            <p className="text-sm">
              Con base en <span className="text-emerald-500 font-bold">Honduras</span>
            </p>
          </div>
        </motion.div>

        {/* Console.log badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div className={`border-2 border-emerald-400 px-3 py-2 rounded-sm relative inline-block ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`absolute -top-1.5 -left-1.5 w-2 h-2 bg-emerald-400 border ${isDark ? 'border-gray-800' : 'border-white'}`}></div>
            <div className={`absolute -top-1.5 -right-1.5 w-2 h-2 bg-emerald-400 border ${isDark ? 'border-gray-800' : 'border-white'}`}></div>
            <div className={`absolute -bottom-1.5 -left-1.5 w-2 h-2 bg-emerald-400 border ${isDark ? 'border-gray-800' : 'border-white'}`}></div>
            <div className={`absolute -bottom-1.5 -right-1.5 w-2 h-2 bg-emerald-400 border ${isDark ? 'border-gray-800' : 'border-white'}`}></div>
            <span className="font-bold text-xs font-mono">
              <TypewriterText text={`console.log("Hello World! I'm Pedro Varela")`} delay={200} />
            </span>
          </div>
        </motion.div>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-500 text-base leading-relaxed mb-6"
        >
          Transformo ideas en soluciones digitales escalables. Especializado en crear aplicaciones web de alto rendimiento con arquitecturas backend sólidas y experiencias frontend intuitivas.
        </motion.p>

        {/* Botón */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <button onClick={() => scrollToSection('contact')} className="relative group w-full">
            <div className="absolute inset-0 bg-emerald-400 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <div className="relative bg-black text-white px-6 py-3 font-bold flex items-center justify-center gap-2 border-2 border-transparent transition-transform group-hover:-translate-y-0.5 group-hover:-translate-x-0.5 text-sm">
              Contrátame <ArrowUpRight size={18} />
            </div>
          </button>
        </motion.div>

        {/* Redes sociales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Sígueme:</span>
          <div className="flex gap-3">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/consultorvarela"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-gray-600 hover:bg-white hover:text-black hover:border-white' : 'border-gray-300 hover:bg-black hover:text-white hover:border-black'}`}>
              <Github size={18} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.consultorvarela.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-gray-600 hover:bg-white hover:text-black hover:border-white' : 'border-gray-300 hover:bg-black hover:text-white hover:border-black'}`}>
              <Globe size={18} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.linkedin.com/in/consultorvarela/"
              className="w-10 h-10 rounded-full bg-emerald-400 border border-emerald-400 text-white flex items-center justify-center hover:bg-emerald-500 transition-all">
              <Linkedin size={18} />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* ============ LAYOUT DESKTOP (sin cambios) ============ */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 max-w-7xl mx-auto">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
          {/* Dev Tool Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block relative mx-auto lg:mx-0">
            <div className={`border-2 border-emerald-400 px-3 py-2 md:px-4 rounded-sm relative ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-emerald-400 border ${isDark ? 'border-gray-800' : 'border-white'}`}></div>
              <div className={`absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-emerald-400 border ${isDark ? 'border-gray-800' : 'border-white'}`}></div>
              <div className={`absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-emerald-400 border ${isDark ? 'border-gray-800' : 'border-white'}`}></div>
              <div className={`absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-emerald-400 border ${isDark ? 'border-gray-800' : 'border-white'}`}></div>
              <span className="font-bold text-xs md:text-base font-mono">
                <TypewriterText text={`console.log("Hello World! I'm Pedro Varela")`} delay={200} />
              </span>
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
            <span className="block lg:inline">Desarrollador Fullstack</span>
            <br className="hidden lg:block" />
            <span className="block lg:inline">Con base en </span>
            <span className="text-emerald-500">Honduras</span>
          </h1>

          <p className="text-gray-500 text-base md:text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Transformo ideas en soluciones digitales escalables. Especializado en crear aplicaciones web de alto rendimiento con arquitecturas backend sólidas y experiencias frontend intuitivas.
          </p>

          <div className="flex flex-row gap-3 md:gap-5 pt-2 justify-center lg:justify-start">
            <button onClick={() => scrollToSection('contact')} className="relative group flex-1 md:flex-none">
              <div className="absolute inset-0 bg-emerald-400 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <div className="relative bg-black text-white px-6 md:px-8 py-3 md:py-4 font-bold flex items-center justify-center gap-2 border-2 border-transparent transition-transform group-hover:-translate-y-0.5 group-hover:-translate-x-0.5 text-sm md:text-base">
                Contrátame <ArrowUpRight size={18} className="md:w-5 md:h-5" />
              </div>
            </button>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
            <span className={`text-xs md:text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Sígueme:</span>
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/consultorvarela"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-gray-600 hover:bg-white hover:text-black hover:border-white' : 'border-gray-300 hover:bg-black hover:text-white hover:border-black'}`}>
                <Github size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.consultorvarela.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-gray-600 hover:bg-white hover:text-black hover:border-white' : 'border-gray-300 hover:bg-black hover:text-white hover:border-black'}`}>
                <Globe size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/in/consultorvarela/"
                className="w-10 h-10 rounded-full bg-emerald-400 border border-emerald-400 text-white flex items-center justify-center hover:bg-emerald-500 transition-all">
                <Linkedin size={18} />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[500px] lg:h-[600px] w-full flex items-center justify-center lg:justify-end order-1 lg:order-2">
           {/* Abstract Shapes */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute top-10 left-0 z-20 ${isDark ? 'text-emerald-400' : 'text-black'}`}>
            <Code size={48} strokeWidth={2.5} />
          </motion.div>

          {/* Green Blobs */}
          <div className="absolute bottom-0 right-[-20px] w-64 h-32 bg-emerald-400 rounded-full transform rotate-[-20deg] z-0 opacity-90"></div>
          <div className="absolute bottom-[-40px] left-10 w-40 h-40 bg-emerald-400 rounded-full z-0 opacity-90"></div>

          {/* Photo Frame */}
          <div className="relative z-10 w-full max-w-md bg-gray-100 h-full max-h-[550px] overflow-hidden shadow-2xl border-4 border-black">
            <img
              src="./img/herovarela.png"
              alt="Pedro Varela"
              className="w-full h-full object-cover object-left grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Floating Circular Badge */}
          <div className="absolute bottom-20 left-10 z-20 bg-white rounded-full p-6 shadow-xl border border-gray-100 flex items-center justify-center animate-spin-slow">
             <svg viewBox="0 0 100 100" width="100" height="100">
              <defs>
                <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              <text fontSize="11" fontWeight="bold">
                <textPath xlinkHref="#circle">
                  DESPLÁZATE • VE MI STACK •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <ArrowDown size={24} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
