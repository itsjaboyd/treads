import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.ENVIRONMENT || "development",
  });
});

module.exports = router;
