import { Request, Response } from "express";
import User from "../models/user";
import { verifyPassword } from "../utilities/crypting";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utilities/authentication";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 30 * 60 * 1000; // 30 minutes

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const now = new Date();
    if (user.locked_until && user.locked_until > now) {
      return res.status(423).json({
        error: `Account locked until ${user.locked_until.toISOString()}`,
      });
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      const newAttempts = user.failed_login_attempts + 1;
      const locked_until =
        newAttempts >= MAX_FAILED_ATTEMPTS
          ? new Date(Date.now() + LOCKOUT_DURATION_MS)
          : null;

      await user.update({ failed_login_attempts: newAttempts, locked_until });
      return res.status(401).json({ error: "Invalid credentials" });
    }

    await user.update({
      failed_login_attempts: 0,
      locked_until: null,
      last_login: now,
    });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        active: user.active,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token)
      return res.status(401).json({ error: "Refresh token required" });

    const decoded = verifyRefreshToken(token);
    const user = await User.findByPk(decoded.userId);
    if (!user || !user.active)
      return res.status(401).json({ error: "Invalid or inactive account" });

    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};

export const me = async (req: Request, res: Response) => {
  const user = req.user;
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    active: user.active,
    last_login: user.last_login,
  });
};
