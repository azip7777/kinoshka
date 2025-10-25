import { GoogleGenAI, Type } from "@google/genai";
import { Film, FilmWithUrl } from '../types';

export async function enhanceFilmData(films: Film[]): Promise<FilmWithUrl[]> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const filmListForPrompt = films.map(f => `- ${f.title} (${f.year})`).join('\n');

  // Prompt to request only the Letterboxd page URLs.
  const prompt = `
    You are a film database expert. For the following list of films, find their official Letterboxd page URL.

    The Letterboxd page URL should have the format: https://letterboxd.com/film/FILM-SLUG/.

    Provide the output as a single, valid JSON array of objects. Each object must have 'title', 'year', and 'letterboxdUrl' properties.
    Ensure the title and year in your response match the input films exactly so they can be correctly mapped.

    Input Films:
    ${filmListForPrompt}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        // Schema updated to expect only the Letterboxd URL.
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              year: { type: Type.INTEGER },
              letterboxdUrl: { type: Type.STRING },
            },
            required: ["title", "year", "letterboxdUrl"],
          },
        },
      },
    });

    const generatedData = JSON.parse(response.text);

    // Map the generated URLs back to the original film data. Posters are already present.
    const filmsWithUrls = films.map(originalFilm => {
      const foundData = generatedData.find(
        (genFilm: { title: string; year: number; letterboxdUrl: string; }) =>
          genFilm.title === originalFilm.title && genFilm.year === originalFilm.year
      );
      
      return {
        ...originalFilm,
        letterboxdUrl: foundData ? foundData.letterboxdUrl : `https://letterboxd.com/search/${encodeURIComponent(originalFilm.title)}/`,
      };
    });

    return filmsWithUrls;
  } catch (error) {
    console.error("Error fetching enhanced film data from Gemini API:", error);
    // On error, return the original films with fallback search URLs.
    return films.map(film => ({
      ...film,
      letterboxdUrl: `https://letterboxd.com/search/${encodeURIComponent(film.title)}/`,
    }));
  }
}