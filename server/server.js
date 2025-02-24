import { createRequire } from "module";
const require = createRequire(import.meta.url);

require('dotenv').config();
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

const users = [
  { id: 1, email: 'user@student.mahidol.ac.th', password: 'password123' }
];

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey"; // Store securely in .env

app.get('/', (req, res) => {
  res.send("Backend is running...");
});

// Login Route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

  res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' });
  res.json({ token, message: "Login successful" });
});

// Logout Route
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: "Logged out" });
});

// Protected Route Example
app.get('/profile', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(403).json({ message: "Invalid token" });
    }
    res.json({ message: "Welcome!", user: decoded });
  });
});

//app.listen(8080, () => console.log('Server running on http://localhost:8080'));

// Export the app for Vercel
export default app;