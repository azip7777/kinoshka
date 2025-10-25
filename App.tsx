import React, { useState, useEffect } from 'react';
import { FilmWithUrl } from './types';
import { FILMS } from './constants';
import FilmCard from './components/FilmCard';
import LoadingSpinner from './components/LoadingSpinner';
import SocialButtons from './components/SocialButtons';
import { enhanceFilmData } from './services/geminiService';

const App: React.FC = () => {
  const [filmsWithUrls, setFilmsWithUrls] = useState<FilmWithUrl[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const enhancedFilms = await enhanceFilmData(FILMS);
        setFilmsWithUrls(enhancedFilms);
      } catch (e) {
        if (e instanceof Error) {
            setError(`Failed to fetch film data: ${e.message}`);
        } else {
            setError('An unknown error occurred.');
        }
        // As a fallback, use the original films with search URLs
        setFilmsWithUrls(FILMS.map(film => ({
          ...film,
          letterboxdUrl: `https://letterboxd.com/search/${encodeURIComponent(film.title)}/`,
        })));
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilmData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white font-sans relative">
      <div 
        className="fixed inset-0 z-0 bg-gradient-to-br from-[#6366F1] to-[#F43F5E] opacity-50"
        style={{
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)'
        }}
      ></div>

      <div className="absolute top-6 left-6 z-20">
        <SocialButtons />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-shadow">
            KinoMoyo Glass Gallery
          </h1>
          <p className="mt-2 text-lg text-gray-300">
            A Curated Collection of Classic Films
          </p>
        </header>
        
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
            <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {filmsWithUrls.map((film) => (
              <FilmCard key={film.title + film.year} film={film} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;