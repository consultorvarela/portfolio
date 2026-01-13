import React from 'react';
import { FaReact, FaNodeJs, FaPython, FaAws } from 'react-icons/fa';
import { Star } from 'lucide-react';

export const MarqueeSection = () => {
  return (
    <div className="bg-black text-white py-8 overflow-hidden relative rotate-1 scale-105 border-y-4 border-emerald-400">
      <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
         {[1, 2, 3, 4, 5, 6].map((i) => (
           <React.Fragment key={i}>
              <div className="flex items-center gap-3">
                <FaReact className="text-emerald-400" size={40} />
                <span className="text-3xl font-bold uppercase font-mono">React</span>
              </div>
              <Star className="text-emerald-400 fill-emerald-400" size={24} />
              <div className="flex items-center gap-3">
                <FaNodeJs className="text-emerald-400" size={40} />
                <span className="text-3xl font-bold uppercase font-mono">Node.js</span>
              </div>
              <Star className="text-emerald-400 fill-emerald-400" size={24} />
              <div className="flex items-center gap-3">
                <FaPython className="text-emerald-400" size={40} />
                <span className="text-3xl font-bold uppercase font-mono">Python</span>
              </div>
              <Star className="text-emerald-400 fill-emerald-400" size={24} />
              <div className="flex items-center gap-3">
                <FaAws className="text-emerald-400" size={40} />
                <span className="text-3xl font-bold uppercase font-mono">AWS</span>
              </div>
              <Star className="text-emerald-400 fill-emerald-400" size={24} />
           </React.Fragment>
         ))}
      </div>
    </div>
  );
};

export default MarqueeSection;
