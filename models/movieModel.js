const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    releaseYear: { type: Number, required: true },
    rated: { type: String, required: false, default: null },
    actors: { type: String, requred: true },
    plot: {type: String, requred: false, default: null},
    director: { type: String, required: true },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5, 
    },
    posterUrl: { type: String, required: false, default: null },
});
  

movieSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
