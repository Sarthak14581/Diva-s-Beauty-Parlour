import Booking from '../models/Booking.js';

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
        message: 'Please provide all required fields'
      });
    }

    // Create booking
    const booking = await Booking.create({
      service,
      date,
      time,
      name,
      phone,
      notes: notes || ''
    });

    if (process.env.NODE_ENV !== 'production') {
      console.log('✅ New booking created:', {
        name,
        service,
        date,
        time
      });
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('❌ Error creating booking:', error);
    }
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message
    });
  }
};

// @desc    Get all bookings (sorted: Pending first, then by createdAt)
// @route   GET /api/bookings
// @access  Protected
export const getBookings = async (req, res) => {
  try {
    const statusOrder = { 'Pending': 1, 'Confirmed': 2, 'Completed': 3, 'Cancelled': 4 };
    
    const bookings = await Booking.find().sort({ createdAt: -1 });
    
    // Sort bookings: Pending first, then by createdAt within each status
    const sortedBookings = bookings.sort((a, b) => {
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff !== 0) return statusDiff;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    if (process.env.NODE_ENV !== 'production') {
      console.log(`📋 Fetched ${bookings.length} bookings`);
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: sortedBookings
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('❌ Error fetching bookings:', error);
    }
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Protected
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a status'
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`✅ Booking status updated: ${booking.name} - ${status}`);
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('❌ Error updating booking status:', error);
    }
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message
    });
  }
};
