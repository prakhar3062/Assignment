import React from 'react' ;
import { useEffect, useState } from 'react';
import MovieInfoComponent from './movie_info_component';
export default function Result(props){
    const [selectedMovie, onMovieSelect] = useState();
    const onMovie=(data)=>{
        onMovieSelect(data);
        console.log(data);
    }
    const boxes=props.movies.map(
        (item,index) => {
            return <Box key={index} id={item.id} image={item.poster_path} title={item.original_title} rating={item.vote_average} onMovie={onMovie}/>
        }
    )
    return (
        
        <div className='w-full mt-3'>
            <div className=''>
            {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
            </div>
            <div  className='w-full grid grid-cols-4 gap-5 mt-3'>
               {boxes}
            </div>
            
        </div>
    )
}

const Box=(props)=>{
    const IMGPATH = "https://image.tmdb.org/t/p/w1280";
   return(
    
    <div className='shadow min-h-[200px] mt-3 border rounded' onClick={() => {
        props.onMovie(props.id);
        console.log(props.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
        <img src={IMGPATH + props.image} alt="" width=" 280px"
         height= "302px" className="w-full"/>
        <div className='px-2 row flex justify-center align-items-center align-center leading-26'>
            <span className='text-l'>{props.title}</span>
           
        </div>
    </div>
   )
}