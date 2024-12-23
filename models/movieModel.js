const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    director: { type: String, required: true },
    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5, 
    },
    review: { type: String, required: false },
  });
  

movieSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
