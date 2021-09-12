import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPet } from "../store/petSlice";

import "./CreatePet.css";

export default function CreatePet() {
  const avocado =
    "https://live.staticflickr.com/65535/51424737451_68d984499f_o.png";
  const icecream =
    "https://live.staticflickr.com/65535/51424737566_8c2d4c6092_o.png";
  const charcoal =
    "https://live.staticflickr.com/65535/51424737761_a8cb15f2f1_o.png";
  const strawberry =
    "https://live.staticflickr.com/65535/51423990027_059f38b3d6_o.png";

  const tibbar =
    "https://live.staticflickr.com/65535/51425499894_6cfaa9a365_o.png";
  const drazzil =
    "https://live.staticflickr.com/65535/51423990307_69aff94700_o.png";

  const [formData, setFormData] = useState({
    breed: "",
    name: "",
    food: "",
    activity: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.pets.errors);
  const handleClick = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    dispatch(createPet(formData)).then(() => history.push("/"));
  };

  return (
    <div>
      <>{errors}</>
      <form className="createform-container" onSubmit={handleSubmit}>
        <label style={{fontSize: "20px"}}>Choose your pet's breed</label>
        <div className="feature-container">
          <div className="feature-item">
          <img src={tibbar} style={{ height: "80px" }} alt="tibbar" />
          <div className="feature-item-button">
            <input
              onClick={handleClick}
              type="radio"
              id="tibbar"
              name="breed"
              value="tibbar"
            ></input>
            <label for="tibbar">Tibbar</label>
            </div>
          </div>

          <div className="feature-item">
          <img src={drazzil} style={{ height: "80px" }} alt="drazzil" />
          <div className="feature-item-button">
            <input
              onClick={handleClick}
              type="radio"
              id="drazzil"
              name="breed"
              value="drazzil"
            ></input>
            <label for="drazzil">Drazzil</label>
          </div>
          </div>
        </div>

        <label for="name" style={{fontSize: "20px"}}>Name your pet</label>
        <div>
          <input
            onChange={handleClick}
            className="input-field-orange"
            id="name"
            name="name"
            placeholder="pet name..."
            value={formData.name}
          ></input>
        </div>
        <label style={{fontSize: "20px"}}>Choose your pet's favorite snack</label>

        <div className="feature-container">
          <div className="feature-item">
            <img src={avocado} style={{ height: "40px" }} alt="avocado" />
            <div className="feature-item-button">
              <input
                onClick={handleClick}
                type="radio"
                id="avocado"
                name="food"
                value="avocado"
              ></input>
              <label for="avocado">avocado</label>
            </div>
          </div>

          <div className="feature-item">
            <img src={icecream} style={{ height: "40px" }} alt="icecream" />
            <div className="feature-item-button">
              <input
                onClick={handleClick}
                type="radio"
                id="icecream"
                name="food"
                value="icecream"
              ></input>
              <label for="icecream">icecream</label>
            </div>
          </div>

          <div className="feature-item">
            <img src={charcoal} style={{ height: "40px" }} alt="charcoal" />
            <div className="feature-item-button">
              <input
                onClick={handleClick}
                type="radio"
                id="charcoal"
                name="food"
                value="charcoal"
              ></input>
              <label for="charcoal">charcoal</label>
            </div>
          </div>

          <div className="feature-item">
            <img src={strawberry} style={{ height: "40px" }} alt="strawberry" />
            <div className="feature-item-button">
              <input
                onClick={handleClick}
                type="radio"
                id="strawberry"
                name="food"
                value="strawberry"
              ></input>
              <label for="strawberry">strawberry</label>
            </div>
          </div>
        </div>

        <label style={{fontSize: "20px"}}>Choose your pet's favorite activity</label>
        <div className="feature-container">
          <div>
            <input
              onClick={handleClick}
              type="radio"
              id="swimming"
              name="activity"
              value="swimming"
            ></input>
            <label for="swimming">swimming</label>

            <input
              onClick={handleClick}
              type="radio"
              id="coding"
              name="activity"
              value="coding"
            ></input>
            <label for="coding">coding</label>

            <input
              onClick={handleClick}
              type="radio"
              id="hiking"
              name="activity"
              value="hiking"
            ></input>
            <label for="hiking">hiking</label>

            <input
              onClick={handleClick}
              type="radio"
              id="balling"
              name="activity"
              value="balling"
            ></input>
            <label for="balling">ball</label>
          </div>
        </div>
        <button className="button-orange" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
