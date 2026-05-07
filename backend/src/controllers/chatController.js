import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    console.log("REQ USER:", req.user);

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized - user missing",
      });
    }

    const userId = req.user.clerkId;

    if (!userId) {
      return res.status(401).json({
        message: "Clerk ID missing",
      });
    }

    const token = chatClient.createToken(userId);

    res.status(200).json({
      token,
      userId,
      userName: req.user.name,
      userImage: req.user.image,
    });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}