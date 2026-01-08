$(function(){
    window.addEventListener("wheel",function(e){
        e.preventDefault();
    },{passive:false});

    var $window = $(window);
    var $sections_rolling = $("#sections > ul");
    var page = 0;
    var last_page = $sections_rolling.children().length;

    $sections_rolling.css({width:last_page * 100 + "%"});
    $sections_rolling.children().css({width:100 / last_page + "%"});

    $window.on("wheel",function(e){
        if($sections_rolling.is(":animated")) return;

        if(e.originalEvent.deltaY > 0){
            if(page == last_page - 1) return;
            page++;
        }

        if(e.originalEvent.deltaY < 0){
            if(page == 0) return;
            page--;
        }

        $sections_rolling.animate({marginLeft:page * -100 + "%"});
    });

    var $left_bt = $("#left_bt");
    var $right_bt = $("#right_bt");

    $left_bt.on("click",function(){
        if(page == 0) return;

        page--;
        $sections_rolling.animate({marginLeft:page * -100 + "%"});
    });

    $right_bt.on("click",function(){
        if(page == last_page - 1) return;

        page++;
        $sections_rolling.animate({marginLeft:page * -100 + "%"});
    });

    
    var $menu = $("#menu");
    var $overlay = $("#overlay");
    var $menu_list =$("#menu_box > ul > li");

    $menu.on("click",function(){
        if($overlay.is(":hidden")){
            $overlay.css("display","block").children().animate({top:"50%"});
            $(this).children().attr("src","imgs/menu_close_img.png");
        }
        else if($overlay.is(":visible")){
            $overlay.children().animate({top:"-100%"},function(){
                $(this).parent().removeAttr("style");
            });
            $(this).children().attr("src","imgs/menu_img.png");
        };
    })

    $menu_list.on("click",function(){
        page = $(this).index();
        $sections_rolling.animate({marginLeft:page * -100 + "%"});
        $overlay.children().animate({top:"-100%"},function(){
                $(this).parent().removeAttr("style");
            });
        $menu.children().attr("src","imgs/menu_img.png");

    });
});