var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Movie = require('../mongo/models/movie')
mongoose.connect('mongodb://localhost/movies')

/* GET home page. */
router.get('/', function (req, res, next) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }

        res.render('index', {
            title: '电影 - 首页',
            movies: movies
        });
    })
});

module.exports = router;
