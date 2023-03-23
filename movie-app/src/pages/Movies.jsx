import React from 'react';
import { dummy } from '../movieDummy.js';
import Movie from '../components/Movie';

export default function Movies() {
  return (
    <div>
      <div className='movies-container'>
        {dummy.results.map((movie) => {
          return (
            <Movie
              key={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
            />
          );
        })}
      </div>
    </div>
  );
}
