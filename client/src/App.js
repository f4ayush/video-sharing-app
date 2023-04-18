
import './App.css';
import React, { useLayoutEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Route, Routes, withRouter, useNavigate } from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login"
import decode from "jwt-decode";
import Home from "./components/Home/Home"
function App() {  
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/">
          <Route index element={<Home/>} />
        </Route>
        <Route path='/login' exact element={<Login/>}></Route>
        <Route path='/sign-up' exact element={<Login/>}></Route>
      </Routes>
    </Router>

  );
}

export default App;

/* function PrivateRoutes({ children }){
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const history = useHistory()
  const token = user?.token;
  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()){
      history.push("/")
      return Login
    }
    return children;
  }
  history.push("/")
  return Login
}
 */

/* function IsLoggedIn({children}){
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const navigate = useNavigate()
  const token = user?.token;
  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()){
      return children
    }
    navigate("/")
    return Home;
  }
  return children
} */