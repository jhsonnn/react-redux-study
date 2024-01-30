import './Row.css';
import axios from '../../api/axios';
import { useCallback, useEffect, useState } from 'react';

const Row = ({title, id, fetchUrl}) => {

  const [movies, setMovies] = useState([]);

  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    //[{},{},{},...]
    setMovies(response.data.results);
  }, [fetchUrl])
  
  //영화 정보를 가져오기
  useEffect(()=>{
    fetchMovieData();
  }, [fetchMovieData])
  
  
  return (
    <div>
      <h2>{title}</h2>
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span className='arrow'
            onClick={
              ()=>{
                // scrollLeft ; 요소의 콘텐츠가 왼쪽 가장자리에서 스크롤되는 픽셀 수를 가지고 오거나 설정
                document.getElementById(id).scrollLeft -= window.innerWidth -80;
              }
            }
          >
            {"<"}
          </span>
        </div>
        <div id={id} className='row__posters'>
          {movies.map((movie)=>(
            <img 
              key={movie.id}
              className='row__poster'
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.name}
            />
          ))}
        </div>
        <div className='slider__arrow-right'>
          <span className='arrow'
            onClick={()=>{
              document.getElementById(id).scrollLeft += window.innerWidth -80;
            }}
          >
            {">"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Row
