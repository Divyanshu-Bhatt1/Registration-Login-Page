// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

function App() {
 const [login,setLogin]=useState(false)

  return (
    <Router>
      <div className="App flex min-h-screen flex-row items-center justify-center bg-teal-500 h-lvh">
         
          <Routes>
            <Route path="/" element={<Register setLogin={setLogin}/>} />
            <Route path="/Login" element={<Login setLogin={setLogin}/>} />
            <Route path="/home" element={<Home login={login}/>} />
         </Routes>
       
      </div>
    </Router>
  );
}

export default App;
