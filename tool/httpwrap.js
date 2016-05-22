var https = require('https')
var url = require('url')
var _ = require('underscore')

var HttpWrap = function(options, actions) {
}

HttpWrap.prototype.htmlwrap = function(options, actions)
{
    options = options || {}

    var opts = _.extend({}, options)

    if (opts.url) {
        var _uj = url.parse(opts.url)
        _.extend(opts, _uj)
    }

    var rescontent = ''

    var req = https.request(opts, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            rescontent += chunk
        });

        res.on('end', function () {
            if (actions.success) {
                actions.success(rescontent)
            }
        })
    });

    req.on('error', function (e) {
        if (actions.fail) {
            actions.fail(e)
        } else {
            console.log('problem with request: ' + e.message);
        }
    });

    req.end();
}

module.exports = HttpWrap