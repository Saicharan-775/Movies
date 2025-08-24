import React, { useEffect, useState } from 'react';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetailsModal = ({ movie, onClose }) => {
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [genres, setGenres] = useState([]);

  const fetchMovieExtras = async () => {
    try {
      const [videosRes, creditsRes, detailsRes] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
          API_OPTIONS
        ).then((res) => res.json()),
        fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US`,
          API_OPTIONS
        ).then((res) => res.json()),
        fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`,
          API_OPTIONS
        ).then((res) => res.json()),
      ]);

      const trailerVideo = videosRes.results.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      setTrailer(trailerVideo);

      setCast(creditsRes.cast.slice(0, 5));
      setGenres(detailsRes.genres || []);
    } catch (error) {
      console.error('Failed to load trailer/cast/genres:', error);
    }
  };

  useEffect(() => {
    fetchMovieExtras();
  }, [movie]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center p-4">
      <div className="bg-dark-100 p-6 rounded-xl max-w-4xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-2xl"
        >
          &times;
        </button>

        <h2 className="text-white text-2xl font-bold mb-4">{movie.title}</h2>

        {trailer && (
          <iframe
            className="w-full h-[300px] rounded-lg mb-5"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={movie.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}

        <p className="text-gray-300 mb-2">{movie.overview}</p>

        <div className="flex flex-wrap gap-3 mb-4">
          {genres.map((genre) => (
            <span
              key={genre.id}
              className="px-3 py-1 bg-light-100/10 text-white rounded-full text-sm"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <h3 className="text-white text-lg font-semibold mb-2">Cast:</h3>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          {cast.map((actor) => (
            <div key={actor.id} className="min-w-[100px] text-center">
              <img
                className="w-[100px] h-[120px] object-cover rounded-lg mx-auto mb-1"
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                    : '/No-photo-available.png'
                }
                alt={actor.name}
              />
              <p className="text-white text-sm">{actor.name}</p>
              <p className="text-gray-400 text-xs">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
