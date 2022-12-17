import React from 'react' ;
import { useEffect, useState } from 'react';
import axios from 'axios';
const MovieInfoComponent = (props) => {
    const [movieInfo, setMovieInfo] = useState();
    const { selectedMovie } = props;
    const api_key=process.env.REACT_APP_YOUR_API_KEY_NAME;
    console.log(api_key);
    console.log(selectedMovie);
    useEffect(() => {
      axios.get(
        `https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=eefd3c9d35ed75ba43d92def91779472`,
      ).then((response) => 
      {setMovieInfo(response.data); 
        console.log(response.data)})
       .catch(
        (error) => { 
          console.log(error);
        }
      );
    
    }, [selectedMovie]);
    const IMGPATH = "https://image.tmdb.org/t/p/w1280";
    return (
      <div>
        {movieInfo ? (
        <div className=' mx-auto border rounded w-3/4'>   
          <div className='flex justify-between px-2 items-center mt-4 mb-4'>
            <h1 className='font-bold'>
                {movieInfo?.original_title}
            </h1>
            <button className="border border-black"
                onClick={() => props.onMovieSelect()}>
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
          </div>
          <div className='shadow  min-h-[100px] grid grid-cols-2 gap-5 mt-3'>
            <img className='h-64 w-64' src={IMGPATH+movieInfo?.poster_path} alt={movieInfo?.Title} />
            <div className='gap-1'>
              <p className="px-2 py-2 ">
              <span className='font-bold'>Released:</span> {movieInfo?.release_date}
              </p> 
              <p className="px-2 py-2 ">
                 <span>{movieInfo?.overview}</span>
              </p> 
              <p className="px-2 py-2">
                <span className='font-bold'>{movieInfo?.vote_average}</span>/10({movieInfo?.vote_count})
              </p>
            </div>
            
          </div>
          </div>  
        ) : (
          "Loading..."
        )}
      </div>
    );
  };
  export default MovieInfoComponent;