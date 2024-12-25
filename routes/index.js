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

router.get("/get-by-id", async (req, res) => {
  const id = req.headers['id'];
  if(!id) res.status(400).json({error: "missing header of 'id'"});
  
  try{
    const movie = await Movie.findOne({id: id})

    if(movie === null){
      res.status(404).json({error: `No movies found with id of ${id}`});
      return;
    }

    res.status(200).json(movie);
  }catch(err){
    console.log(err);
    res.status(500).json(err);
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
      title: { $regex: search, $options: 'i' }
    });

    res.status(200).json(searchedMovies);
  }catch(err){
    console.log(err);
    res.status(400).send(err);
  }
});


router.post("/add-movie", async (req, res) => {
  const { 
    title, 
    releaseYear, 
    rated = null, 
    actors, 
    plot = null, 
    director, 
    stars, 
    posterUrl = null 
  } = req.body;

  try {
    const movie = new Movie({
      title,
      releaseYear,
      rated,
      actors,
      plot,
      director,
      stars,
      posterUrl
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});


router.delete("/delete", async (req, res) => {
  const id = req.headers['id'];
  if(!id) {
    res.status(400).json({error: "missing header of id. please provide a movie id"});
    return;
  }

  try{
    const movieToDel = await Movie.findOne({id:id});
    if(movieToDel === null){
      res.status(404).send({error: `Can not delete, no movie found with id '${id}'`});
      return;
    } 

    const result = await Movie.deleteOne({id:id});
    console.log(result);
    res.status(200).json({message: "movie deleted"});
  }catch(err){
    console.log(err);
    res.status(500).json({error: err});
  }
});

router.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  // const {title, releaseYear, director, stars, review} = req.body;

  if(!id || !req.body){
    return res.status(400).json({error: "Missing param, please provide an id"});
  }

  const movieToUpdate = await Movie.findOne({id:id});
  if(!movieToUpdate){
    res.status(404).json({error: `Can not update, no movie found with id '${id}`});
    return;
  }

  const movieId = movieToUpdate._id;

  try{
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, {
      new: true,
      runValidators: true
    });

    if(!updatedMovie){
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(updatedMovie);
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Error updating movie" });
  }
});

module.exports = router;