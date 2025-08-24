
import React, { useEffect, useState } from 'react';


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};





const NewReleases = () => {
     const[NewMovies,setNewMovies]=useState([]);
    const fetchNewReleases = async ()=>{
   
         try{
           const res= await fetch(`${API_BASE_URL}/movie/now_playing`,API_OPTIONS);
           const data= await res.json();
           setNewMovies(data.results ||[]);
         }catch{
            console.error("Failed to fetch New Releases")
         }
};


useEffect(()=>{
  fetchNewReleases();
},[]);




  return (
<section>

        {NewReleases.length > 0 && (
  <section className="mt-12">
    <h2 className="text-2xl font-bold text-white mb-4">New Releases</h2>
    <div className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar p-3">
      {NewReleases.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={setSelectedMovie}
          isHorizontal={true} // enables horizontal styling
        />
      ))}
    </div>
  </section>
)}

</section>
  

   
    

    
  )
}

export default NewReleases