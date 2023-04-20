const {userModel} = require("../models/user.model")

async function checkSousChef(req, res, next) {
   const user = await userModel.findOne({username: req.body.username});

   if (!user || user.role !== "SOUS_CHEF") return res.send("permission denied").end();

   next();
}

module.exports = {
   checkSousChef
}