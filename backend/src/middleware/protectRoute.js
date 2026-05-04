import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;

      if (!clerkId) {
        return res.status(401).json({ message: "Unauthorized - invalid token" });
      }

      // find user
      let user = await User.findOne({ clerkId });

      // 🔥 AUTO CREATE USER IF NOT EXISTS
      if (!user) {
        user = await User.create({
          clerkId,
          name: req.auth().sessionClaims?.first_name || "User",
          email: req.auth().sessionClaims?.email || "noemail@test.com",
        });
      }

      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];