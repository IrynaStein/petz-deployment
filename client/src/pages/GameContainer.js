import { useEffect } from "react";
import "./GameContainer.css";
import GamePet from "../components/GamePet";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../store/petSlice";
import { petActions } from "../store/petSlice";
import { gameActions } from "../store/gameSlice";
import WellnessBar from "../components/WellnessBar";
import { updatePet } from "../store/petSlice";
import Timer from "../functions/Timer";
import Loader from "../functions/Loader";

export default function GameContainer() {
  const params = useParams();
  const pets = useSelector((state) => state.pets.petList);
  const pet = useSelector((state) => state.pets.pet);
  const gamePaused = useSelector((state) => state.game.gamePaused);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  dispatch(petActions.gamePet(pets.find((pet) => pet.name === params.petName)));

  const saveGameHandler = () => {
    dispatch(updatePet(pet));
  };
  const pauseGameHandler = () => {
    dispatch(gameActions.pauseGame());
  };

  return (
    <div className="game-container">
      <div className="centered-buttons">
        <Timer />
        {user.user_name === "iryna" ? (
          <button onClick={pauseGameHandler} className="button-green">
            {gamePaused ? "Resume Game" : "Pause Game"}
          </button>
        ) : null}

        <button onClick={saveGameHandler} className="button-green">
          Save Game
        </button>
      </div>
      {pets.length > 0 ? (
        <>
          <GamePet />
          <WellnessBar />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
