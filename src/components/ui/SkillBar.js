import React from 'react';
import { motion } from 'framer-motion';

export const SkillBar = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}>
      <div className="flex justify-between mb-1">
        <span className="font-medium text-sm">{skill.name}</span>
        <span className="text-emerald-400 text-sm">{skill.level}</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <motion.div
          className="bg-emerald-400 h-2 rounded-full"
          initial={{ width: '0%' }}
          whileInView={{ width: skill.level }}
          transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
};
