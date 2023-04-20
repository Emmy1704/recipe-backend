const {userModel} = require("../models/user.model");
const bcrypt = require("bcrypt")

//login
async function login(req, res) {
   const user = await userModel.findOne({username: req.body.username});

   if (!user) return res.send("user not found!!").end();

   if (!bcrypt.compareSync(req.body.password, user.password)) return res.send("password incorrect!!").end();

   user.password = undefined;

   res.json(user).end();
}

//register
async function register(req, res) {
   em

   await userModel.create ({
      name: req.body.name,
      username: req.body.username,
      password: encryptedPassword,
      role: req.body.role
   })

   res.send("user created!!").end();
}

// get recipes
async function getRecipes(req, res) {
   const user = await userModel.findById(req.params.id);

   res.json(user.recipes).end();
}

//updateRecipes
async function updateRecipes(req, res) {
   console.log(req.body.recipes, typeof req.body.recipes);
   await userModel.updateOne({_id: req.params.id}, {
      $push: {
         recipes: {$each: req.body.recipes}
      }
   })

   res.send("recipe added").end();
}

module.exports = {
   login,
   register,
   getRecipes,
   updateRecipes
}