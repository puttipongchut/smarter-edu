import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage';
import Home from './pages/Home';
import AuthVerification from './components/AuthVerify';
import { AuthProvider } from './components/AuthContext';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <AuthVerification>
                <Home />
              </AuthVerification>
            }
          />
          <Route path="*" element={
            <AuthVerification>
              <Navigate to="/home" />
            </AuthVerification>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;