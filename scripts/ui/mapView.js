define(["mapMarks"], function(places) {
    
    var helsinki = {latlong: [60.1733244, 24.9410248]};
        
    var context,
        view,
        map,
        markers = [];
    
    var openMarkerInfo = function(event) {
        var infowindow = new google.maps.InfoWindow({
            content: this._extraPlaceData.name
        });
        infowindow.open(this.map, this);
    };
    
    var addMarkers = function() {
        for(var i=0; i<places.length; ++i) {
            var place = places[i];
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
    
    var init = function(ctx, area) {
        context = ctx;
        view = area;
        
        area.style.height = "100%";
        var mapOptions = {
            center: new google.maps.LatLng(helsinki.latlong[0], helsinki.latlong[1]),
            zoom: 15
        };
        map = new google.maps.Map(area, mapOptions);
        
        addMarkers();
    };
    var draw = function() {
    };
    
    return {
        init: init,
        draw: draw
    }
    
});