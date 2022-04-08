import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/Main';

const App = () => {

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
        <Main/>
      </div>
    </BrowserRouter>
    
  );
}

export default App;