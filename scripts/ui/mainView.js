define(["./mapView", "placeData", "./filterView"], function(mapView, placeData, filterView) {
    
    var context;
    
    var INFO_BOX_TEXT = "<p><b>Plaa plaa plaa.</b></p><p>This is a map, and you are a human. Can we cooperate? Nice!</p><p>Hopefully I can help you to find new experiences and meet nice people around coffee. Use me wisely.</p><p>Mustana coffee blog and Rasinmäki & Rasinmäki web developers have created me. Salute them!</p><p>www.mustana.fi<br>www.rara.fi</p>"
    
    var init = function(ctx) {
        context = ctx;
        var wdg = context.widgets;
        
        var body = document.getElementsByTagName("body")[0];
        var area = document.createElement("div");
            area.id = "canvas";
        
        var filterBox = filterView.generate({
            data: placeData,
            onchange: function() {console.log(placeData);
                mapView.refresh(placeData.getPlaces());
            }
        });
        wdg.hide(filterBox);
        
        var topbar = wdg.topBar({
            innerHTML: '<div class="left">HELSINKI<br>COFFEE<br>MAP</div><div class="right">Find the best brew!</div>',
            onclick: function() {
                wdg.toggleVisibility(filterBox);
            }
        });
        
        var infoBox = wdg.infoBox({
            innerHTML: INFO_BOX_TEXT
        });
        wdg.hide(infoBox);
        
        var infoButton = wdg.infoButton({
            textContent: "i",
            onclick: function() {
                wdg.toggleVisibility(infoBox);
            }
        });
        
        body.appendChild(topbar);
        body.appendChild(filterBox);
        body.appendChild(area);
        body.appendChild(infoBox);
        body.appendChild(infoButton);
        
        mapView.init(context, area);
        mapView.refresh(placeData.getPlaces());
    };
    
    return {
        init: init
    };
    
});