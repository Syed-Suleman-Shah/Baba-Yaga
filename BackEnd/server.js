import express from "express";
import dotenv from "dotenv";
import { connect } from "./Database/connectDB.js";
import authRoutes from "./Routes/userAuthenticationRoutes.js";
import userRoute from "./Routes/userRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/userRoute", userRoute); // routes for authenticated users  
app.listen(PORT, () => {
  connect();
  console.log(`Server is running at http://localhost:${PORT}`);
});
//radiapple15

// 6c9F1K2FquxohvPe
