import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const MovieDetails = () => {
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [error, setError] = useState('');

  // Fetch movie details
  const fetchMovieDetails = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
      const data = await res.json();
      setMovie(data);
    } catch (err) {
      console.error("Error fetching movie details:", err);
      setError("Failed to load movie details.");
    }
  };

  // Fetch trailer video
  const fetchMovieVideo = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/movie/${id}/videos`, API_OPTIONS);
      const data = await res.json();
      const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
      setVideoKey(trailer?.key || null);
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

  // Fetch cast
  const fetchCast = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/movie/${id}/credits`, API_OPTIONS);
      const data = await res.json();
      setCast(data.cast.slice(0, 5)); // Show top 5 cast members
    } catch (err) {
      console.error("Error fetching cast:", err);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchMovieVideo();
    fetchCast();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div className="wrapper text-white space-y-6">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <p className="text-gray-300">{movie.overview}</p>

      <div className="flex gap-3 flex-wrap">
        {movie.genres.map(genre => (
          <span key={genre.id} className="px-3 py-1 bg-purple-800 rounded-full text-sm">
            {genre.name}
          </span>
        ))}
      </div>

      {videoKey && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Watch Trailer</h2>
          <iframe
            className="w-full aspect-video rounded-lg"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="Movie Trailer"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Top Cast</h2>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          {cast.map(actor => (
            <div key={actor.cast_id} className="min-w-[120px]">
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
                className="rounded-lg w-full h-auto object-cover"
              />
              <p className="text-sm text-center mt-1">{actor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
