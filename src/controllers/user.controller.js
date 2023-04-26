const {userModel} = require("../models/user.model");
const validators = require("../validators/user.validator");
const bcrypt = require("bcrypt")
const {formatZodError} = require("../utilities/errormessage")

//login
async function login(req, res) {
   const result = validators.loginValidator.safeParse(req.body);

   if (!result.success) {
      return res.status(400).json(formatZodError(result.error.issues)).end();
   }

   const user = await userModel.findOne({username: req.body.username});

   if (!user) return res.send("user not found!!").end();

   if (!bcrypt.compareSync(req.body.password, user.password)) return res.send("password incorrect!!").end();

   user.password = undefined;

   res.json(user).end();
}

//register
async function register(req, res) {
   const result = validators.registerValidator.safeParse(req.body)

   if (!result.success) {
      return res.status(400).json(formatZodError(result.error.issues)).end();
   }

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
   const result = validators.getRecipesValidator.safeParse(req.body);

   if (!result.success) {
      return res.status(400).json(formatZodError(result.error.issues)).end();
   }

   const user = await userModel.findById(req.params.id);

   res.json(user.recipes).end();
}

//updateRecipes
async function updateRecipes(req, res) {
   const result = validators.updateRecipesValidator.safeParse(req.body);

   if (!result.success) {
      return res.status(400).json(formatZodError(result.error.issues)).end();
   }

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