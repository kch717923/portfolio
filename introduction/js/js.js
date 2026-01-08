$(function(){
    var $html = $("html");
    var $menu = $("#header > ul > li");
    var $title = $(".title");
    var i
    var scroll
    $menu.on("click",function(){
        i = $(this).index();

        scroll = $title.eq(i).offset().top - 200;

        $html.animate({scrollTop:scroll});
    });

    var $slide = $("#slide > ul");
    var $left_bt = $("#left_bt");
    var $right_bt = $("#right_bt");
    var j = 0;

    $left_bt.on("click",function(){
        if(j == 0 || $slide.is(":animated")) return;

        j--
        $slide.animate({marginLeft:j * -100 + "%"})

    })

    $right_bt.on("click",function(){
        if(j == $slide.children().length - 1 || $slide.is(":animated")) return;

        j++
        $slide.animate({marginLeft:j * -100 + "%"})
        
    })

    var $slide_move = $("#slide");
    var first_x = 0;
    var last_x = 0;
    var move_x = 0;

    $slide_move.on("mousedown",function(e){
        first_x = e.pageX;
        $slide_move.on("mousemove",function(e){
            move_x = (e.pageX - first_x) / $(this).width() * 100;
            if(j == 0 && move_x > 0) return
            if(j == $slide.children().length - 1 && move_x < 0) return
            $slide.css({marginLeft:(j * -100) + move_x + "%"});
        });
    });

    $slide_move.on("mouseup",function(e){
        last_x = e.pageX;
        $slide_move.off("mousemove");
        if(Math.abs(first_x - last_x) < 150) $slide.animate({marginLeft:j * -100 + "%"});

        else if(first_x > last_x){
            if(j == $slide.children().length - 1 || $slide.is(":animated")) return;

                j++
                $slide.animate({marginLeft:j * -100 + "%"});
        }
        else if(first_x < last_x){
            if(j == 0 || $slide.is(":animated")) return;

                j--
                $slide.animate({marginLeft:j * -100 + "%"});
        }
    });

    $slide_move.on("mouseleave",function(){
        $slide_move.off("mousemove");
        $slide.animate({marginLeft:j * -100 + "%"});
    });
})