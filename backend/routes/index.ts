import {Request, Response, NextFunction} from 'express';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  //res.render('index', { title: 'Express' });
  res.json({message: "Welcome to the backend of Treads!"})
});

module.exports = router;
