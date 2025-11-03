import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./layout/Signup";
import Login from "./layout/Login";
import Library from "./layout/Library";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Style/Style.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </Router>
  );
};

export default App;
