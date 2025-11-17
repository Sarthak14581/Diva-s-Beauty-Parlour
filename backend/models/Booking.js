import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  service: {
    type: String,
    required: [true, "Please provide a service"],
    trim: true,
  },
  date: {
    type: String,
    required: [true, "Please provide a date"],
  },
  time: {
    type: String,
    required: [true, "Please provide a time"],
  },
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide your phone number"],
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
    default: "",
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Booking", BookingSchema);
