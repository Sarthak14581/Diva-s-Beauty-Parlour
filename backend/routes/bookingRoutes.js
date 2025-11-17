import express from "express";
import {
  createBooking,
  getBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

// POST /api/bookings - Create a new booking
router.post("/", createBooking);

// GET /api/bookings - Get all bookings
router.get("/", getBookings);

// PUT /api/bookings/:id/status - Update booking status
router.put("/:id/status", updateBookingStatus);

export default router;
