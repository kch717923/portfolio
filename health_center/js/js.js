$(function(){
    var $menu_button = $("#menu_button");
    var $main_menu = $(".main_menu");
    var $sub_menu = $(".sub_menu");
    var $menu_close_button = $("#menu_close_button");
    var $overlay = $("#overlay");
    var $last_header = $("#last_header");
    var $window = $(window);

    $menu_button.on("click",function(){
        $overlay.fadeIn();
        $last_header.animate({right:"0"});
    });

    $overlay.on("click",function(){
        $(this).fadeOut();
        $last_header.removeAttr("style");
        $sub_menu.stop().slideUp();
    });

    $menu_close_button.on("click",function(){
        $overlay.fadeOut();
        $last_header.removeAttr("style");
        $sub_menu.stop().slideUp();
    });

    $main_menu.children("a").on("click",function(e){
        e.preventDefault();
        if($window.width() > 1019) return

        if($(this).siblings().is(":hidden")){
            $(this).siblings().stop().slideDown();
        }
        else if($(this).siblings().is(":visible")){
            $(this).siblings().stop().slideUp();
        }
    })

    $main_menu.hover(
        function(){
            if($window.width() < 1020) return;

            $(this).children("ul").stop().slideDown();
        },
        function(){
            if($window.width() < 1020) return;

            $(this).children("ul").stop().slideUp();
        }
    )

    $window.on("resize",function(){

        if($(this).width() > 1019){
            $overlay.removeAttr("style");
            $last_header.removeAttr("style");
            $main_menu.children("ul").removeAttr("style");
        }
    })

    var $borad_menu = $("#borad > div > h2");
    var $borad_list = $("#borad > ul");
    var borad_index;
    
    $borad_menu.on("click",function(){
        $borad_menu.removeClass("on");
        $(this).addClass("on");
        borad_index = $(this).index();
        $borad_list.removeClass("on");
        $borad_list.eq(borad_index).addClass("on");

    })

    var $slide = $("#slide > ul");
    var slide_point = 1;
    var slide_stop;
    var $slide_left_bt = $("#slide_left_bt");
    var $slide_right_bt = $("#slide_right_bt");
    var $slide_count = $("#slide_count")

    $slide_count.html(slide_point + "/" + $slide.children().length)
    slide_stop = window.setInterval(slide_event,2000);

    function slide_event(){
        if($slide.is(":animated")) return;
        slide_point++
        if(slide_point > $slide.children().length) slide_point = 1;
        $slide.animate({marginLeft:"-100%"},function(){
            $(this).append($(this).children(":first")).removeAttr("style")
            $slide_count.html(slide_point + "/" + $(this).children().length);
        })
    };

    $slide.parent().hover(
        function(){
            window.clearInterval(slide_stop)
        },
        function(){
            slide_stop = window.setInterval(slide_event,2000);
        }
    );
    
    $slide_left_bt.on("click",function(){
        if($slide.is(":animated")) return;
        slide_point--
        if(slide_point == 0) slide_point = 5;
        console.log($slide.children(":last"))
        $slide.css({marginLeft:"-100%"}).prepend($slide.children(":last"))
        .animate({marginLeft:"0"});
        $slide_count.html(slide_point + "/" + $slide.children().length)
    })

    $slide_right_bt.on("click",function(){
        slide_event();
    })
})