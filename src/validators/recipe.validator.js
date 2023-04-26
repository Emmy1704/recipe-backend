const {z} = require("zod");

const recipeValidator = z.object({
   name: z.string(),
   process: z.string(),
   duration: z.number().optional()
});

const getSingleRecipeValidator = z.object({
   recipeId: z.string().length(24)
});

const updateRecipesValidator = z.object({
   recipe: recipeValidator.partial()
}).and(getSingleRecipeValidator);

const deleteRecipeValidator = z.object({

}).and(getSingleRecipeValidator);


module.exports = {
   recipeValidator,
   getSingleRecipeValidator,
   updateRecipesValidator,
   deleteRecipeValidator
};