define(["./mapView"], function(mapView) {
    
    var context;
    
    var init = function(ctx) {
        context = ctx;
        
        var body = document.getElementsByTagName("body")[0];
        var area = document.createElement("div");
            area.id = "canvas";
        var topbar = context.widgets.topBar();
        
        body.appendChild(topbar);
        body.appendChild(area);
        
        mapView.init(context, area);
    };
    var draw = function() {
        mapView.draw();
    };
    
    return {
        init: init,
        draw: draw
    };
    
});