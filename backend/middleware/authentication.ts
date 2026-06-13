import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utilities/authentication";
import User from "../models/user";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: "Access token required" });

  try {
    const decoded = verifyAccessToken(token);
    const user = await User.findByPk(decoded.userId);

    if (!user || !user.active) {
      return res.status(401).json({ error: "Invalid or inactive account" });
    }

    req.user = user; // Attaches full User instance to request
    next();
  } catch {
    res.status(403).json({ error: "Invalid or expired access token" });
  }
};
