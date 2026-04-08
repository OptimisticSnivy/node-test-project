const express = require('express');
const { connectDB } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const readerRoutes = require('./routes/readerRoutes');
require('dotenv').config();


// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/readers', readerRoutes);

// Home route
app.get('/', (req, res) => {
	res.send('Welcome to User CRUD API with Express, MySQL, and Sequelize');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
