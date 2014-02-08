define(function() {
    
    var VALUES = {
        production_methods: [
            "Espresso",
            "Patch-brewer",
            "Drip",
            "AeroPress",
            "Chemex",
            "Coffee Shot"
        ]
    };
    var STRINGS = {
        production_methods: "Method"
    };
    var FILTERS = ["production_methods"];
    
    var params = {
        production_methods: [0,1,2,3,4,5]
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
            production_methods: [5, 0]
        }
    ];
    
    // If any of param vals found in p, return true. Else false.
    var lookParamSet = function(p, paramSetKey) {
        var paramSet = params[paramSetKey];
        for(var i=0, l=paramSet.length; i<l; ++i) {
            if(p[paramSetKey].indexOf( paramSet[i] ) !== -1) return true;
        }
        return false;
    };
    
    var getPlaces = function() {
        var out = [];
        for(var i=0, l=places.length; i<l; ++i) {
            var p = places[i];
            
            for(var key in params) {
                if(!params.hasOwnProperty(key)) continue;
                if( params[key].length === VALUES[key].length || lookParamSet(p, key) ) {
                    out.push(p);
                    break;
                }
            }
        }
        return out;
    };
    
    return {
        FILTERS: FILTERS,
        VALUES: VALUES,
        STRINGS: STRINGS,
        params: params,
        getPlaces: getPlaces
    };
    
});