import { Request, Response, NextFunction } from "express";
import db from "../models";

var express = require("express");
var router = express.Router();

router.use(async (req: Request, res: Response, next: NextFunction) => {
  console.log("Made it to the users router-level middleware!");

  const users = await db.user.findAll();
  var users_list: any[] = [];
  users.forEach((user: any) => {
    users_list.push(`${user.id}, ${user.name}: ${user.email}`);
  });
  if (users) {
    res.send(users_list);
    return;
  }
  next();
});

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});

module.exports = router;
