import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Home, AddReview } from "./pages";
import { NavBar } from './pages'


function App({secret: sc}) {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/api/data')
    .then((response) => response.json())
    .then(setMovies)
}, []);

/*
  useEffect( () => {
    const fetchData = async () => {
      const result = await fetch ('/api/data')
      const jsonResult = result.json()

      setMovies(jsonResult)
      console.log("Here are results", result)
    }

    fetchData()
  }, [])
*/

    /*fetch("/api/data")
    .then(async response => {
      try {
        const data = await response.json()
        console.log('response data', data)
      } catch (error) {
        console.log("ERROR OCCURRING", error)
        console.error(error)
      }
    })*/


  /*  fetch('/api/data')                    // fetch from backend
    .then( response => response.json() )
    .then( setMovies )
    .catch( e => console.log(e.message) );
  }, [])*/

  return (
    <div className='App'>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home movies={movies} setMovies={setMovies}/>} />
        <Route path="/addReview" element={<AddReview movies={movies} setMovies={setMovies}/>} />
      </Routes>
    </div>
  )
}

export default App;
