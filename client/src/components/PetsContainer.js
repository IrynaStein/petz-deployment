import "./PetsContainer.css";
import Pet from "./Pet";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PetsContainer() {
  const pets = useSelector((state) => state.pets.petList);
  console.log(pets);

  const renderPets = () =>
    pets.map((pet) => {
      if (pet.alive) {
        return <Pet key={pet.id} pet={pet} />;
      } else {
        return <div key={pet.id}/>;
      }
    });

  return (
    <div className="pet-container">
      <div className="centered-buttons">{pets.length <= 2 ? (
        <Link  className="button-gray" to="/create_pet">
          Create new pet
        </Link>
      ) : null}
      </div>
     <div className="pets-window">
      {renderPets()}
      </div>
    </div>
  );
}
