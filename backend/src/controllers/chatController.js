import { streamClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const userId = req.auth.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = streamClient.generateUserToken({
      user_id: userId,
    });

    res.status(200).json({
      token,
      userId,
      userName: "User",
      userImage: "",
    });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}