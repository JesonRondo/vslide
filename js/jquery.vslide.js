/**
 * @desc    jquery vslide plugin
 * @author  LongZhou
 * @email   pancnlz@gmail.com
 * @version 1.0
 */
(function($) {
    $.fn.vslide = function(options) {
        var settings = $.extend({
            width           : 320,  // slide width
            height          : 240,  // slide height
            bareaHeight     : 68,   // button area height
            fontSize        : 18    // button area font size
        }, options);
        
        var $target = $(this);
        var count = 0;
        var barea_width = 0;
        var barea_height = settings.bareaHeight - 12;

        var initStyle = function() {
            // img
            var $img_a = $target.find('>a');
            count = $img_a.length;

            $img_a.addClass('imglink').addClass('slider').css({
                'width'     : settings.width,
                'height'    : settings.height
            });
            $img_a.eq(0).addClass('curdiv');

            // btn
            barea_width = parseInt(settings.width / count, 10);
            $target.find('ul').css({
                'width'     : settings.width + 3,
                'height'    : settings.bareaHeight,
            });
            $target.find('ul li a').each(function(index) {
                $(this).addClass('ctrlbtn').css({
                    'width'     : barea_width,
                    'height'    : barea_height,
                    'fontSize'  : settings.fontSize,
                    'lineHeight': barea_height + 'px'
                }).attr('data-index', index);
            });
            $target.find('ul li a').eq(0).addClass('cur');

            // main box
            $target.css({
                'width'     : settings.width,
                'height'    : settings.height + settings.bareaHeight
            });
        };

        var initMask = function() {
            $mask = $('<div class="mask"></div>');
            $mask.css({
                'width'     : settings.width,
                'height'    : settings.height,
                'opacity'   : 0
            });
            $target.append($mask);
        };

        var initDom = function() {
            initStyle();
            initMask();
        };

        var autoNext = function() {
            var $next = $target.find('.ctrlbtn.cur').parent().next();
            if ($next.length !== 0) {
                $next.find('a:eq(0)').click();
            } else {
                $target.find('.ctrlbtn:first').click();
            }
        };

        var autoPrev = function() {
            var $prev = $target.find('.ctrlbtn.cur').parent().prev();
            if ($prev.length !== 0) {
                $prev.find('a:eq(0)').click();
            } else {
                $target.find('.ctrlbtn:last').click();
            }
        };

        var autoSlide = function() {
            var timer;
            $target.bind('mouseenter', function() {
                clearInterval(timer);
            }).bind('mouseleave', function() {
                timer = setInterval(autoNext, 5000);
            }).mouseleave();
        };

        var initEvent = function() {
            // button click
            $target.find('.ctrlbtn').die('click').live('click', function() {
                if ($(this).hasClass('cur')) {
                    return;
                }
                $target.find('ul li a').removeClass('cur');
                $(this).addClass('cur');

                var index = parseInt($(this).attr('data-index'), 10);

                $target.find('.mask').addClass('show').animate({
                    'opacity': '1'
                }, 100, function() {
                    $target.find('>a').removeClass('curdiv');
                    $target.find('>a').eq(index).addClass('curdiv');
                    $target.find('.mask').animate({
                        'opacity': 0
                    }, 100, function() {
                        $(this).removeClass('show');
                    });
                });
            });
            autoSlide();
        };

        var rander = function() {
            initDom();
        };

        return this.each(function() {
            rander();
            initEvent();
        });
    };
}(jQuery));