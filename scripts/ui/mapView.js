define(["./gmaps.infobox"], function(____) {
    
    var helsinki = {latlong: [60.1733244, 24.9410248]};
    var userLocation = helsinki;
    
    var getUserPosition = function() {
        if(navigator.geolocation) {
            var pos = navigator.geolocation.getCurrentPosition(function(pos) {
                userLocation = {latlong: [pos.coords.latitude, pos.coords.longitude]};
                addMarkers([userLocation]);
            });
        }
    };
    
    var GUIDE_BUTTON_TEXT = "Guide me there!";
        
    var context,
        view,
        map,
        markers = [],
        infobox;
    
    var getInfoBoxTemplate = function(titleText, bodyText, lat, long) {
        var div = document.createElement("div"),
            title = document.createElement("h2"),
            guideButton = document.createElement("button"),
            theBody = document.createElement("p");
        
        title.textContent = titleText;
        guideButton.className = "guidebutton";
        guideButton.textContent = GUIDE_BUTTON_TEXT;
        guideButton.onclick = function() {
            console.log("mo");
        };
        theBody.textContent = bodyText;
        
        div.appendChild(title);
        div.appendChild(guideButton);
        div.appendChild(theBody);
        return div;
    };
    
    var closeInfoBox = function() {
        infobox && infobox.close();
    };
    
    var openMarkerInfo = function(event) {
        var extra = this._extraPlaceData;
        closeInfoBox();
        infobox = new InfoBox({
            alignBottom: true,
            pixelOffset: new google.maps.Size(-150, -50),
            boxStyle: {
                width: "300px"
            },
            content: getInfoBoxTemplate(extra.name, extra.info, extra.latlong[0], extra.latlong[1]),
            boxClass: "map-infobox",
            closeBoxURL: ""
        });
        infobox.open(this.map, this);
    };
    
    var addMarkers = function(data) {
        for(var i=0; i<data.length; ++i) {
            var place = data[i];
            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(place.latlong[0], place.latlong[1]),
                _extraPlaceData: place
            });
            markers.push(marker);
            google.maps.event.addListener(marker, 'click', openMarkerInfo);
        }
    };
    var removeAllMarkers = function() {
        for(var i=0, l=markers.length; i<l; ++i) {
            markers[i].setMap(null);
        }
    };
    
    var init = function(ctx, area) {
        context = ctx;
        view = area;
        
        area.style.height = "100%";
        var mapOptions = {
            center: new google.maps.LatLng(userLocation.latlong[0], userLocation.latlong[1]),
            zoom: 15
        };
        map = new google.maps.Map(area, mapOptions);
        google.maps.event.addListener(map, 'click', closeInfoBox);
        
        getUserPosition();
    };
    
    var refresh = function(_places) {
        removeAllMarkers();
        addMarkers(_places);  
    };
    
    return {
        init: init,
        refresh: refresh
    }
    
});