/**
 * Created by Gavin.Fuu on 2016/5/27.
 */

(function ($) {
    var myScroll = new IScroll('#wrapper', {scrollX: true, scrollY: false, mouseWheel: true});

    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);
})(jQuery)