
import './App.css';
import React, { useLayoutEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Route, Routes, useHistory, withRouter } from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";



function App() {  
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* <Route path='/' exact component={Home} /> */}
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


function IsLoggedIn({children}){
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const history = useHistory()
  const token = user?.token;
  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()){
      return children
    }
    history.push("/")
    return Home;
  }
  return children
} */