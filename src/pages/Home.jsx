import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function Home() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div className="homePage bg-green-100 flex items-center justify-center min-h-screen">
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Log Out
            </button>
            <h1 className="text-3xl font-bold">Welcome to the Home Page!</h1>
        </div>
    );
}

export default Home;