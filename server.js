
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import userRouter from "./routers/userRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL);

app.use("/api/users", userRouter);

const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
