// src/components/MovieCard.jsx

const MovieCard = ({ movie, onClick, isHorizontal = false }) => {
  return (
    <div
      onClick={() => onClick && onClick(movie)}
      className={`movie-card cursor-pointer transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg ${isHorizontal ? 'w-[240px] flex-shrink-0' : ''}`}
    
    >
      <img
        src={
     movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "/no-movie.png"}
        alt={movie.title}
        className="w-full h-[330px] object-cover rounded-lg"
      />
      <div className="p-2">
        <h3 className="text-white text-lg font-semibold line-clamp-1">
          {movie.title}
        </h3>
        <div className="content mt-1">
          <div className="rating flex items-center gap-1">
            <img src="/star.svg" alt="star" className="size-4 object-contain" />
            <p className="font-bold text-white text-sm">
              {movie.vote_average.toFixed(1)}
            </p>
            <span className="font-bold text-white">{movie.original_language}</span>
            <span className="font-bold text-white">
              {movie.release_date?.split('-')[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
