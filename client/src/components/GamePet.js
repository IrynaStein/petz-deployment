import "./GamePet.css";
import Birthday from "../functions/Birthday";
import { useSelector } from "react-redux";
import Loader from "../functions/Loader";

export default function GamePet() {
  
const pet =  useSelector(state => state.pets.pet)
const notification = useSelector(state => state.pets.notification)

  if (!pet) return <Loader/>
  return (
    <> 
    {notification !== "" ? <div className="info-container"><div className="notification-container">{notification}</div></div> : <div className="info-container">
      <div className="notification-container">
        Hi!
        I am {pet.name.toUpperCase()} the {pet.breed.name.toUpperCase()}. <br/> My
        favorite food is {pet.food.name} - if I behave well give me some! My
        favorite activity is {pet.activity.name}. Lets play.
        </div></div>}
    {pet.alive? <>
      <div className="pet-display">
        <Birthday pet={pet} />
      </div>
    </>

    :

    <div className="ghost-display"><img src="https://live.staticflickr.com/65535/51425421314_73dab74c11_o.png" alt="ghost"/></div>
  }
    </>
  );
}

