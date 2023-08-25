import React from "react";
import {useDispatch, useSelector} from "react-redux"
import { logoutUser } from "../store/slices/authSlice";
import {Link} from "react-router-dom"
function Header() {
  const dispatch = useDispatch();
  const auth  = useSelector(state => state.auth);
  const handleLogout = () => {
    dispatch(logoutUser());
  }
  return (
    <header>
        <div>
          <Link to = "/" style={{textDecoration : "none"}}><h1>Keeper</h1></Link>
        </div>
        {
          auth._id ? (
            <Link className="login-register" onClick={handleLogout} style={{cursor : "pointer"}}>Logout</Link>
          ) : (
            <div className="user-auth">
            <Link to="/login" className="login-register">Login</Link>
            <Link to="/register" className="login-register">Register</Link>
          </div>
          )
        }
       
    </header>
  );
}

export default Header;
