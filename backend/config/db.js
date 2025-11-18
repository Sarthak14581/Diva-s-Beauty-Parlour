import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);

    // In production, don't exit - let the platform restart
    if (process.env.NODE_ENV === "production") {
      console.error("⚠️  Running in production - will retry connection...");
      // Retry after 5 seconds
      setTimeout(connectDB, 5000);
    } else {
      process.exit(1);
    }
  }
};

export default connectDB;
