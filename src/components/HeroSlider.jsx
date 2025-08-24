import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = ({ movies }) => {
  const settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="mb-10">
      <Slider {...settings}>
        {movies.map(movie => (
          <div key={movie.id} className="relative h-[80vh] w-full overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              className="w-full h-full object-cover opacity-70"
              alt={movie.title}
            />
            <div className="absolute bottom-10 left-10 text-white">
              <h2 className="text-4xl font-bold">{movie.title}</h2>
              <p className="max-w-lg mt-2">{movie.overview.slice(0, 150)}...</p>
              <button className="mt-4 px-6 py-2 bg-red-600 rounded hover:bg-red-700 transition-all">
                ▶ Watch Trailer
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
