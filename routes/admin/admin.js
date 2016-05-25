/**
 * Created by z07 on 2016/5/25.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/admin', {
        title: '戏爱电影 - 控制台'
    })
})

module.exports = router;