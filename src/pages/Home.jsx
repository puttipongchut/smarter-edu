import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import PreLoader from "../components/Preloader";

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('Option1');

    const userInfo = {
        name: 'John Doe',
        faculty: 'Faculty of Science',
        advisor: {
          name: 'Dr. Jane Smith',
          email: 'jane.smith@mahidol.ac.th',
        },
      };

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 2000); // 2 seconds loading time
    
        return () => clearTimeout(timer);
      }, []);
    
      if (isLoading) {
        return <PreLoader />;
      }

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const handleMenuClick = (option) => {
        setSelectedOption(option);
      };

    return (        
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* User Information */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-11/12 max-w-xl">
        <h1 className="text-2xl font-bold mb-2">{userInfo.name}</h1>
        <p className="text-gray-600 mb-2">Faculty: {userInfo.faculty}</p>
        <p className="text-gray-600 mb-1">
          Advisor: <span className="font-medium">{userInfo.advisor.name}</span>
        </p>
        <p className="text-blue-500 underline text-sm">
          <a href={`mailto:${userInfo.advisor.email}`}>{userInfo.advisor.email}</a>
        </p>
        <div className="mt-4">
        <button
                onClick={handleLogout}
                className="bg-red-500 transition ease-in-out delay-800 hover:scale-110 hover:bg-red-700 duration-300 text-white font-bold py-2 px-4 rounded-lg"
            >
                Log Out
            </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white shadow-lg rounded-lg p-4 mt-6 w-11/12 max-w-xl">
        <div className="flex justify-between mb-4">
          {['Option1', 'Option2', 'Option3', 'Option4', 'Option5'].map((option) => (
            <button
              key={option}
              onClick={() => handleMenuClick(option)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition ${
                selectedOption === option
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Dynamic Content Section */}
        <div className="p-4 border rounded-lg bg-gray-50">
          {selectedOption === 'Option1' && <p>You selected <strong>Option 1</strong>. Lorem Ipsum</p>}
          {selectedOption === 'Option2' && <p>You selected <strong>Option 2</strong>. Lorem Ipsum</p>}
          {selectedOption === 'Option3' && <p>You selected <strong>Option 3</strong>. Lorem Ipsum</p>}
          {selectedOption === 'Option4' && <p>You selected <strong>Option 4</strong>. Lorem Ipsum</p>}
          {selectedOption === 'Option5' && <p>You selected <strong>Option 5</strong>. Lorem Ipsum</p>}
        </div>
      </div>
    </div>
    );
}

export default Home;