import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import { useSelector } from "react-redux";

const App = () => {
  const logged = useSelector((state) => state.LOGGED);

  console.log("Logged Status:", logged);

  // const[isSignedIn , setIsSignedIn] = useState(false);

  // useEffect = () => {
  //   const email = localStorage.getItem("token");
  //   if(email){
  //     setIsSignedIn(true);
  //   }
  // }
  return (
    <BrowserRouter>
      <div>
        {/* App Component Has a Child Component called Main*/}
        <Main />
      </div>
    </BrowserRouter>
  );
};

export default App;
