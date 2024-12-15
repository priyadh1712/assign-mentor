import express from "express";
import dotenv from "dotenv";
import AppRouter from "./routers/router.js";
import dbConnect from "./config/dbConnect.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000; 

app.use(express.json());
app.use("/", AppRouter);

// Routes
app.get("/", (req, res) => {
  res.send("Mentor-Student Relationship Management API");
});

// Starting server after connecting to DB
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
