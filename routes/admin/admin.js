/**
 * Created by z07 on 2016/5/25.
 */
var express = require('express');
var router = express.Router();
var HttpWrap = require('../../tool/httpwrap')
var wrap = new HttpWrap()

/* GET home page. */
router.get('/', function (req, res, next) {
    wrap.htmlwrap({
        url: 'https://api.douban.com/v2/movie/in_theaters?city=广州&start=1&count=20',
        method: 'GET'
    }, {
        success: function(content) {
            var results = JSON.parse(content)

            console.info(results.subjects)

            res.render('admin/admin', {
                title: '戏爱电影 - 控制台 v1.0',
                movies: results.subjects
            })
        }
    })
})

module.exports = router;