define(function() {
    
    var VALUES = {
        method: [
            "Espresso",
            "Patch-brewer",
            "Drip",
            "AeroPress",
            "Chemex",
            "Coffee Shot"
        ]
    };
    
    var params = {
        method: [1,2,3,4,5,6]
    };
    
    var places = [
        {
            name: "Awe & Some Coffee",
            latlong: [60.1733244, 24.9410248],
            info: "Best coffee ever",
            production_methods: [1, 3, 4]
        },
        {
            name: "mBar",
            latlong: [60.170544, 24.936228],
            info: "Only second best coffee",
            production_methods: [5, 6]
        }
    ];
    
    var getPlaces = function() {
        var out = [];
        for(var i=0, l=places.length; i<l; ++i) {
            var p = places[i];
            
            for(var key in params) {
                if(!params.hasOwnProperty(key)) continue;
                if(params[key].length === VALUES[key].length) {
                    out.push(p);
                    break;
                }
            }
        }
        return out;
    };
    
    return {
        params: params,
        getPlaces: getPlaces
    };
    
});