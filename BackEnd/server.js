import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./Database/connectDB.js";
import authRoutes from "./Routes/userAuthenticationRoutes.js";
import userRoute from "./Routes/userRoute.js";

dotenv.config();

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],   
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // enable set cookie  
}));

app.use("/api/auth", authRoutes);
app.use("/api/userRoute", userRoute); // routes for authenticated user
app.listen(PORT, () => {
  connect();
  console.log(`Server is running at http://localhost:${PORT}`);
});
//radiapple15

// 6c9F1K2FquxohvPe
