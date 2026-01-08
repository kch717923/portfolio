window.addEventListener("load",function(){

    var $window = $(window);
    var $main_menu = $("#bottom_nav > ul > li");
    var $m_t_menu = $("#m_t_menu");
    var $m_t_menulist = $("#bottom_nav");
    var $clear = $("#clear > img");

    $main_menu.hover(

        function(){
            if($window.width() < 961) return;

            $(this).children(":last").stop().slideDown();
        },
        function(){
            if($window.width() < 961) return;
            $(this).children(":last").stop().slideUp(function(){
                $(this).removeAttr("style");
            })
        }
    );

    $main_menu.children("a").on("click",function(e){
        e.preventDefault();

        if($window.width() > 960) return;

        if($(this).next().is(":visible")){
            $(this).next().stop().slideUp(function(){
                $(this).removeAttr("style");
            })
        }else{
            $main_menu.children("ul").stop().slideUp(function(){
                $(this).removeAttr("style");
            });
            $(this).next().stop().slideDown();
        }
    });

    $m_t_menu.on("click",function(e){
        e.preventDefault();
        $m_t_menulist.animate({right:0});
    })

    $clear.on("click",function(){
        $m_t_menulist.animate({right:"-40%"},function(){
            $(this).removeAttr("style");
        });
    })

    $window.on("resize",function(){
        window_innerheight = $window.innerHeight();
        if($(this).width() > 960){
            $main_menu.children("ul").removeAttr("style");
        }
        if($(this).width() < 961){
            $main_menu.children("ul").removeAttr("style");
        }
    })

    var $coffee_imglist = $("#coffee_imglist > li");
    var visible_timing = 0;
    $coffee_imglist.each(function(){
        $(this).delay(visible_timing).animate({opacity:"1"});
        visible_timing += 300;
    })

    var $rolling = $("#rolling > ul");

    $rolling.hover(
        function(){window.clearInterval(rolling_)},
        function(){rolling_ = window.setInterval(rolling,2000)}
    )
    
    var rolling_ = window.setInterval(rolling,2000)

    function rolling(){
        $rolling.animate({marginTop:"-20px",},function(){
            $(this).append($(this).children(":first")).removeAttr("style");
        })
    }
    var $move_obj = $(".move_obj");
    var move_obj_offset_top;
    var window_scrolltop;
    var window_innerheight = $window.innerHeight();

    $window.on("scroll",function(){
        window_scrolltop = $window.scrollTop();
        $move_obj.each(function(){
            move_obj_offset_top = $(this).offset().top;
            if(window_innerheight + window_scrolltop > move_obj_offset_top){
                $(this).removeClass("move");
            }else
                $(this).addClass("move");
        })
    });

    var $promotion_rolling = $("#promotion_rolling > ul");
    
    function promotion(){
        $promotion_rolling.animate({marginLeft:"-200%"},function(){
            $(this).append($(this).children(":first")).removeAttr("style");
        });
    }

    var promotion_rolling_timing = window.setInterval(promotion,3000);

    $promotion_rolling.hover(
        function(){window.clearInterval(promotion_rolling_timing)},
        function(){promotion_rolling_timing = window.setInterval(promotion,3000);}
    )

    var $main_event = $("#main_event");

    var rendom_time_count = 1200;
    var rendom_snow_count = 0;
    var snow_count = 0;
    var rendom_left = 0;
    var rendom_width = 0;
    var rendom_speed = 0;
    var rendom_op = 1;
    
    snowgate();
    window.setInterval(snowgate,rendom_time_count)
    
    function snowgate(){
        rendom_snow_count = Math.floor(Math.random() * 4 + 4);
        for(snow_count= 0;snow_count < rendom_snow_count; snow_count++){
            rendom_width = Math.floor(Math.random() * 4 + 3);
            rendom_left = Math.floor(Math.random() * 100);
            rendom_speed = Math.floor(Math.random() * 6000 + 3000);
            rendom_op = Math.floor(Math.random() * 8 + 3) * 0.1;
            $("<img>",{src:"imgs/snow_ef.png",alt:"snow"})
            .css({position: "absolute",top:"0%",left: rendom_left + "%",width:rendom_width + "%"
                ,transform:"translateX(-50%)",display:"none",zIndex:"-1",opacity:rendom_op})
            .fadeIn({queue:false})
            .animate({top:"100%"},rendom_speed,function(){$(this).remove()})
            .prependTo($main_event);
        };
    };
});