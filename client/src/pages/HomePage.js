import "./HomePage.css";
import User from "../components/User"
import PetsContainer from "../components/PetsContainer";
import { useEffect } from "react";
import {useDispatch} from 'react-redux'
import { fetchPets } from "../store/petSlice";


export default function HomePage () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]); 

  return (
  <div className="main-container">
      <div className="wrapper">
       <User/> 
      </div>
      <div className="wrapper">
     <PetsContainer/> 
      </div>
    </div>
  );
}
