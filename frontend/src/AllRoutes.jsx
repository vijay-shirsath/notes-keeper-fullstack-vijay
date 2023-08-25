import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from './components/App'
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
const AllRoutes = () => {
  return (
    <Routes>
        <Route exact path='/' element = {<App/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
    </Routes>
  )
}

export default AllRoutes