import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isPasswordMatch = await admin.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET || "fallback_secret_key_only_for_development",
      { expiresIn: process.env.JWT_EXPIRE || "7d" }
    );

    if (process.env.NODE_ENV !== "production") {
      console.log(`✅ Admin logged in: ${admin.email}`);
    }

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("❌ Login error:", error);
    }
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: process.env.NODE_ENV === "production" ? undefined : error.message,
    });
  }
};
