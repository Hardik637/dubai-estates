import React, { useState, useEffect } from 'react';

export interface DubaiScene {
  id: string;
  url: string;
  name: string;
  caption: string;
}

export const generatedDubaiScenes: DubaiScene[] = [
  {
    id: 'scene-1',
    url: '/backgrounds/burj_sunset.jpg',
    name: 'Downtown Dubai',
    caption: 'Burj Khalifa & The Dubai Fountain at Golden Hour'
  },
  {
    id: 'scene-2',
    url: '/backgrounds/marina_twilight.jpg',
    name: 'Dubai Marina & JBR',
    caption: 'Waterfront Skyscraper Horizons & Luxury Yacht Promenade'
  },
  {
    id: 'scene-3',
    url: '/backgrounds/palm_aerial.jpg',
    name: 'Palm Jumeirah',
    caption: 'Iconic Palm Archipelago, Royal Atlantis & Turquoise Gulf'
  },
  {
    id: 'scene-4',
    url: '/backgrounds/hills_villas.jpg',
    name: 'Dubai Hills Estate',
    caption: 'Championship Golf Fairways & Contemporary Palatial Villas'
  }
];

export const DubaiBackground: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    // Smooth transition every 6.5 seconds
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % generatedDubaiScenes.length);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none select-none">
      {/* 4 Generated High-Resolution Images with Smooth Crossfade */}
      {generatedDubaiScenes.map((scene, idx) => {
        const isCurrent = idx === currentIdx;
        return (
          <div
            key={scene.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isCurrent ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={scene.url}
              alt={scene.name}
              className={`w-full h-full object-cover object-center transition-transform duration-[8000ms] ease-out ${
                isCurrent ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        );
      })}

      {/* Natural gradient at the top/bottom in dirty chocolate tones so images remain clear and luxury depth is preserved */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1310]/40 via-transparent to-[#1a1310]/85" />
    </div>
  );
};
