import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  console.log(auth)
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name : "",
    email : "",
    password : "",
    confirmPassword : "",
  })

  console.log(user);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(user));
  }

  useEffect(() => { /* To ensure a consistent navigation experience, you can use the useEffect hook to listen for changes in the auth.userLoaded state and then trigger the navigation. This way, the navigation will occur once the state is properly updated. */

  if(auth.userLoaded){
    navigate("/");
  }

  }, [auth.userLoaded, navigate])

  return (
    <div>
      <Header/>
      <form action="" className='login-form' onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type='text' placeholder='Enter Your Full Name' onChange={(event) => setUser({...user, name : event.target.value})}/>
        <input type='email' placeholder='Enter Your Email' onChange={(event) => setUser({...user, email : event.target.value})}/>
        <input type='password' placeholder='"Enter Your Password' onChange={(event) => setUser({...user, password : event.target.value})}/>
        <input type='password' placeholder='Confirm Your Password' onChange={(event) => setUser({...user, confirmPassword : event.target.value})}/>
        <input type="submit" value = {auth.registerStatus === "pending" ? "pending" : "register"}/>

        {
          auth.registerStatus === "rejected" && (
            <p style={{marginTop:"10px",textAlign:"center"}}>{auth.registerError}</p>
          )
        }
      </form>
    </div>

  )
}

export default Register