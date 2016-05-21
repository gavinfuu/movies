var mongoose = require('mongoose')
var movieSchema = require('../schemas/movie')
var Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie

