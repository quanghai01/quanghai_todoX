import express from "express";
import tasksRoute from "./routes/tasksRouters.js";

import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json()); // ⬅️ DÒNG QUAN TRỌNG
app.use(express.urlencoded({ extended: true }));
//midderware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use("/api/tasks", tasksRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`run server tai  localhost: ${PORT}`);
  });
});
