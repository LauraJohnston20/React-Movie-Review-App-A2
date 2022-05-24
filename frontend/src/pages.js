import React from "react";
import { Link } from "react-router-dom";
import { AddReviewForm } from "./addReviewForm";
import { MovieList } from "./Movies";
import { Navbar, Nav, Container} from 'react-bootstrap';

export function Home({movies, setMovies}){
    return(
        <>         
            <MovieList movies={movies} onRemoveMovie = { movieName => {
                        const newMovies = movies.filter(movie => movie.name !== movieName);
                        setMovies(newMovies);
                    }
                } 
            />
        </>
    );
}

export function AddReview({movies, setMovies}){
    return(
        <>
        <br></br>
        <h3>Add Movie Review</h3>
            <AddReviewForm onAddReview={ async (newMovie) => {
                console.log(newMovie);
                const result = await fetch ('/api/addMovie', {
                    method: "POST",
                    body: JSON.stringify(newMovie),
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                setMovies([...movies, newMovie]);
                console.log("NEW MOVIE", newMovie);
            }}/>
        </>
    );
}

export function NavBar() {
    return ( 
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand as={Link} to={"/"}>Movie Reviews</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                    <Nav.Link as={Link} to={"/addReview"}>Add Review</Nav.Link>
                </Nav>
            </Container>
      </Navbar>
    )
}
