import {Request, Response, NextFunction} from 'express';
import db from '../models';

var express = require('express');
var router = express.Router();

router.use(async (req: Request, res: Response, next: NextFunction) => {
  console.log("Made it to the users router-level middleware!");
  // db.user.findAll().then(users: any => {
  //   users.forEach(user: Object => {
  //     console.log(user.email);
  //   });
  // });
  // next();

  const users = await db.user.findAll();
  console.log('All users:', JSON.stringify(users, null, 2));
  next();
});


/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});

module.exports = router;
