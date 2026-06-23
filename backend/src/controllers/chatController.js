import { streamClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const userId = req.auth().userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = streamClient.generateUserToken({
      user_id: userId,
    });

    console.log("STREAM TOKEN USER:", userId);

    res.status(200).json({
      token,
      userId,
      userName: req.user?.name || "User",
      userImage: req.user?.profileImage || "",
    });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}