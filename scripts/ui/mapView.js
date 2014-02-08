define(function() {
    
    var context,
        view,
        innerView,
        images = {};
    
    var x = 0,
        y = 0,
        dx = 0,
        dy = 0,
        scale = 1,
        dscale = 1,
        rotation = 0,
        drotation = 0;
    
    var update = function() {
        innerView.style.webkitTransform = "translate("+x+"px,"+y+"px) scale("+scale+") rotate("+rotation+"deg)";
    };
    
    var transform = function(e) {
        var g = e.gesture;
        scale -= dscale - g.scale;
        dscale = g.scale;
        
        rotation -= drotation - g.rotation;
        drotation = g.rotation;
        update();
    };
    var move = function(e) {
        var g = e.gesture;
        x -= dx - g.deltaX;
        y -= dy - g.deltaY;
        
        dx = g.deltaX;
        dy = g.deltaY;
        update();
    };
    var release = function(e) {
        dx = 0;
        dy = 0;
        dscale = 1;
        drotation = 0;
    };
    
    var init = function(ctx, area) {
        context = ctx;
        view = area;
        innerView = document.createElement("div");
        
        images.map = context.utils.load.img("img/map.svg");
        
        var hammerZoom = context.Hammer(view).on("transform", transform);
        var hammerMove = context.Hammer(view).on("drag", move);
        var hammerRelease = context.Hammer(view).on("release", release);
    };
    var draw = function() {
        view.appendChild(innerView);
        innerView.appendChild(images.map);
    };
    
    return {
        init: init,
        draw: draw
    }
    
});