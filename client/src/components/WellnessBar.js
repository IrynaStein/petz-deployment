import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { petActions } from "../store/petSlice";
import { gameActions } from "../store/gameSlice";
import { updatePet } from "../store/petSlice";
import WellnessRender from "../functions/WellnessRender";

export default function WellnessBar() {
  const pet = useSelector((state) => state.pets.pet);
  const dirty = useSelector((state) => state.pets.dirty);
  const gamePaused = useSelector((state) => state.game.gamePaused);

  const dispatch = useDispatch();

  useEffect(() => { 
    let clockInterval;
    if (gamePaused) {
      clearInterval(clockInterval);
    }
    else {
      if (pet.alive && pet.healthy) {
        clockInterval = setInterval(() => {
          if (pet.sleepy < 0 && pet.hungry < 0) {
            dispatch(petActions.petDead(pet.id));
            clearInterval(clockInterval);
       
          } else if (pet.sleepy < -1 || pet.hungry < -1) {
            dispatch(petActions.petDead(pet.id));
            clearInterval(clockInterval);
          } else if ((pet.bored < 0 && pet.hungry < 0) || (pet.bored < 0 && pet.sleepy < 0)) {
            dispatch(petActions.petDead(pet.id));
            clearInterval(clockInterval);
          } else {
            dispatch(petActions.getSleepy(pet.id));
            dispatch(petActions.getHungry(pet.id));
            dispatch(petActions.getDirty(pet.id));
            dispatch(petActions.getBored(pet.id));
            dispatch(petActions.getSick(pet.id));
          }
        }, 15000);
      } else if (pet.alive && !pet.healthy){
        dispatch(gameActions.pauseGame())
      }
      else {
        clearInterval(clockInterval);
        dispatch(updatePet(pet));
      }
    }
    return () => {
      clearInterval(clockInterval);
    };
  }, [dispatch, pet.sleepy, pet.hungry, pet.bored, dirty, pet.alive, pet.id, pet.name, pet, gamePaused]);


  const feedHandler = () => {
    dispatch(petActions.petFeed(pet.id));
  };

  const playHandler = () => {
    dispatch(petActions.petPlay(pet.id));
    dispatch(petActions.getSick(pet.id))
  };

  const cleanHandler = () => {
    dispatch(petActions.petClean(pet.id));
  };

  const sleepHandler = () => {
    dispatch(petActions.petSleep(pet.id));
    dispatch(petActions.getBored(pet.id));
  };

  const vetHandler = () => {
    dispatch(petActions.gotoVet(pet.id))
    dispatch(gameActions.pauseGame(false));
  };

  return (
    <>
      {pet.alive ? (
        <div className="wellness-bar">
          <section>
            sleepy: <WellnessRender arg={pet.sleepy} />
            <button
            disabled={gamePaused}
              onClick={sleepHandler}
              className="button-green"
              style={{ width: "60px" }}
            >
              put to bed
            </button>
          </section>{" "}
          <section>
            hungry: <WellnessRender arg={pet.hungry} />
            <button
            disabled={gamePaused}
              onClick={feedHandler}
              className="button-green"
              style={{ width: "60px" }}
            >
              feed
            </button>
          </section>
          <section>
            bored: <WellnessRender arg={pet.bored} />
            <button
            disabled={gamePaused}
              onClick={playHandler}
              style={{ width: "60px" }}
              className="button-green"
            >
              play
            </button>
          </section>
          <section>
            dirty: <WellnessRender arg={dirty} />
            <button
            disabled={gamePaused}
              style={{ width: "60px" }}
              className="button-green"
              onClick={cleanHandler}
            >
              shower
            </button>
          </section>
          <section>
            healthy: {!pet.healthy ? (
            <div className="health_container">
              <img
                src="https://i.imgur.com/arrUsjs.gif"
                onClick={vetHandler}
                alt="medical" style={{cursor: "pointer"}}
              />{" "}
            </div>
          ) : (
            <div className="health_container">
              <img
                src="https://live.staticflickr.com/65535/51425384610_2a4c6065b3_o.png"
                alt="medical" 
              ></img>
            </div>
          )}
            <button
            disabled={pet.healthy}
              style={{ width: "60px" }}
              className="button-green"
              onClick={vetHandler}
            >
              go to vet
            </button>
          </section>
        </div>
      ) : (
        <Link to='/cemetery' className="pop-up">Your pet passed away. <br/> Lets visit cemetery</Link>
      )}
    </>
  );
}
