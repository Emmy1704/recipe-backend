const {recipeModel} = require("../models/recipe.models");
const validators = require("../validators/recipe.validator");
const {formatZodError} = require("../utilities/errormessage")

// get all recipes
async function getAllRecipes(req, res) {
   const recipes = await recipeModel.find();
   
    res.json(recipes).end();
}

// get single recipe
async function getSingleRecipe(req, res) {
   const result = validators.getSingleRecipeValidator.safeParse(req.body)

   if (!result.success) {
      return res.status(400).json(formatZodError(result.error.issues)).end();
   }

    const recipe = await recipeModel.findById(req.params.recipeId)
    res.json(recipe).end();
}

// add new recipe
async function addRecipe(req, res) {
   const result = validators.recipeValidator.safeParse(req.body)

   if (!result.success) {
      return res.status(400).json(formatZodError(result.error.issues)).end();
   }

    await recipeModel.create  ({
      name: req.body.name,
      process: req.body.process,
      duration: req.body.duration
    })
    res.send("recipe added").end();
}

// update recipe
async function udpateRecipe(req, res) {
   const result = validators.updateRecipesValidator.safeParse(req.body)

   if (!result.success) {
      return res.status(400).json(formatZodError(result.error.issues)).end();
   }

    await recipeModel.updateOne({_id: req.params.recipeId}, {...req.body});

    res.send("recipe updated successfully!").end();
}

// delete recipe
async function deleteRecipe(req, res) {
   const result = validators.deleteRecipeValidator.safeParse(req.body)

   if (!result.success) {
      return res.status(400).json(formatZodError(result.error.issues)).end();
   }

    await recipeModel.deleteOne({_id: req.params.recipeId});
    res.send("recipe deleted").end();
}

module.exports = {
    getAllRecipes,
    getSingleRecipe,
    addRecipe,
    udpateRecipe,
    deleteRecipe
}