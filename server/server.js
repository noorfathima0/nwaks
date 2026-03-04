import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import eventRoutes from "./routes/eventRoutes.js";
import uploadRputes from './routes/uploadRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import sponsorRoutes from "./routes/sponsorRoutes.js"

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/upload", uploadRputes);
app.use("/api/auth", authRoutes);
app.use("/api/sponsors", sponsorRoutes)

app.get("/", (req, res) => {
  res.send("NWAKS Backend Running\nMongoDB Connected");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});