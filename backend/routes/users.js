var express = require('express');
var router = express.Router();
const db = require("../models");

router.use((req, res, next) => {
  console.log("Made it to the users router-level middleware!");
  db.user.findAll().then(users => {
    users.forEach(user => {
      console.log(user.email);
    });
  });
  next();
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
