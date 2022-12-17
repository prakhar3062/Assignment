import './App.css';
import Result from './Components/result';
import axios from 'axios';
import { useEffect, useState } from 'react';
const api_key=process.env.REACT_APP_API_KEY;
console.log(api_key);
const APIURL=`https://api.themoviedb.org/3/movie/popular?api_key=eefd3c9d35ed75ba43d92def91779472`;
const SEARCHAPI="https://api.themoviedb.org/3/search/movie?&api_key=eefd3c9d35ed75ba43d92def91779472&query=";
function App() {
  const [movies,setMovies]=useState([]);
  const[search,setSearch]=useState("");

  const changeTheSearch = (event) => {
    // console.log(event.target.value);
    setSearch(event.target.value);
  }
  const getAllMovies=()=>{
    axios.get(APIURL)
    .then(
      (response)=>{
            setMovies(response.data.results);
            console.log(response.data.results);
      }
    )
    .catch(
      (error)=>{
        console.log(error)
      }
    )
  }
  const getSearchedMovies = () => {
    // console.log(SEARCHAPI + search)
    axios.get(
      SEARCHAPI + search
    )
      .then(
        (response) => {
          console.log(response.data.results)
          setMovies(response.data.results);
        }
      )
      .catch(
        (error) => { 
          console.log(error);
        }
      )
  }
  useEffect(
    ()=>{
      //console.log('hello');
      if(search===""){
        getAllMovies();
      }else{
        getSearchedMovies()
      }
    },
    [search]
  )
  
  return (
    <div className="max-w-[1240px] shadow-xl min-h-[200px] mx-auto p-3">
      <div className='flex justify-between px-2 items-center mt-4 mb-4 border-b-2 '>
        <img className="h-12 w-32" src="/abc.png"  alt='movies'/>
        <input type="search" value={search} onChange={changeTheSearch} className=" border 
        rounded text-slate-400 p-1 mt-2 mb-2" placeholder='Search any movie'
        /> 
       </div>
       <p className='text-xl font-bold'>Most Recent Movies</p>
       
       {movies.length === 0
          ?
          <div className="text-3xl text-center mt-2"> Loading... </div>
          :
          <Result movies={movies}/>
       }  
    </div>
  );
}

export default App;
