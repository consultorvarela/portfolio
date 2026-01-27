import React from 'react';
import { FaReact, FaNodeJs, FaPython, FaAws } from 'react-icons/fa';
import { Star } from 'lucide-react';

export const MarqueeSection = () => {
  return (
    <div className="bg-black text-white py-3 md:py-8 overflow-hidden relative rotate-1 scale-105 border-y-2 md:border-y-4 border-emerald-400">
      <div className="flex animate-marquee whitespace-nowrap gap-6 md:gap-12 items-center">
         {[1, 2, 3, 4, 5, 6].map((i) => (
           <React.Fragment key={i}>
              <div className="flex items-center gap-2 md:gap-3">
                <FaReact className="text-emerald-400 text-xl md:text-4xl" />
                <span className="text-base md:text-3xl font-bold uppercase font-mono">React</span>
              </div>
              <Star className="text-emerald-400 fill-emerald-400 w-4 h-4 md:w-6 md:h-6" />
              <div className="flex items-center gap-2 md:gap-3">
                <FaNodeJs className="text-emerald-400 text-xl md:text-4xl" />
                <span className="text-base md:text-3xl font-bold uppercase font-mono">Node.js</span>
              </div>
              <Star className="text-emerald-400 fill-emerald-400 w-4 h-4 md:w-6 md:h-6" />
              <div className="flex items-center gap-2 md:gap-3">
                <FaPython className="text-emerald-400 text-xl md:text-4xl" />
                <span className="text-base md:text-3xl font-bold uppercase font-mono">Python</span>
              </div>
              <Star className="text-emerald-400 fill-emerald-400 w-4 h-4 md:w-6 md:h-6" />
              <div className="flex items-center gap-2 md:gap-3">
                <FaAws className="text-emerald-400 text-xl md:text-4xl" />
                <span className="text-base md:text-3xl font-bold uppercase font-mono">AWS</span>
              </div>
              <Star className="text-emerald-400 fill-emerald-400 w-4 h-4 md:w-6 md:h-6" />
           </React.Fragment>
         ))}
      </div>
    </div>
  );
};

export default MarqueeSection;
