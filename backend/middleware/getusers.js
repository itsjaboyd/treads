const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

getUsers = (req, res, next) => {
  User.findAll().then(users => {
    console.log("Made it to the middleware/getusers!");
    console.log(`FROM MIDDLEWARE: ${users}`);
  });
  next();
};

module.exports = getUsers;