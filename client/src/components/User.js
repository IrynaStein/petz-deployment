import { useState } from "react";
import { useForm } from "react-hook-form";
import "./User.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../store/userSlice";
import { updateUser } from "../store/userSlice";

export default function User() {
  const [showForm, setShowForm] = useState(false);
  const user = useSelector((state) => state.user.user);
  const { user_name, email, id, image } = user;
  const errorsBe = useSelector((state) => state.user.errors);
  const preloadedValues = {
    user_name: user_name,
    email: email,
    image: image,
  };
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: preloadedValues,
  });
  const deleteUserHandler = () => {
    dispatch(deleteUser(id));
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    dispatch(updateUser(data, id));
    if (errorsBe.length === 0) {
      setShowForm(false);
    } else {
      reset();
    }
  };

  const handleCancel = () => {
    reset();
    setShowForm(false);
  };

  return (
    <>
      {showForm ? (
        <div className="user-container-centered">
          {errorsBe.length > 0
            ? errorsBe[0].map((err, ind) => (
                <div style={{ fontSize: "12px" }}>
                  {ind + 1}. {err}
                  <br />
                </div>
              ))
            : null}
          <div
            className="button-regular-inv"
            onClick={handleCancel}
            style={{ fontSize: "15px" }}
          >
            {" "}
            &#8592;Back to profile
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="input-field-gray"
              name="user-name"
              placeholder="user name..."
              {...register("user_name")}
            ></input>
            <br />
            <input
              className="input-field-gray"
              name="password"
              type="password"
              placeholder="re-enter password..."
              {...register("password", { required: true })}
            ></input>
            {errors.password && (
              <div style={{ fontSize: "10px" }}>
                Password is required.Please re-type or create a new one
              </div>
            )}
            <br />
            <input
              className="input-field-gray"
              name="password_confirmation"
              type="password"
              placeholder="confirm password..."
              {...register("password_confirmation", { required: true })}
            ></input>
            {errors.password_confirmation && (
              <div style={{ fontSize: "10px" }}>Confirm your password</div>
            )}
            <br />
            <input
              className="input-field-gray"
              name="email"
              placeholder="email..."
              {...register("email")}
            ></input>
            <br />
            {/* <input
            type="file"
              className="input-field-gray"
              name="image"
              placeholder="image..."
              {...register("image")}
            ></input>
            <br /> */}
            <div className="centered-buttons">
              <button className="button-gray" type="submit">
                Update my profile
              </button>
              <br />
            </div>
          </form>
        </div>
      ) : (
        <div className="user-container">
          <div className="centered-buttons">
            <button className="button-gray" onClick={() => setShowForm(true)}>
              Edit profile
            </button>
            <button className="button-gray" onClick={deleteUserHandler}>
              {" "}
              Delete profile
            </button>
          </div>
          <img
            className="user-avatar"
            src={
              image
                ? image.url
                : "https://live.staticflickr.com/65535/51434875121_54db17d433_o.png"
            }
            alt="user"
          />
          <p>Hello {user_name}!</p>
          <p>
            You can create or edit your profile here. Below is the list of pets
            you own. You can also create up to 3 pets if you dont have any yet.
            Good luck!!!{" "}
          </p>
        </div>
      )}
    </>
  );
}
