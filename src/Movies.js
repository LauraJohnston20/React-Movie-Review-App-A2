import React from 'react';
import { Button, Card } from 'react-bootstrap';

export function Movie( {name, date, actors, poster, rating, onRemove = f => f} ) {
    return(
        <>

            <Card key={name} style={{ width: '18rem', margin: '10px'}} className="box">
            <Card.Img variant="top" src={poster} alt={name + 'poster'} style={{resizeMode: "contain"}} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    <div>Release Date: {date}</div>
                    <div>Starring: {(actors).join(", ")}</div>
                    <div>Rating: {rating}</div>
                </Card.Text>
                <Button onClick={() => onRemove(name)}>Remove</Button>
            </Card.Body>
            </Card>

        </>
    );
}

export function MovieList( { movies = [], onRemoveMovie = f => f } ) {
    if ( movies == null || movies == undefined ||!movies.length) 
        return <h2>No movies available</h2>;
    
        return(
            <>
            <div className="mt-3" style={{display: "flex", flexWrap: "wrap", width: "70%", justifyContent: "center", margin: "auto"}}>
                {movies.map((movie, i) => {
                    return <Movie key={i} {...movie} onRemove={onRemoveMovie} />
                })
            }
            </div>
            </>
        );
}
