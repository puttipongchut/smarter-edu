import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function LoginHandler() {
    const [studentEmail, setStudentEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const validEmail = 'student@mahidol.ac.th';
    const validPassword = 'password';

    const handleLogin = () => {
        if (studentEmail === validEmail && password === validPassword) {
            login();
            alert('Login successful!');
            navigate('/home');
        } else {
            alert('Invalid email or password.');
        }
    };

    return (
        <>
            <div className="mb-4">
                <label className="text-left block text-gray-700 text-m font-bold mb-2" htmlFor="student-email">
                    Student Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="student-email"
                    type="email"
                    placeholder="Enter your student email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
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
                />
            </div>
            <button
                className="bg-[#0035AD] transition ease-in-out delay-800 hover:scale-110 hover:bg-blue-500 duration-300 text-white font-bold py-2 px-4 rounded-lg"
                onClick={handleLogin}
            >
                Log In
            </button>
        </>
    );
}

export default LoginHandler;
