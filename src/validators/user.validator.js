const {z} = require("zod");
const {recipeValidator} = require("./recipe.validator")

const loginValidator = z.object({
   username: z.string(),
   password: z.string().min(8)
});

const registerValidator = z.object({
   name: z.string(),
   role: z.enum(['CHEF', "SOUS_CHEF"])
}).and(loginValidator);

const getRecipesValidator = z.object({
   id: z.string().length(24)
})

const updateRecipesValidator = z.object({
   recipes: recipeValidator.array()
}).and(getRecipesValidator);


module.exports = {
   loginValidator,
   registerValidator,
   getRecipesValidator,
   updateRecipesValidator
};