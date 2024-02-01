import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

const SearchPage = () => {

  const [searchResults, setSearchResults ]= useState([]);

  // const location = useLocation();
  // console.log(location);

  const useQuery = ()=>{
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const searchTerm = query.get('q');

  useEffect(()=>{
    if(searchTerm){
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm])

  const fetchSearchMovie = async (searchTerm) =>{
    try{
      const response = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      )
      console.log(response)
      setSearchResults(response.data.results);
    }catch (error){
      console.log(error);
    }
  }

  return (
    <div>
      SearchPage
    </div>
  )
}

export default SearchPage
