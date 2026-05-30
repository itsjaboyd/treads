import {Request, Response, NextFunction} from 'express';

var express = require('express');
var router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Made it to the users router-level middleware!");
  // db.user.findAll().then(users: any => {
  //   users.forEach(user: Object => {
  //     console.log(user.email);
  //   });
  // });
  next();
});


/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('respond with a resource');
});

module.exports = router;
