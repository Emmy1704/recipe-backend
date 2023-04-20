const {Schema, model} = require("mongoose");

const recipeSchema = Schema ({
   name: {
      type: String,
      unique: true
   },
   process: {
      type: String,
      default: "boil water"
   },
   duration: {
      type: Number,
      default:30
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: "User"
   }
})

const recipeModel = model("Recipe", recipeSchema);

module.exports = {
   recipeModel
}