import express from "express";
import {
  createBooking,
  getBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// POST /api/bookings - Create a new booking (Public)
router.post("/", createBooking);

// GET /api/bookings - Get all bookings (Protected)
router.get("/", authMiddleware, getBookings);

// PUT /api/bookings/:id/status - Update booking status (Protected)
router.put("/:id/status", authMiddleware, updateBookingStatus);

export default router;
