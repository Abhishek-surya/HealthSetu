const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const adminRoutes = require("./routes/adminRoutes")
const helmet = require("helmet")
const morgan = require("morgan")
const path = require("path");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Apply CORS with more secure configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'https://healthsetuweb.onrender.com' 
    : 'http://localhost:5173',
  credentials: true
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(helmet())
app.use(morgan("dev"))
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/auth",doctorRoutes);
app.use("/api/auth",patientRoutes);
app.use('/api/auth',adminRoutes);

// Start server
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





