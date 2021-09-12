import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createUser } from "../store/userSlice";
import { useForm } from "react-hook-form";

function SignupForm() {
  const dispatch = useDispatch();
  const errorsBE = useSelector((state) => state.user.errors);
  const user = useSelector((state) => state.user.user);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    console.log(data.image[0])
    e.preventDefault();
    const formData = new FormData();
    if (data.image[0]) {
      formData.append("image", data.image[0]);
      formData.append("user_name", data.user_name);
      formData.append("password", data.password);
      formData.append("password_confirmation", data.password_confirmation);
      formData.append("email", data.email);
    } else {
      formData.append("user_name", data.user_name);
      formData.append("password", data.password);
      formData.append("password_confirmation", data.password_confirmation);
      formData.append("email", data.email);
    }
    dispatch(createUser(formData))
  }

  if (user) return (<Redirect to='/'></Redirect>)

  return (
    <div className="App">
      <Link className="button-regular" to="login">
        &#8592;Back to Login
      </Link>

      <form
        encType="multipart/form-data"
        className="centered-form-signup"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="input-field-orange"
          name="user-name"
          placeholder="user name..."
          {...register("user_name", { required: true })}
        ></input>
        <br />
        <input
          className="input-field-orange"
          name="password"
          type="password"
          placeholder="password..."
          {...register("password", { required: true })}
        ></input>
        <br />
        <input
          className="input-field-orange"
          name="password_confirmation"
          type="password"
          placeholder="confirm password..."
          {...register("password_confirmation", { required: true })}
        ></input>
        <br />
        <input
          className="input-field-orange"
          name="email"
          placeholder="email..."
          {...register("email", { required: true })}
        ></input>
        <br />
        <div className="upload-btn-wrapper">
          <button className="btn">Avatar &#128206;</button>
          <input
            className="input-field-orange"
            type="file"
            name="image"
            {...register("image")}
          ></input>
        </div>
        <br />
        <button className="button-regular" type="submit">
          Signup
        </button>
      </form>
      <br />
      {errorsBE.length !== 0 ? (
        <div className="pop-up-message">{errorsBE}</div>
      ) : null}
    </div>
  );
}
export default SignupForm;
