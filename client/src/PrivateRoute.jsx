import { Navigate, Outlet } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

const PrivateRoute = () => {
  const [auth, setAuth] = useState(null);
  
  useEffect(() => {
    axios.get('http://localhost:8080/profile', { withCredentials: true })
      .then(response => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <p>Loading...</p>;
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
