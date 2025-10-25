import React from 'react';
import { FilmWithUrl } from '../types';

interface FilmCardProps {
  film: FilmWithUrl;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const totalStars = 10;
  const filledStars = Math.round(rating);

  return (
    <div className="flex">
      {Array.from({ length: totalStars }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < filledStars ? 'text-yellow-400' : 'text-gray-500'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
};

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
  return (
    <a
      href={film.letterboxdUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-b-2xl overflow-hidden shadow-2xl transition-all duration-300 ease-in-out transform-gpu hover:scale-105 hover:shadow-white/30"
    >
      {/* Poster with vintage effect */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={film.poster}
          alt={`Poster for ${film.title}`}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out filter grayscale-[40%] contrast-[1.1] brightness-[.9] group-hover:filter-none"
          loading="lazy"
        />
      </div>

      {/* Glassmorphism Info Block */}
      <div className="p-4 bg-white/5 backdrop-blur-xl border-t border-white/20">
        <div className="text-white w-full">
          <h3 className="font-bold text-lg leading-tight transition-colors truncate">
            {film.title}
          </h3>
          <p className="text-sm leading-tight text-gray-400 mt-1 truncate">{film.director}</p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-300">{film.year}</p>
            <StarRating rating={film.rating} />
          </div>
        </div>
      </div>
    </a>
  );
};

export default FilmCard;