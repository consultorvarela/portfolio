import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasTypedError, setHasTypedError] = useState(false);

  // Posición donde ocurre el error (mitad del texto aproximadamente)
  const errorPosition = Math.floor(text.length / 2);
  const errorText = "Helo"; // Texto con error
  const correctPortion = text.substring(0, errorPosition);

  useEffect(() => {
    // Si estamos en la posición del error y no hemos cometido el error aún
    if (currentIndex === errorPosition && !hasTypedError && !isDeleting) {
      const timeout = setTimeout(() => {
        setDisplayText(correctPortion + errorText);
        setHasTypedError(true);
        // Pausar antes de empezar a borrar
        setTimeout(() => setIsDeleting(true), 400);
      }, 30);
      return () => clearTimeout(timeout);
    }

    // Si estamos borrando el error
    if (isDeleting) {
      if (displayText.length > errorPosition) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        // Terminamos de borrar, continuamos escribiendo correctamente
        setIsDeleting(false);
        setCurrentIndex(errorPosition);
      }
    }

    // Escritura normal
    if (!isDeleting && currentIndex < text.length && (currentIndex < errorPosition || hasTypedError)) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20 + delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay, isDeleting, displayText, hasTypedError, errorPosition, correctPortion, errorText]);

  return (
    <>
      <span>{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block ml-1"
      >
        |
      </motion.span>
    </>
  );
};
