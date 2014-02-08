define(["./mapView"], function(mapView) {
    
    var context;
    
    var INFO_BOX_TEXT = "<p><b>Plaa plaa plaa.</b></p><p>This is a map, and you are a human. Can we cooperate? Nice!</p><p>Hopefully I can help you to find new experiences and meet nice people around coffee. Use me wisely.</p><p>Mustana coffee blog and Rasinmäki & Rasinmäki web developers have created me. Salute them!</p><p>www.mustana.fi<br>www.rara.fi</p>"
    
    var init = function(ctx) {
        context = ctx;
        var wdg = context.widgets;
        
        var body = document.getElementsByTagName("body")[0];
        var area = document.createElement("div");
            area.id = "canvas";
        var topbar = wdg.topBar({
            innerHTML: '<div class="left">HELSINKI<br>COFFEE<br>MAP</div><div class="right">Find the best brew!</div>'
        });
        var infoBox = wdg.infoBox(INFO_BOX_TEXT);
        wdg.hide(infoBox);
        var infoButton = wdg.infoButton("i", {
            onclick: function() {
                wdg.toggleVisibility(infoBox);
            }
        });
        
        body.appendChild(topbar);
        body.appendChild(area);
        body.appendChild(infoBox);
        body.appendChild(infoButton);
        
        mapView.init(context, area);
    };
    
    return {
        init: init
    };
    
});