define(["./gmaps.infobox"], function(____) {
    
    var helsinki = {latlong: [60.1733244, 24.9410248]};
    var userLocation = helsinki;
    
    var getUserPosition = function() {
        if(navigator.geolocation) {
            var pos = navigator.geolocation.getCurrentPosition(function(pos) {
                userLocation = {
                    name: "You",
                    info: "This is you, hi!",
                    latlong: [pos.coords.latitude, pos.coords.longitude]
                };
                addMarkers([userLocation], "");
            });
        }
    };
    
    var GUIDE_BUTTON_TEXT = "Guide me there!";
        
    var context,
        view,
        map,
        markers = [],
        infobox = {};
    
    var getInfoBoxTemplate = function(titleText, bodyText, lat, long) {
        var fragment = document.createDocumentFragment();
        var div = document.createElement("div"),
            title = document.createElement("h2"),
            guideButton = document.createElement("a"),
            theBody = document.createElement("p"),
            arrowWrapper = document.createElement("div");
        
        title.textContent = titleText;
        guideButton.className = "guidebutton";
        guideButton.href = "http://maps.google.com/maps?saddr=Current+location&daddr="+lat+","+long;
        guideButton.target = "_blank";
        guideButton.textContent = GUIDE_BUTTON_TEXT;
        theBody.textContent = bodyText;
        
        div.appendChild(title);
        div.appendChild(guideButton);
        div.appendChild(theBody);
        div.className = "map-infobox";
        
        var arrow = document.createElement("span");
        arrow.className = "arrow-down";
        arrowWrapper.appendChild(arrow);
        arrowWrapper.className = "arrow-wrapper";
        
        fragment.appendChild(div);
        fragment.appendChild(arrowWrapper);
        return fragment;
    };
    
    var closeInfoBox = function() {
        infobox.close && infobox.close();
    };
    
    var onClickMarker = function(event) {
        var extra = this._extraPlaceData;
        closeInfoBox();
        if(infobox._markerId !== this._id) {
            infobox = new InfoBox({
                alignBottom: true,
                pixelOffset: new google.maps.Size(-150, -20),
                boxStyle: {
                    width: "300px"
                },
                content: getInfoBoxTemplate(extra.name, extra.info, extra.latlong[0], extra.latlong[1]),
                boxClass: "arrowbox",
                closeBoxURL: ""
            });
            infobox._markerId = this._id;
            infobox.open(this.map, this);
        }
        else {
            infobox._markerId = null;
        }
    };
    
    var addMarkers = function(data, icon) {
        icon = icon || "img/circle.png";
        
        var iterator = 0;
        function add() {
            var place = data[iterator];
            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(place.latlong[0], place.latlong[1]),
                icon: ""+icon,
                _extraPlaceData: place,
                _id: iterator
            });
            markers.push(marker);
            google.maps.event.addListener(marker, 'click', onClickMarker);
            
            iterator++;
            if(iterator < data.length) setTimeout(add, 400);
        }
        add();
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