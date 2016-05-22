var mongoose = require('mongoose')
var HttpWrap = require('../../tool/HttpWrap')
var httpWrap = new HttpWrap()

var MovieSchema = new mongoose.Schema({
    rating: {
        max: Number,
        average: Number,
        stars: Number,
        min: Number
    },
    genres: Array,
    title: String,
    //casts: Array,
    collect_count: Number,
    original_title: String,
    subtype: String,
    directors: Array,
    year: String,
    images: {
        small: String,
        large: String,
        medium: String
    },
    alt: String,
    id: String,
    trailer_urls: String,
    pubdates: String
})

/**
 * 当执行save方法时， 预先执行的回调函数
 */
MovieSchema.pre('save', function (next) {
    var $this = this
    httpWrap.htmlwrap({
        method: 'GET',
        url: 'https://movie.douban.com/subject/' + $this.id + '/'
    }, {
        success: function (data) {
            var start = data.indexOf('https://movie.douban.com/trailer/')
            if (start !== -1) {
                var trailer_urls = data.match(/https:\/\/movie\.douban\.com\/trailer\/.*\/#content/)
                $this.trailer_urls = trailer_urls[0]
                next()
            }
        },
        fail: function (e) {
            // do nothing
            console.log(e)
            next()
        }
    })
})

MovieSchema.statics = {
    /**
     * 获取电影列表，并按更新日期排列
     */
    fetch: function(cb) {
        return this.find({})
            .sort('id')
            .exec(cb)
    },

    /**
     * 通过电影的id号，查找特定电影
     */
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

module.exports = MovieSchema