import express from "express";
import dotenv from "dotenv";
import { connect } from "./Database/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 
app.use(express.json()); 
 
 

app.listen(PORT, () => {
  connect();
  console.log(`Server is running at http://localhost:${PORT}`);
});
//radiapple15

// 6c9F1K2FquxohvPe
