require('dotenv').config();
const express = require("express");
const {recipesRouter} = require("./routes/recipe.route");
const mongoose = require("mongoose");
const { usersRouter } = require("./routes/user.route");

const mongoUrl =process.env.MONGO_URL;
const app = express();

app.use(express.json()); // Helps our app to accept json data
app.use('/recipes', recipesRouter);
app.use('/users', usersRouter)
app.get('/status', (req, res) => {
   res.status(200).send("server is running")
})


mongoose.connect(mongoUrl).then(() => {
   app.listen(4487, () => {
      console.log("mongoDB connected..");
      })
}).catch((err) => {
   console.log("mongo error", err);
})

// http://localhost:4321/