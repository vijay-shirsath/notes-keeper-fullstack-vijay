import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';
import {useNavigate} from "react-router-dom"
const Login = () => {
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  console.log(auth)
  const dispatch = useDispatch();
  const [user , setUser] = useState({
    email : "",
    password : ""
  });

  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  }

  useEffect(() => {  /* To ensure a consistent navigation experience, you can use the useEffect hook to listen for changes in the auth.userLoaded state and then trigger the navigation. This way, the navigation will occur once the state is properly updated. */
  
    if (auth.userLoaded) {
      navigate('/');
    }
  }, [auth.userLoaded, navigate]);

  return (
    <div>
      <Header />
      <form action="" className='login-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="email" placeholder='Enter Your Email' onChange={(event) => setUser({...user, email : event.target.value})}/>
        <input type='password' placeholder='Enter Your Password' onChange={(event) => setUser({...user,password:event.target.value})}/>
        <input type='submit' value={auth.loginStatus === "pending" ? "pending" : "Login"}/>

        {
          auth.loginStatus === "rejected" ? (
            <p style={{marginTop:"10px",textAlign:"center"}}>{auth.loginError}</p>
          ) : null
        }
      </form>
    </div>
  )
}

export default Login