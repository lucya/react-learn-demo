import React from 'react';
import { useNavigate } from 'react-router-dom';

export const IMG_BASE_URL = 'https://www.themoviedb.org/t/p/w440_and_h660_face';

export default function Movie(props) {
  const navigate = useNavigate();

  const onClickMovieItem = () => {
    navigate(`/movie/${props.title}`, { state: props });
  };
  return (
    <div className='movie-container' onClick={onClickMovieItem}>
      <img src={IMG_BASE_URL + props.poster_path} alt={props.title} />
      <div className='movie-info'>
        <h4>{props.title}</h4>
        <span>{props.vote_average}</span>
      </div>
    </div>
  );
}
