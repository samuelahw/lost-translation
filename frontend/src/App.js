import logo from './logo.svg';
import './App.css';
import { Translation } from './components/Translation'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTranslations } from './reducers/userReducer';
import { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginForm } from './components/LoginForm'
import { storageRead } from './utils/storage';
import Profile from './components/Profile';
import Navbar from './components/Navbar/Navbar';
import { useState } from 'react';


function App() {

  useEffect(() => {

  }, [])

  return (
    <BrowserRouter>
      <div className="container">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<LoginForm></LoginForm>} />
          <Route path="/translate" element={<Translation></Translation>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
