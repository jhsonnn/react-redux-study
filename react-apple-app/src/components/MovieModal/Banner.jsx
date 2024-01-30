import './Banner.css';
import React, { useEffect, useState } from 'react';

import axios from '../../api/axios';
import requests from '../../api/request';
import styled from 'styled-components';


const Banner = () => {

  const [movie, setMovie] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(()=>{
      fetchData();
  }, []);

  const fetchData = async() => {
    //현재 상영중 여러 영화정보 가져오기
    const response = await axios.get(requests.fetchNowPlaying);
    console.log(response)
  
    // //여러 영화 중 영화 하나의 ID 가져오기
    const movieId = response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;

      //특정 영화의 더 상세한 정보 가져오기(비디오 정보 포함)
      const {data: movieDetail } = await axios.get(`movie/${movieId}`, {
        params: { append_to_response: "videos" }
      })
      console.log('movieDetail', movieDetail);
      setMovie(movieDetail);
  }

  //설명 글 자르기
  const truncate = (str, n) =>{
    return str?.length > n ? str.substring(0, n) + "..." : str;
  }
  if(!movie){
    return (
      <div>loading...</div>
    )
  }

  if(!isClicked){
    return (
      <div
        className='banner'
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
        }}
      >
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {movie.title || movie.name || movie.original_name}
          </h1>    
          <div className='banner__buttons'>
            {movie.videos?.results[0]?.key ?
              <button
              className='banner__button play'
              onClick = {() => setIsClicked(true)}
              >
                Play  
              </button>
              : null
            }
            <p className='banner__description'>
              {/* {movie.overview} */}
              {truncate(movie.overview, 100)}
            </p>
          </div>
        </div>
        <div className='banner--fadeBottom' />
      </div>
    )
  }else{
    //클릭되면 비디오 배너 보여주기
    return(
      <>
      <Container>
        <HomeContainer>
          <Iframe src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?control=0&autoplay=1&mute=1`}></Iframe>
        </HomeContainer>
      </Container>
      {/* 돌아가기 버튼 */}
      <button onClick={()=> setIsClicked(false)}>
        x
      </button>
      </>
    )
  }
}

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`


export default Banner