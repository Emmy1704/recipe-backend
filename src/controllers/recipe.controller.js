const {recipeModel} = require("../models/recipe.models")

// get all recipes
async function getAllRecipes(req, res) {
   const recipes = await recipeModel.find();
   
    res.json(recipes).end();
}

// get single recipe
async function getSingleRecipe(req, res) {
    const recipe = await recipeModel.findById(req.params.recipeId)
    res.json(recipe).end();
}

// add new recipe
async function addRecipe(req, res) {
    await recipeModel.create  ({
      name: req.body.name,
      process: req.body.process,
      duration: req.body.duration
    })
    res.send("recipe added").end();
}

// update recipe
async function udpateRecipe(req, res) {
    await recipeModel.updateOne({_id: req.params.recipeId}, {...req.body});

    res.send("recipe updated successfully!").end();
}

// delete recipe
async function deleteRecipe(req, res) {
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