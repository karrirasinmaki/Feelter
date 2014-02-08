define(function() {
    
    var VALUES = {
        production_methods: [
            "Espresso",
            "Patch-brewer",
            "Drip",
            "AeroPress",
            "Chemex",
            "Coffee Shot"
        ],
        services: [
            "WiFi"
        ]
    };
    var STRINGS = {
        production_methods: "Method",
        services: "Services"
    };
    var FILTERS = ["production_methods", "services"];
    
    var params = {
        production_methods: [true,true,true,true,true,true],
        services: [true]
    };
    
    // Count of how many places serves like Espresso
    var statistics = {};
    
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
    // Paramsetkey could be like "production_methods"
    var lookParamSet = function(p, paramSetKey) {
        var paramSet = params[paramSetKey];
        for(var i=0, l=paramSet.length; i<l; ++i) {
            if(paramSet[i] && p[paramSetKey] && p[paramSetKey].indexOf( i ) !== -1) return true;
        }
        return false;
    };
    
    var getPlaces = function() {
        var out = [];
        for(var i=0, l=places.length; i<l; ++i) {
            var p = places[i];
            
            for(var key in params) {
                if(!params.hasOwnProperty(key)) continue;
                if( lookParamSet(p, key) ) {
                    out.push(p);
                    break;
                }
            }
        }
        return out;
    };
    
    var countStatistics = function() {
        function mapp(o) {
            for(var k in o) {
                if(!o.hasOwnProperty(k)) continue;
                statistics[k] = {};
                mapp(o[k]);
            }
        }
        mapp(VALUES);
        
        for(var i=0, l=places.length; i<l; ++i) {
            //TODO
        }
    };
    
    return {
        FILTERS: FILTERS,
        VALUES: VALUES,
        STRINGS: STRINGS,
        params: params,
        getPlaces: getPlaces
    };
    
});