import React from 'react';
import { CinematicMovieExperience } from '../components/home/CinematicMovieExperience';
import { BrandStatement } from '../components/home/BrandStatement';
import { FinalCTA } from '../components/home/FinalCTA';

export const HomePage: React.FC = () => {
  return (
    <div className="relative w-full bg-[#FFFFFF] text-[#111111] overflow-x-clip">
      {/* 01. The Cinematic Scroll Film: Dubai Skyline -> Descent -> Villa -> Sanctuary */}
      <CinematicMovieExperience />

      {/* 02. The Brand Philosophy Statement */}
      <BrandStatement />

      {/* 03. Destination & Fiduciary Advisory CTA */}
      <FinalCTA />
    </div>
  );
};
