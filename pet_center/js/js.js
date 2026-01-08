$(function(){
    var $slide = $("#slide_box > ul");
    var slide_stop
    slide_stop = window.setInterval(slide,3000);

    function slide(){
        $slide.animate({marginLeft:"-33.3333333333%"},function(){
            $(this).append($(this).children(":first")).removeAttr("style");
        });
    };

    $slide.hover(
        function(){window.clearInterval(slide_stop)},
        function(){slide_stop = window.setInterval(slide,3000)}
    );
})