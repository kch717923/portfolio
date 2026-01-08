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
        if($(this).width() > 960){
            $main_menu.children("ul").removeAttr("style");
        }
        if($(this).width() < 961){
            $main_menu.children("ul").removeAttr("style");
        }
    });
    var $sub_img = $("#main_img > div > img");

    window.setTimeout(function(){
        $sub_img.css({visibility:"visible",opacity:"1",transform:"translateY(0)"})
    },300);

    var $coffee_menu_button = $("#coffee_menu_button > div");
    var $coffee_menu_list = $("#coffee_menu_list > li");
    var i
    $coffee_menu_button.on("click",function(){
        $coffee_menu_button.removeClass("on");
        $(this).addClass("on");

        i = $(this).attr("data-name");

        $coffee_menu_list.addClass("on");
        
        if(i == "all"){
            $coffee_menu_list.removeClass("on");
        }
        else{
            $coffee_menu_list.each(function(){
                if($(this).attr("data-name") == i)
                    $(this).removeClass("on");

                else $(this).addClass("on");
            })
        }
    });
});