import React, { useEffect } from 'react'
import { useAppDispatch } from '../app/hooks'
import { fetchUsersAsync, incrementAsync } from './counter/counterSlice';

const Test = () => {

  const dispatch = useAppDispatch();
  useEffect(()=>{

    const promise = dispatch(fetchUsersAsync());
    //const promise = dispatch(incrementAsync(10));
    
    return ()=>{
      //Thunk를 실행중에 중지
      promise.abort();
    }

  }, [])

  return (
    <div>
      Test
    </div>
  )
}

export default Test
