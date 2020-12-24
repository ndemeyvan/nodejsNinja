const { json } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const blogModel = require("./models/blogModel");

mongoose.connect(
  "mongodb://localhost/blog",
  () => {
    console.log("Connexion a la base de donnee effectue");
    app.listen(3000, () => {
      console.log("Express ecoute sur le port 3000");
    });
  }
  //   { useNewUrlParser: true },
  //   { useUnifiedTopology: true }
);

app.get("/", (req, res) => {
  console.log("Hello world");
  res.send("Welcome to Blog server");
});

app.get("/blog", (req, res) => {
  const blog = new blogModel({
    title: "Full stack web dev",
    snippet: "Hello world",
    body:
      "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.",
  });

  blog.save((error, doc) => {
    if (error) {
      console.log(error);
    } else {
      res.send(doc);
      console.log("This is doc : ", doc);
    }
  });
});

app.get("/all-blogs", (req, res) => {
  blogModel.find((err, doc) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

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
