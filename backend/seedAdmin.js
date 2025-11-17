import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    // Define Admin Schema
    const AdminSchema = new mongoose.Schema({
      email: String,
      password: String,
      createdAt: Date,
    });

    const Admin = mongoose.model("Admin", AdminSchema);

    // Admin credentials (change these as needed)
    const adminEmail = "1234@gmail.com";
    const adminPassword = "1234abcd";

    console.log("📝 Creating admin with credentials:");
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}\n`);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("⚠️  Admin with this email already exists!");
      console.log("🔄 Updating password...\n");

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      // Update admin
      existingAdmin.password = hashedPassword;
      existingAdmin.createdAt = new Date();
      await existingAdmin.save();

      console.log("✅ Admin password updated successfully!");
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      // Create new admin
      const admin = new Admin({
        email: adminEmail,
        password: hashedPassword,
        createdAt: new Date(),
      });

      await admin.save();
      console.log("✅ Admin created successfully!");
    }

    console.log("\n📋 Login Credentials:");
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log("\n🔐 Login at: http://localhost:3000/admin/login");
    console.log("🎯 Dashboard: http://localhost:3000/admin/dashboard\n");

    // Close connection
    await mongoose.connection.close();
    console.log("✅ MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

// Run the seed function
seedAdmin();
