var http = require('http')
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('underscore')
var routes = require('./routes/index');
var users = require('./routes/users');

var mongoose = require('mongoose')
var Movie = require('./mongo/models/movie')
mongoose.connect('mongodb://localhost/movies')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// bodyParser 将表单数据格式化成json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

// 静态资源目录
// __dirname 指当前路径
app.use(express.static(path.join(__dirname, 'public')));

// 增加路由
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3000)

var timer = setInterval(function() {
    var qs = require('querystring');
    var data = {
        city: '广州',
        start: 1,
        count: 20
    };//这是需要提交的数据

    var content = qs.stringify(data);

    var options = {
        hostname: 'api.douban.com',
        path: '/v2/movie/in_theaters?' + content,
        method: 'GET'
    };

    var rescontent = ''

    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            rescontent += chunk
        });

        res.on('end', function() {
            var dj = JSON.parse(rescontent)

            console.log(dj)

            for (i in dj.subjects) {
                var _movie = new Movie();
                _.extend(_movie, dj.subjects[i])

                _movie.save(function(err, movie) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    req.end();

    clearInterval(timer)
}, 1000)
