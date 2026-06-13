import { Request, Response, NextFunction } from "express";
import User from "../models/user";

var express = require("express");
var router = express.Router();

router.use(async (req: Request, res: Response, next: NextFunction) => {
  console.log("Made it to the users router-level middleware!");

  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  // var users_list: any[] = [];
  // users.forEach((user: any) => {
  //   users_list.push(`${user.id}, ${user.name}: ${user.email}`);
  // });
  if (users) {
    res.send(users);
    return;
  }
  next();
});

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});

module.exports = router;
