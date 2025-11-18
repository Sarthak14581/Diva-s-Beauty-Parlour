import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Load environment variables
dotenv.config();

// Validate critical environment variables
if (!process.env.MONGO_URI) {
  console.warn("⚠️  Warning: MONGO_URI not found in environment variables");
}

if (!process.env.JWT_SECRET) {
  console.warn("⚠️  Warning: JWT_SECRET not found in environment variables");
}

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - supports both local and production
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Health check route
app.get("/", (req, res) => {
  res.json({
    message: "Diva's Parlour API is running",
    status: "healthy",
    environment: process.env.NODE_ENV || "development",
  });
});

// API Routes
app.get("/api", (req, res) => {
  res.json({ message: "Diva's Parlour API is running" });
});

// Booking Routes
app.use("/api/bookings", bookingRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.error("Error stack:", err.stack);
  }

  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong!"
        : err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`📍 API: http://localhost:${PORT}/api`);
  console.log(`📦 Bookings: http://localhost:${PORT}/api/bookings`);
});

// Export for serverless platforms (Vercel, Netlify Functions)
export default app;
