import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Mahidol_logo from '../assets/Mahidol_logo.png';
import LoginSuccessModal from '../components/LoginSuccess';

const Login = ({ setToken }) => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [authMode, setAuthMode] = useState('user');
  const navigate = useNavigate();

  const handleAuthClick = () => {
    setAuthMode('auth');
  };

  const handleBackClick = () => {
    setAuthMode('user');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/login', { email, password }, { withCredentials: true });
      setToken(response.data.token);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/home');
      }, 3000);
      
      //navigate('/home'); // Redirect to Home page
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <div className='homePage bg-[#0035AD] font-sans leading-normal tracking-normal flex items-center justify-center min-h-screen'>
        <div className="container max-w-lg">
          <div className="bg-gray-50 shadow-2xl rounded-lg px-8 pt-6 pb-8">
            <div className='text-center'>
              <div className='flex justify-center items-center mb-3'>
                <img src={Mahidol_logo} alt="Mahidol_logo" className='rounded-full w-20 h-18' />
              </div>
              <h1 className="text-2xl font-bold mb-4">MAHIDOL STUDENT LOG IN</h1>
              {authMode === 'user' ? (
                <>
                  <p className="mb-4 text-xl">สวัสดี! นักศึกษามหาวิทยาลัยมหิดล</p>
                  <p className="mb-4 text-xl">สำหรับนักศึกษาที่มีรหัสผ่าน Internet Account คลิกเข้าระบบที่ปุ่ม Mahidol Authen</p>
                  <button
                    className="bg-[#AA800E] transition ease-in-out delay-800 text-white hover:scale-110 hover:bg-[#dfa812] duration-300 font-bold py-2 px-4 rounded-lg mb-4"
                    onClick={handleAuthClick}
                  >
                    Mahidol Authen
                  </button>
                </>
              ) : (
                <>
                  <button
                    className='text-[#0035AD] transition delay-800 hover:text-blue-700 font-bold mb-4 flex items-center'
                    onClick={handleBackClick}
                  >
                    ← Back
                  </button>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      {error && <p className="text-red-500">{error}</p>}
                      <label className="text-left block text-gray-700 text-m font-bold mb-2" htmlFor="student-email">
                        Student Email
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="student-email"
                        type="email"
                        placeholder="Enter your student email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-left block text-gray-700 text-m font-bold mb-2" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                    <button
                      className="bg-[#0035AD] transition ease-in-out delay-800 hover:scale-110 hover:bg-blue-500 duration-300 text-white font-bold py-2 px-4 rounded-lg"
                      type='submit'
                    >
                      Log In
                    </button>
                  </form>
                </>
              )}
            </div>
            <p className="mt-4">
              <button onClick={handleModalOpen} className="text-blue-500 hover:text-blue-700">
                ตรวจสอบรหัสล็อกอิน กดตรงนี้
              </button>
            </p>
            <p className="mt-4">
              ปัญหาเกี่ยวกับการใช้งานบัญชี Internet Account แจ้งที่ <a href="mailto:account@mahidol.ac.th" className="text-blue-500 hover:text-blue-700">account@mahidol.ac.th</a>
            </p>
          </div>
        </div>
      </div>

      {showSuccessModal && <LoginSuccessModal onClose={() => setShowModal(false)} />}

      {showModal && (
        <div className="homePage fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={handleModalClose}
              className="absolute top-2 right-4 text-gray-600 hover:text-gray-900 text-4xl"
            >
              &times;
            </button>

            {/* Modal Content */}
            <h2 className="text-lg font-semibold text-gray-800 mb-3">ตรวจสอบรหัสล็อกอิน</h2>
            <p className="text-lg text-gray-800">
              Email : user@student.mahidol.ac.th
            </p>
            <p className='text-lg text-gray-800'>Password : password123</p>

            {/* Close Button */}
            <div className="mt-4 text-center">
              <button
                onClick={handleModalClose}
                className="bg-[#0035AD] transition ease-in-out delay-800 hover:scale-110 hover:bg-blue-500 duration-300 text-white font-bold py-2 px-4 rounded-lg"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;