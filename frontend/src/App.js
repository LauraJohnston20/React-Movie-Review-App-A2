import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Home, AddReview } from "./pages";
import { NavBar } from './pages'


function App() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/api/data')
    .then((response) => response.json())
    .then(setMovies)
}, []);

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
