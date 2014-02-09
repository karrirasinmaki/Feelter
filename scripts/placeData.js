define(["utils/utils", "loadPlaces"], function(utils, loadPlaces) {
    
    var places = {};
    
    var VALUES = {
        productionmethods: [
            "Espresso", // 0
            "Patch Brew", // 1
            "Drip", // 2
            "AeroPress", // 3
            "Chemex", // 4
            "Coffee Shot", // 5
            "French Press", // 6
            "Sifon", // 7
            "V60" // 8
        ],
        coffees: [
            "Micro Roasteries", // 0
            "Johan & Nyström", // 1
            "Kaffa Roastery", // 2
            "Caffi", // 3
            "Others", // 4
            "Helsingin Kahvipaahtimo", // 5
            "Kaffe Obscura", // 6
            "Maja Coffee" // 7
        ],
        foods: [
            "Breakfast", // 0
            "Chocolate", // 1
            "Pastry", // 2
            "Ice Cream", // 3
            "Lunch", // 4
            "Salad", // 5
            "Brunch" // 6
        ],
        services: [
            "WiFi", // 0
            "Magazines", // 1
            "Educations" // 2
        ]
    };
    var STRINGS = {
        productionmethods: "Method",
        coffees: "Coffee",
        foods: "Food",
        services: "Services"
    };
    var FILTERS = ["productionmethods", "coffees", "foods", "services"];
    
    var params = {
        productionmethods: utils.newArray(VALUES.productionmethods.length, true),
        coffees: utils.newArray(VALUES.coffees.length, true),
        foods: utils.newArray(VALUES.foods.length, true),
        services: utils.newArray(VALUES.services.length, true)
    };
    
    // Count of how many places serves like Espresso
    var statistics = {};
    
    // If any of param vals found in p, return true. Else false.
    // Paramsetkey could be like "productionmethods"
    var lookParamSet = function(p, paramSetKey) {
        /* paramSet has array full of true/false vars */
        var paramSet = params[paramSetKey];
        for(var i=0, l=paramSet.length; i<l; ++i) {
            if(paramSet[i] && p[paramSetKey] && p[paramSetKey].indexOf( ""+i ) !== -1) return true;
        }
        return false;
    };
    
    var getPlaces = function() {
        var out = [];
        for(var i=0, l=places.length; i<l; ++i) {
            var p = places[i];
            
            /* Check if place has any of filters */
            for(var key in params) {
                if(!params.hasOwnProperty(key)) continue;
                /* If found one, add to list and continue to next place */
                if( lookParamSet(p, key) ) {
                    out.push(p);
                    break;
                }
            }
        }
        return out;
    };
    
    var load = function(callback) {
        loadPlaces(function(data) {
            places = data;
            callback();
        });
    };
    
    return {
        FILTERS: FILTERS,
        VALUES: VALUES,
        STRINGS: STRINGS,
        params: params,
        getPlaces: getPlaces,
        load: load
    };
    
});