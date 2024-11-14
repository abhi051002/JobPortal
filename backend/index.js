import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/userRoute.js";
import companyRouter from "./routes/companyRoute.js";
import jobRouter from "./routes/jobRoute.js";
import applicationRouter from "./routes/applicationRoutes.js";

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();

// For allowing a single route
// const corsOption = {
//   origin: "http://localhost:5173",
//   credentials: true,
// };
// app.use(cors(corsOption));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

app.use(cors());
app.get("/", (req, res) => {
  res.status(200).send("Job Portal API is Working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
