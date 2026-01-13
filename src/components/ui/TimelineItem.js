import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const TimelineItem = ({ year, title, subtitle, description, isLast = false, icon: Icon, index, showDescription = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-50px" }}
      className="flex relative">
      {/* Línea divisoria, se extiende hasta el final excepto en el último ítem */}
      {!isLast && (
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
          viewport={{ once: true }}
          className="w-0.5 bg-gradient-to-b from-emerald-400 to-gray-700 absolute left-[1.15rem] top-0"
        />
      )}

      {/* Círculo del punto de la línea de tiempo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.2 + 0.1,
          type: "spring",
          stiffness: 200,
          damping: 10
        }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.2, rotate: 360 }}
        className="h-10 w-10 min-w-10 rounded-full bg-emerald-400 flex items-center justify-center absolute left-0 top-0 z-10 border-4 border-black shadow-lg shadow-emerald-400/50">
          {Icon && <Icon size={20} className="text-black" />}
      </motion.div>

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
        viewport={{ once: true }}
        className="ml-16 pb-12 pt-0.5">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.2 + 0.5 }}
          viewport={{ once: true }}
          className="text-sm text-emerald-400 font-mono mb-1 font-semibold">
          {year}
        </motion.p>
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-400 font-medium mb-3">{subtitle}</p>

        {showDescription && (
          <>
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden">
              <p className="text-gray-400 text-base leading-relaxed mb-3">{description}</p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
              {isExpanded ? 'Ocultar descripción' : 'Ver descripción'}
              <motion.svg
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};
