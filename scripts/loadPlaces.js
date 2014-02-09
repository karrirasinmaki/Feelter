define(function() {
    
    var load = function(callback) {
    
        require(["https://spreadsheets.google.com/feeds/list/0AlnwxVCP9zxxdHowakJhZTR2TlNGY2FFS3NTeHhKb1E/2/public/values?alt=json-in-script&callback=define"],
            function(data) {console.log(data);
                var arr = [];
                var entry = data.feed.entry;
                for(var i=0, l=entry.length; i<l; ++i) {
                    var ent = entry[i];
                    var obj = {};
                    
                    for(var k in ent) {
                        if(!ent.hasOwnProperty(k)) continue;
                        var val = ent[k];
                        if(val.$t !== undefined) val = val.$t;
                        var newKey = k.replace("gsx$", "");
                        if(newKey.indexOf("arr") !== -1) {
                            val = val.split(",");
                            newKey = newKey.replace("arr", "");
                        }
                        obj[newKey] = val;
                    }
                    arr.push(obj);
                }
                callback(arr);
            }
        );
        
    };
    
    return load;
    
    /*
    var places = [
        {
            name: "",
            addr: "",
            phone: "",
            www: "",
            open: "",
            latlong: [],
            production_methods: [],
            coffees: [],
            services: [],
            foods: []
        },
        {
            name: "Good Life Coffee",
            addr: "Kolmas Linja 17",
            phone: "",
            www: "http://goodlifecoffee.fi/",
            open: "Mon-Fri 8:30 - 18:00\nSat 10:00 - 17:00\nSun 12:00 - 16:00",
            latlong: [],
            production_methods: [0,3],
            coffees: [0],
            services: [1,2],
            foods: [0,1,2]
        },
        {
            name: "Good Life Coffee",
            addr: "Kinaporinkatu",
            phone: "",
            www: "http://goodlifecoffee.fi/",
            open: "Opening in February 2014.",
            latlong: [],
            production_methods: [],
            coffees: [],
            services: [],
            foods: []
        }
    ];
    */
    
    
});