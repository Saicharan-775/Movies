import React, {useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/spinner'
import MovieCard from './components/MovieCard'
import {useDebounce} from 'react-use'
import { getTrendingMovies,updateSearchCount } from './appwrite'
import MovieDetailsModal from './components/MovieDetailsModal';
import NewReleases from './components/NewReleases'
import Navbar from "./components/Navbar";

const API_BASE_URL="https://api.themoviedb.org/3";
const API_KEY=import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS={
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
}
}

const App = () => {
  const[searchTerm,setSearchTerm]=useState("");
  const[errorMessage,setErrorMessage]=useState("");

  const [moviesList, setMoviesList] = useState([]);
  const [trendingMovies,settrendingMovies]=useState([]);

  const [isloading, setisLoading] = useState(false);
 const[debouncedsearchTerm,setdebouncedsearchTerm]=useState('');
 const [selectedMovie, setSelectedMovie] = useState(null);
 const [topRated, setTopRated] = useState([]);


  useDebounce(()=>setdebouncedsearchTerm(searchTerm),500,[searchTerm]);

  const fetchMovies=async (query='')=>{
    setisLoading(true);
    setErrorMessage('');
    try {
  const endpoints= query 
  ?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
  :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
  const response = await fetch(endpoints, API_OPTIONS);
  if (!response.ok) {
    throw new Error(`Failed to fetch movies`); 
  }
  const data = await response.json();
                console.log(data)
        if(data.Response==="False"){
          
          setErrorMessage(data.Error||"Failed to fetch movies. Please try again later.");
          setMoviesList([]);
          return;
        }
        setMoviesList(data.results ||[]);
 if(query && data.results.length>0){
  await updateSearchCount(query,data.results[0]);
 }


  }catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Failed to fetch movies. Please try again later.");

    }finally{
      setisLoading(false);
    }
  }
  
 const LoadTrendingMovies=async ()=>{
  try{
  const movies= await getTrendingMovies();
  settrendingMovies(movies);
  }catch(error){
    console.error(` Error fetching Trending Movies:${error}`);
    
  }
 }

const fetchTopRated = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/movie/top_rated`, API_OPTIONS);
    const data = await res.json();
    setTopRated(data.results || []);
  } catch (err) {
    console.error("Failed to fetch top rated movies", err);
  }
};





  useEffect(()=>{
fetchMovies(debouncedsearchTerm);
  },[debouncedsearchTerm]);

useEffect(()=>{
  LoadTrendingMovies();
  fetchTopRated();
},[]);
  return (
    <div className='pattern'> 
    <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className='wrapper'>
        
        <header>
          
       {/* <img src="/hero.png" alt="hero-banner"/> */}
      {/* <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassel</h1> */}
        </header>
     {/* //  <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> */}
      {trendingMovies.length >0 &&(
        <section className='trending'>
         <h2>Trending Movies</h2>

         <ul>
  {trendingMovies.map((movie, index) => (
    <li
      key={movie.$id}
      onClick={() =>
  setSelectedMovie({
    id: movie.movie_id,            // fix here
   // zyposter_path: movie.poster_url.replace("https://image.tmdb.org/t/p/w500/", ""),  // optional
    title: movie.searchTerm || 'Unknown Title'
  })
}
 // ⬅️ Added this
      className="cursor-pointer transition hover:scale-105"
    >
      <p>{index + 1}</p>
      <img
        src={movie.poster_url}
        alt={movie.title}
        className="rounded-lg w-[127px] h-[163px] object-cover"
      />
    </li>
  ))}
</ul>



        </section>
      )}
       <section className='all-movies'>
         <h2 >All Movies</h2>
         {isloading ?(
          <Spinner/>
         ):errorMessage ?(
          <p className='text-red-500'>{errorMessage}</p>
         ) :(
          <ul>
            {moviesList.map((movie)=>(
               <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
          ))}
            
          </ul>
         )
         }
         {errorMessage && <p className="text-red-500">{errorMessage}</p>}

       {topRated.length > 0 && (
  <section className="mt-12">
    <h2 className="text-2xl font-bold text-white mb-4">Top Rated</h2>
    <div className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar p-3">
      {topRated.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={setSelectedMovie}
          isHorizontal={true}
        />
      ))}
    </div>
  </section>
)}


         {selectedMovie && (
              <MovieDetailsModal
                movie={selectedMovie}
                onClose={() => setSelectedMovie(null)}
              />
            )}
         
       </section>
      </div>
    </div>



  )
}
export default App

