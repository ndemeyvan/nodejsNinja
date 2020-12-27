const { json } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const blogRoute= require('./Routes/BlogRoute');


mongoose.connect(
  "mongodb://localhost/blog",
  () => {
    console.log("Connexion a la base de donnee effectue");
    app.listen(3000, () => {
      console.log("Express ecoute sur le port 3000");
    });
  }
);

app.get("/", (req, res) => {
  console.log("Hello world");
  res.send("Welcome to Blog server");
});


app.use('/blog',blogRoute)

// app.get("/about", (req, res) => {
//   res.send("Welcome to about page");
// });

// //redirect to 404 page
// app.get("/about-us", (req, res) => {
//   res.redirect("/about");
// });

// //404 page
// app.use((req, res, next) => {
//   res.send("404 Error , this page don't existe");
// });
