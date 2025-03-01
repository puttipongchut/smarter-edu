const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: 'https://smarter-edu-backend.vercel.app',
    credentials: true,
  }));

//const users = [{ id: 1, email: 'user@student.mahidol.ac.th', password: '$2a$10$7QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8' }]; // Password is hashed version of 'password123'
let users = [];

app.get('/', (req, res) => {
    res.send('API running');
});

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, email, password: hashedPassword };
    users.push(newUser);
    res.status(201).send({ message:'User registered', userId: newUser.id });
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.get('/api/protected', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send('Access denied. No token');

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).send('Access denied. Invalid token format');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: 'Protected data', user: verified });
    } catch (err) {
        res.status(400).send('Invalid token');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

module.exports = app;