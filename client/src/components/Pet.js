import { useState } from "react";
import { Link } from "react-router-dom";
import "./Pet.css";
import Birthday from "../functions/Birthday";
import { useDispatch } from "react-redux";
import { deletePet } from "../store/petSlice";

export default function Pet({ pet }) {
  const [infoCard, setInfoCard] = useState(false);
  const dispatch = useDispatch();
  const { name, birthday } = pet;
  const today = new Date().getDate();
  // const date = [(today.getMonth() + 1), today.getDate()]
  const age = birthday.split("-").slice(1);

  const currentAge = today - age[1];

  const deleteHandler = () => {
    dispatch(deletePet(pet.id));
  };

  return (
    <div className="pet-element">
      <button className="button-regular-inv" onClick={deleteHandler}>
        x
      </button>
      <Link className="pet-card" to={`/game/${pet.name}`}>
        <Birthday pet={pet} />
      </Link>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setInfoCard((mUV) => !mUV)}
      >
        {infoCard ? (
          <div className="button-gray">show less info about {name}</div>
        ) : (
          <div className="button-gray">show more info about {name}</div>
        )}
      </div>
      {infoCard ? (
        <div className="info-card">
          <p>Name: {name}</p>
          <p>Breed: {pet.breed.name}</p>
          <p>Age: {currentAge} </p>
          <p>Favorite food: {pet.food.name}</p>
          <p>Favorite activity: {pet.activity.name}</p>
        </div>
      ) : null}
    </div>
  );
}
