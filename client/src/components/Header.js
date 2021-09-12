import classes from "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onLogout } from "../store/userSlice";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const logoutHandler = () => {
    dispatch(onLogout());
  };

  return (
    <div className="header-container">
      <div className="dropdown" style={{ float: "right" }}>
        <div className="menu">&#9776;</div>
        <div className="dropdown-content">
          <NavLink activeclassname={classes.active} to="/how-to-play">
            Game rules
          </NavLink>
          <NavLink activeclassname={classes.active} to="/cemetery">
            Visit Cemetery
          </NavLink>
          <NavLink exact to="/" activeclassname={classes.active}>
            Home
          </NavLink>
          {user ? (
            <Link
              activeclassname={classes.active}
              exact
              to="/login"
              onClick={logoutHandler}
            >
              Logout
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
