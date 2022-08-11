import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./components/login/login.component";
import Profile from "./components/profile/profile.component";
import Registration from "./components/registration/registration.component";

import "./App.css";
import Navigation from "./components/navigation/nav.component";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
