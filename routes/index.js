var express = require('express');
var router = express.Router();
const Movie = require("../models/movieModel");

router.get('/', function(req, res, next) {
  res.json("Hello, World! test");
});

router.get("/get-all-movies", async function(req, res, next){
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/add-movie", async (req, res) => {
  const { title, director, releaseYear, genre } = req.body;

  try {
    const movie = new Movie({ title, director, releaseYear, genre });
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
})

module.exports = router;
