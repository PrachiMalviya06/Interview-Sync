import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";

const app = express();

// 🔥 IMPORTANT FOR RENDER + CLERK
app.set("trust proxy", 1);

// =====================
// MIDDLEWARE
// =====================

// 🔥 CORS FIRST
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://interview-sync-two.vercel.app",
    ],
    credentials: true,
  })
);

// 🔥 JSON
app.use(express.json());




app.use((req, res, next) => {
  console.log("ORIGIN:", req.headers.origin);
  console.log("COOKIE:", req.headers.cookie);
  next();
});

// 🔥 CLERK MIDDLEWARE AFTER CORS
app.use(clerkMiddleware());

// =====================
// ROUTES
// =====================
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

// =====================
// HEALTH ROUTES
// =====================
app.get("/", (req, res) => {
  res.send("🚀 InterviewSync Backend is Running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "Backend working fine ✅" });
});

// =====================
// SERVER START
// =====================
const startServer = async () => {
  try {
    await connectDB();

    app.listen(ENV.PORT, () => {
      console.log("🚀 Server started on port:", ENV.PORT);
    });
  } catch (error) {
    console.error("💥 Error starting server:", error);
  }
};

startServer();