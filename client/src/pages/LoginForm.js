import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onLogin } from "../store/userSlice";
import { useForm } from "react-hook-form";

function LoginForm() {
  const {register, handleSubmit, reset } = useForm()
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.user.errors);

  function onSubmit(data, e) {
    e.preventDefault();
    console.log(data);
    dispatch(onLogin(data));
    reset()
  }

  return (
    <div className="App">
      <form className="centered-form-login" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-field-orange"
          {...register("user_name")}
          type="text"
          name="user_name"
          placeholder="user name..."
        ></input>
        <br />
        <input
          className="input-field-orange"
          {...register("password")}
          type="password"
          name="password"
          placeholder="password..."
        ></input>
        <br />
        <button className="button-regular">Login</button>
        <Link to="/signup">
          <button className="button-regular" type="submit">
            Signup
          </button>
          <br/>
        </Link>
        {errors.length > 0 ? errors.map(
          (err, ind) => `${ind + 1}. ${err} \n`) : null}
      </form>
    </div>
  );
}

export default LoginForm;
