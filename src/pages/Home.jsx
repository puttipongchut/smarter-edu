import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import PreLoader from "../components/Preloader";
import StudentInfo from "../components/StudentInfo";
import StudentTranscript from "../components/StudentTranscript";
import { FaUser, FaUserGraduate, FaArrowLeft, FaClipboardList, FaList, FaChartBar, FaLanguage, FaChevronUp, FaChevronDown, } from "react-icons/fa6";


function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showGPA, setShowGPA] = useState(false);

  const userInfo = {
    name: 'John Doe',
    faculty: 'Faculty of OP',
    advisor: {
      name: 'Dr. Jane Smith',
      email: 'jane.smith@mahidol.ac.th',
    },
    gpa: '3.85'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PreLoader />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      {/* User Info Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center relative">
        <button
          onClick={handleLogout}
          className="absolute top-3 right-3 bg-red-500 transition ease-in-out hover:scale-110 hover:bg-red-700 duration-300 text-white font-bold py-2 px-4 rounded-lg text-sm mt-1 mr-1"
        >
          Log Out
        </button>
        <div className="flex items-center space-x-4">
          {/* Profile Picture Placeholder */}
          <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xl">
            {userInfo.profilePicture ? (
              <img src={userInfo.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <FaUser />
            )}
          </div>
          {/* User Details */}
          <div className="text-left">
            <h1 className="text-xl font-bold">{userInfo.name}</h1>
            <p className="text-gray-600 text-sm">{userInfo.faculty}</p>
          </div>
        </div>
        {/* Advisor Info */}
        <div className="text-left">
          <p className="mt-3 text-gray-600 text-sm">
            Advisor: <span className="font-medium">{userInfo.advisor.name}</span>
          </p>
          <p className="text-blue-500 underline text-sm">
            <a href={`mailto:${userInfo.advisor.email}`}>{userInfo.advisor.email}</a>
          </p>
        </div>
      </div>

      {/* Back Button */}
      {selectedMenu && (
        <button onClick={() => setSelectedMenu(null)} className="mt-6 mb-4 px-4 py-2 bg-[#0035AD] text-white flex items-center space-x-2 shadow-md rounded-lg w-full max-w-md justify-center hover:bg-blue-700 transition">
          <FaArrowLeft />
          <span>Back</span>
        </button>
      )}

      {/* Navigation Menu */}
      {!selectedMenu && (
        <div className="bg-white shadow-lg rounded-lg p-4 mt-6 w-full max-w-md">
          {/* Navigation Buttons */}
          <div className="grid grid-cols-1 gap-4">
            <button
              className="w-full bg-[#0035AD] text-white flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setSelectedMenu('studentInfo')}
            >
              <span className="flex items-center space-x-3">
                <FaUserGraduate className="text-lg" />
                <span>Student's Information</span>
              </span>
            </button>

            <button
              className="w-full bg-[#0035AD] text-white flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setSelectedMenu('registration')}
            >
              <span className="flex items-center space-x-3">
                <FaClipboardList className="text-lg" />
                <span>Student Registration</span>
              </span>
            </button>

            <button
              className="w-full bg-[#0035AD] text-white flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setSelectedMenu('transcript')}
            >
              <span className="flex items-center space-x-3">
                <FaList className="text-lg" />
                <span>Student Activity Transcript</span>
              </span>
            </button>

            <button
              className="w-full bg-[#0035AD] text-white flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setSelectedMenu('englishProficiency')}
            >
              <span className="flex items-center space-x-3">
                <FaLanguage className="text-lg" />
                <span>English Proficiency Score</span>
              </span>
            </button>

            {/* GPA Dropdown Button */}
            <button
              className="w-full bg-[#0035AD] text-white flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setShowGPA(!showGPA)}
            >
              <span className="flex items-center space-x-3">
                <FaChartBar className="text-lg" />
                <span>GPA</span>
              </span>
              {showGPA ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {/* GPA Dropdown Content */}
            {showGPA && (

              <div className="text-center">
                <h1>Accumulative GPA</h1>
                <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg mt-2 text-center shadow-inner">
                  <span className="font-bold text-lg">{userInfo.gpa}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedMenu === "studentInfo" && <StudentInfo />}
      {/* {selectedMenu === "registration" && <CourseRegistration />} */}
      {selectedMenu === "transcript" && <StudentTranscript />}
      {/* {selectedMenu === "englishProficiency" && <EnglishProficiency />} */}

    </div>
  );
}

export default Home;