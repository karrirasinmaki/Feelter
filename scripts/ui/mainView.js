define(["./mapView", "placeData", "./filterView"], function(mapView, placeData, filterView) {
    
    var context;
    
    var INFO_BOX_TEXT = "<p><b>Plaa plaa plaa.</b></p><p>This is a map, and you are a human. Can we cooperate? Nice!</p><p>Hopefully I can help you to find new experiences and meet nice people around coffee. Use me wisely.</p><p>Mustana coffee blog and Rasinmäki & Rasinmäki web developers have created me. Salute them!</p><p>www.mustana.fi<br>www.rara.fi</p>"
    
    var area, filterBox, topbar, infoBox, infoButton;
    
    var showHideFilters = function() {
        var wdg = context.widgets;
        wdg.animate.slideToggle(filterBox, window.innerHeight);
        wdg.animate.slideToggle(topbar, window.innerHeight);
        wdg.toggleClass(area, "slidden");
    };
    
    var init = function(ctx) {
        context = ctx;
        var wdg = context.widgets;
        
        var body = document.getElementsByTagName("body")[0];
        
        area = document.createElement("div");
        area.id = "themap";
        
        /* FilterBox */
        filterBox = filterView.generate({
            data: placeData,
            onchange: function() {console.log(placeData);
                mapView.refresh(placeData.getPlaces());
            },
            onhide: showHideFilters
        });
        filterBox.id = "filterbox";
        
        /* TopBar */
        topbar = wdg.topBar({
            innerHTML: '<div class="left">HELSINKI<br>COFFEE<br>MAP</div><div class="right">Find the best brew!</div>',
            onclick: showHideFilters
        });
        topbar.id = "topbar";
        
        /* InfoBox */
        infoBox = wdg.infoBox({
            innerHTML: INFO_BOX_TEXT
        });
        wdg.animate.slideDown(infoBox, function() {
            wdg.toggleClass(infoBox, "slidden");
        }, 1);
        
        infoButton = wdg.infoButton({
            textContent: "i",
            onclick: function() {
                wdg.animate.slideHide(infoBox);
            }
        });
        
        body.appendChild(topbar);
        body.appendChild(filterBox);
        body.appendChild(area);
        body.appendChild(infoBox);
        body.appendChild(infoButton);
        
        //area.style.top = topbar.offsetHeight + "px";
        
        mapView.init(context, area);
        mapView.refresh(placeData.getPlaces());
    };
    
    return {
        init: init
    };
    
});