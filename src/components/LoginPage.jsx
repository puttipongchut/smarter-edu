import { useState } from 'react';
import LoginHandler from './LoginHandler';
import '../App.css';

function Login() {
    const [authMode, setAuthMode] = useState('student'); // 'student' or 'auth'
  
    const handleAuthClick = () => {
      setAuthMode('auth');
    };
  
    const handleBackClick = () => {
      setAuthMode('student');
    };
  
    return (
      <>
        <div className='homePage bg-[#0035AD] font-sans leading-normal tracking-normal flex items-center justify-center min-h-screen'>
          <div className="container max-w-lg">
            <div className="bg-gray-50 shadow-2xl rounded-lg px-8 pt-6 pb-8">
              <div className='text-center'>
                <div className='flex justify-center items-center mb-3'>
                  <img src="public\assets\Mahidol_logo.png" alt="Mahidol_logo" className='rounded-full w-20 h-18' />
                </div>
                <h1 className="text-2xl font-bold mb-4">MAHIDOL STUDENT LOG IN</h1>
                {authMode === 'student' ? (
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
                  <LoginHandler />
                  </>
                )}
              </div>
              <p className="mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-700">ตรวจสอบรหัสนักศึกษาใหม่ กดตรงนี้</a>
              </p>
              <p className="mt-4">
                ปัญหาเกี่ยวกับการใช้งานบัญชี Internet Account แจ้งที่ <a href="mailto:account@mahidol.ac.th" className="text-blue-500 hover:text-blue-700">account@mahidol.ac.th</a>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Login;