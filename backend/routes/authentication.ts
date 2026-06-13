import { Router } from "express";
import { login, refresh, logout, me } from "../controllers/authentication";
import { authenticateToken } from "../middleware/authentication";

const router = Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", authenticateToken, me);

export default router;
