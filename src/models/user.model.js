const {Schema, model} = require("mongoose");

const userSchema = Schema ({
   name: String,
   username: {
      type: String,
      unique: true
   },
   password: {
      type: String
   },
   role: {
      type:String,
      default: "CHEF",
      enum: ["SOUS_CHEF", "CHEF"]
   },
   recipes: [{
      type: Schema.Types.Map,
      ref: 'Recipe'
   }]
})

const userModel = model("User", userSchema);

module.exports = {
   userModel
}