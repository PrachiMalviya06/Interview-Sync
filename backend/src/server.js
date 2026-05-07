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

// =====================
// MIDDLEWARE
// =====================
app.use(express.json());

// 🔥 FIXED CORS (allow all origins - testing purpose)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(clerkMiddleware());

// =====================
// ROUTES
// =====================
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

// health route
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