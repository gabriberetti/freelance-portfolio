import { useState } from 'react';
import GlobeModel from './GlobeModel';

const LocationBadge = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = (hovered: boolean) => {
    setIsHovered(hovered);
  };

  return (
    <div 
      className="absolute left-0 top-32 z-20"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <div className={`bg-[#1A1A1A] text-white py-5 pl-8 pr-6 rounded-r-full flex items-center transition-all duration-300 ${isHovered ? 'bg-[#111111]' : ''}`}>
        <div className="flex flex-col mr-4">
          <span className="text-xs md:text-sm font-light tracking-wider">Located</span>
          <span className="text-xs md:text-sm font-light tracking-wider">in Berlin</span>
        </div>
        <div className={`rounded-full w-16 h-16 flex items-center justify-center transition-all duration-300 ${isHovered ? 'bg-[#8A8A8A]' : 'bg-[#9A9A9A]'}`}>
          <div className="w-full h-full">
            <GlobeModel isHovered={isHovered} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationBadge; 