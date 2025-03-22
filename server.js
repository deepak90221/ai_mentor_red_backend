require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRouter");
const adminRoutes = require("./routes/adminRoutes");
const examRoutes = require("./routes/examRoutes");
const courseRoutes = require("./routes/courseRouter");

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing in .env file!");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Connection Error:", err.message);
    process.exit(1);
  }
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB Connection Error:", err.message);
});

const startServer = async () => {
  await connectDB();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api/users", userRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/exams", examRoutes);
  app.use("/api/courses", courseRoutes);

  app.get("/", (req, res) => {
    res.send("Backend is running!");
  });

  const PORT = process.env.PORT || 6500;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
