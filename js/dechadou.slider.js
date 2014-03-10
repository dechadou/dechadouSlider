/*
 Author: Rodrigo Catalano
 mail: dechadou@gmail.com
 website: http://estudiopasto.com
 linkedin: http://ar.linkedin.com/in/dechadou/
 Version: 1.0 Beta
 */
(function($) {
    var defaults = {
        container: '.slider',
        jsonFile: 'images.json',
        navClass: '.controls',
        timerBarClass: 'timer-bar',
        autoplay : false,
        responsive: true,
        delay: 3000,
        stopOnHover: true,
        enableTimerBar: true,
        time: 500
    };
    var methods = {
        init : function(options) {
            if(options) {
                $.extend(defaults,options);
            }

            var items = methods.parseData();

            defaults.mainSelector = this.selector;

            methods.createNav(items);
            methods.createImages(items);
            methods.createTimerBar();
            methods.makeResponsive(items);
            methods.startSlider(items,defaults.autoplay);
            methods.showFigcaption();
            methods.fullScreen();

        },
        fullScreen: function(){
            var browserHeight = $(window).height();
            $(defaults.mainSelector).height(browserHeight);
        },
        showFigcaption: function(){
            $('figcaption').before().click(function(e){
                $('body').toggleClass('captions');
            })
        },
        createNav: function(items){
            var count = items[0].length;
            for (var i = 0; i<count; i++){
                if (i == 0){
                    $(defaults.mainSelector+' '+defaults.navClass).append('<a href="#" class="current">'+(i+1)+'</a>')
                } else {
                    $(defaults.mainSelector+' '+defaults.navClass).append('<a href="#">'+(i+1)+'</a>')
                }
            }
        },
        createTimerBar: function(){
            if (defaults.enableTimerBar){
                $(defaults.mainSelector).append('<div class="'+defaults.timerBarClass+'" ></div>');
            }
        },
        startTimer: function(){
            var timer = $(defaults.mainSelector+' .'+defaults.timerBarClass);
            timer.animate({
                width: $(window).width()
            },defaults.delay);

            setInterval(function(){
                if (timer.width() == $(window).width()) {
                    timer.stop();
                    timer.css('width','0px')
                }
            },10)
        },
        createImages: function(items){
            var count = items[0].length;
            for (var i = 0; i<count;i++){
                $(defaults.mainSelector+' '+defaults.container).append('<div class="slides" style="width:'+$(defaults.mainSelector+' '+defaults.container).width()+'px;background-image:url('+items[0][i]["desktopImg"]+')"><figcaption><h3>'+items[0][i]["title"]+'</h3><p>'+items[0][i]["description"]+'</p></figcaption></article>')
            }
        },
        makeResponsive: function(items){

            var count = items[0].length;
            window.onresize = function() {
                var browserHeight = $(window).height();
                $(defaults.mainSelector).height(browserHeight);

                for (var i = 0; i<count;i++){
                    $(defaults.mainSelector+' '+defaults.container+' '+'div.slides').eq(i).css('width',$(document).width());
                }

                $(defaults.mainSelector+' '+defaults.container).css('width',$(document).width()*count);
                currentSlide = $(defaults.mainSelector+' '+defaults.navClass).find('.current').text();
                moveToLeft = -($(document).width()*(parseInt(currentSlide)-1));
                if (currentSlide == "1") moveToLeft = 0;
                $(defaults.mainSelector+' '+defaults.container).css('left',moveToLeft+'px');
                if (defaults.responsive){
                    if (window.innerWidth <= 1024) {
                        for (var i = 0; i<count;i++){
                            $(defaults.mainSelector+' '+defaults.container+' '+'div.slides').eq(i).css('background-image','url('+items[0][i]["tabletImg"]+')');
                        }
                    } else {
                        for (var i = 0; i<count;i++){
                            $(defaults.mainSelector+' '+defaults.container+' '+'div.slides').eq(i).css('background-image','url('+items[0][i]["desktopImg"]+')');
                        }
                    }
                }
            }
        },
        calculateWidths: function(items){
            var totalWidth = 0;
            var count = items[0].length;
            for (var i = 0; i<count;i++){
                totalWidth = totalWidth + $(defaults.mainSelector+' '+defaults.container+' '+'div.slides').eq(i).width();
            }
            return totalWidth;
        },
        setContainer: function(items){
            $(defaults.mainSelector+' '+defaults.container).height('inherit');
            $(defaults.mainSelector+' '+defaults.container).css('position','absolute');
            $(defaults.mainSelector+' '+defaults.container).width(methods.calculateWidths(items));
            $(defaults.mainSelector+' '+defaults.container).addClass('clearfix');
        },
        startSlider: function(items,autoplay){
            methods.setContainer(items);

            $(defaults.mainSelector+' '+defaults.navClass+' a').click(function(e){
                e.preventDefault();

                var imgWidth = $(document).width();
                var item = $(this);
                var moveToLeft = -((imgWidth*item.text())-imgWidth)+'px' ;

                $(defaults.mainSelector+' '+defaults.navClass+' a').removeClass('current');
                item.addClass('current');

                $(defaults.mainSelector+' '+defaults.container).animate({
                    left: moveToLeft
                },defaults.time)
            })

            if (autoplay){
                itvl = methods.createAutoPlay(items);
                if (defaults.enableTimerBar) methods.startTimer();
                if (defaults.stopOnHover){
                    $(defaults.mainSelector+' '+defaults.container).hover(function() {
                        window.clearInterval(itvl);
                        if (defaults.enableTimerBar) $(defaults.mainSelector+' '+'.'+defaults.timerBarClass).stop();
                    }, function() {
                        itvl = methods.createAutoPlay(items);
                        if (defaults.enableTimerBar) timer = methods.startTimer();
                    });
                }
            }
        },
        createAutoPlay: function(items){

            var count = items[0].length;
            return setInterval(function(){
                if (defaults.enableTimerBar) methods.startTimer();
                var imgWidth = $(document).width();
                currentLeft = $(defaults.mainSelector+' '+defaults.container).offset().left;
                if (currentLeft == -(methods.calculateWidths(items) - imgWidth)) currentLeft = imgWidth;
                var moveToLeft = (currentLeft-imgWidth)+'px';

                var current = $(defaults.mainSelector+' '+defaults.navClass+' .current')
                $(defaults.mainSelector+' '+defaults.navClass+' a').removeClass('current');

                if (count == current.text()){
                    $(defaults.mainSelector+' '+defaults.navClass+' a').eq(0).addClass('current');
                } else {
                    current.next().addClass('current');
                }

                $(defaults.mainSelector+' '+defaults.container).animate({
                    left: moveToLeft
                },defaults.time)

            },defaults.delay)
        },
        parseData: function() {
            var data = [];
            $.ajax({
                type: 'GET',
                url: defaults.jsonFile,
                dataType:'json',
                async: false,
                success: function (json) {
                    data.push(json);
                }
            })
            return data;
        }
    };


    $.fn.dechadouSlider = function(method) {
        var args = arguments;
        var $this = this;
        return this.each(function() {
            if ( methods[method] ) {
                return methods[method].apply( $this, Array.prototype.slice.call( args, 1 ));
            } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( $this, Array.prototype.slice.call( args, 0 ) );
            } else {
                $.error( 'Metodo ' +  method + ' no existe!' );
            }
        });
    };

})(jQuery);