var express = require('express');
var router = express.Router();
const Movie = require("../models/movieModel");

router.get("/get-all-movies", async function(req, res, next){
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/search", async function(req, res, next){
  const search = req.headers['search-value'];
  if(!search){
    res.status(400).json({error: "Missing header of 'search-value'"});
    return;
  }

  console.log(search);
  
  try{
    const searchedMovies = await Movie.find({
      title: { $regex: search, $options: 'i' } // 'i' for case-insensitive search
    });

    res.status(200).json(searchedMovies);

  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }
})


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
});

module.exports = router;
