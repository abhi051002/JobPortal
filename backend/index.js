import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/userRoute.js";
import companyRouter from "./routes/companyRoute.js";
import jobRouter from "./routes/jobRoute.js";
import applicationRouter from "./routes/applicationRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Apply CORS before anything else
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://job-portal-frontend-ochre-delta.vercel.app",
  "https://job-portal-frontend-git-development-abhi051002s-projects.vercel.app",
];

// Improved CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, origin);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    exposedHeaders: ["set-cookie"],
  })
);

// ✅ Handle OPTIONS requests explicitly
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", [
    "http://localhost:5174",
    "https://job-portal-frontend-ochre-delta.vercel.app",
  ]);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, token"
  );
  res.sendStatus(200);
});

// ✅ Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();

// ✅ Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// ✅ Root Route
app.get("/", (req, res) => {
  res.status(200).send("Job Portal API is Working Fine");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
