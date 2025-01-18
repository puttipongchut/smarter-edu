import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/LoginPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route
         path='/home'
         element={
         <PrivateRoute>
          <Navbar />
          <Home />
         </PrivateRoute>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
