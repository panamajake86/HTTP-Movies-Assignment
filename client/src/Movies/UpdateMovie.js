import React from 'react';
import axios from 'axios';
import { prototype } from 'events';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateMovie = props => {
    const [movie, setMovie] = React.useState(initialMovie);
    const [error, setError] = React.useState('');

    

    React.useEffect(() => {
        console.log(props);
        const movieToEdit = props.movies.find(
            movie => `${movie.id}` === props.match.params.id
        );

        if (movieToEdit) setMovie(movieToEdit);
    }, [props.movies, props.match.params.id]);

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'metascore') {
            value = parseInt(value, 10);
        }

        setMovie({
            ...movie,
            [e.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setError('');
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                // console.log(res);
                props.updateMovies(res.data);
                props.history.push(`/movies/${movie.id}`);
            });
    };

    return(
        <>
            <h3>Update Movie</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='Title'
                    value={movie.title}
                />
                <input 
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='Director'
                    value={movie.director}
                />
                <input 
                    type='number'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='Metascore'
                    value={movie.metascore}
                />
                {/* <input 
                    type='text'
                    name='stars'
                    onChange={changeHandler}
                    placeholder='Stars'
                    value={movie.stars}
                /> */}
                <button>Update</button>
            </form>
            {error && <div style={{ color: "red" }}>{error}</div>}
        </>
    );
};

export default UpdateMovie;
