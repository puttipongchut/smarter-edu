const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: 'https://smarter-edu.vercel.app',
    credentials: true,
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

const user = {
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD_HASH, // hashed password
};

app.get('/', (req, res) => {
    res.send('API running');
});

app.post('/api/login', [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    if (email === user.email && await bcrypt.compare(password, user.password)) {
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

module.exports = app;