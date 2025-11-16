import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes (to be implemented)
app.get("/api", (req, res) => {
  res.json({ message: "Diva's Parlour API is running" });
});

// Routes will be added here
// import authRoutes from './routes/authRoutes.js';
// import serviceRoutes from './routes/serviceRoutes.js';
// import bookingRoutes from './routes/bookingRoutes.js';
// import galleryRoutes from './routes/galleryRoutes.js';

// app.use('/api/auth', authRoutes);
// app.use('/api/services', serviceRoutes);
// app.use('/api/bookings', bookingRoutes);
// app.use('/api/gallery', galleryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
