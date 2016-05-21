var mongoose = require('mongoose')

var MovieSchema = new mongoose.Schema({
    doctor: String,
    title: String,
    language: String,
    country: String,
    summary: String,
    flash: String,
    poster: String,
    year: Number,
    meta: {
        createTime: {
            type: Date,
            default: Date.now()
        },
        updateTime: {
            type: Date,
            default: Date.now()
        }
    }
})

/**
 * 当执行save方法时， 预先执行的回调函数
 */
MovieSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createTime = this.meta.updateTime = Date.now()
    } else {
        this.meta.updateTime = Date.now()
    }

    next()
})

MovieSchema.statics = {
    /**
     * 获取电影列表，并按更新日期排列
     */
    fetch: function(cb) {
        return this.find({})
            .sort('meta.updateTime')
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