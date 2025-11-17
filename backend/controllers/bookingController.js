import Booking from "../models/Booking.js";

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res) => {
  try {
    const { service, date, time, name, phone, notes } = req.body;

    // Validate required fields
    if (!service || !date || !time || !name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Create booking
    const booking = await Booking.create({
      service,
      date,
      time,
      name,
      phone,
      notes: notes || "",
    });

    console.log("✅ New booking created:", {
      name,
      service,
      date,
      time,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public (can be protected later)
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    console.log(`📋 Fetched ${bookings.length} bookings`);

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};
