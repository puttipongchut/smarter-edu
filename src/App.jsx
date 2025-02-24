import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/LoginPage";
import Home from "./pages/Home";
import PrivateRoute from "./PrivateRoute";
import './App.css';

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
