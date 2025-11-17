import express from "express";
import {
  createBooking,
  getBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

// POST /api/bookings - Create a new booking
router.post("/", createBooking);

// GET /api/bookings - Get all bookings
router.get("/", getBookings);

export default router;
