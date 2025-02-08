import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/dbConnect.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user.routes.js";
import courseRoute from "./routes/course.routes.js";
import mediaRoute from "./routes/media.routes.js";
import purchaseCourse from "./routes/purchaseCourse.routes.js";
import courseProgress from "./routes/courseProgress.routes.js";

dotenv.config();

// Call database connection here
connectDB();

// Initialize Express app
const app = express();

// Use environment variable for PORT
const PORT = process.env.PORT || 7000;

//default middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Api's
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase-course", purchaseCourse);
app.use("/api/v1/progress", courseProgress);

app.listen(PORT, () => {
  console.log(`Server is Running at PORT NO: ${PORT}`);
});
