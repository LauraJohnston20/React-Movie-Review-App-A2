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
            <AddReviewForm onAddReview={(name, date, actors, poster, rating) => {
                const newMovies = [
                    ...movies,
                    {name, date, actors, poster, rating}
                ];
                setMovies(newMovies);
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
