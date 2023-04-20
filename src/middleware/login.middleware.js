const {userModel} = require("../models/user.model")

async function clientLogin(req, res, next) {
console.log("request made to site");

   next();
}

module.exports = {
   clientLogin
}