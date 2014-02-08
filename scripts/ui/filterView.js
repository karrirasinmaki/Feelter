define(["./widgets"], function(widgets) {
    
    var container = widgets.box();
    widgets.addClass(container, "infobox");
    var filters = widgets.box({className: "filters"});
    var bottomBar = widgets.box();
    
    var addFilters = function(data, selected) {
        for(var i=0, l=data.length; i<l; ++i) {
            var d = data[i];
            var filtersItem = widgets.box({
                innerHTML: "<span><b>" + d + "</b></span>",
                className: "filteritem"
            });
            if(selected.indexOf(i) !== -1) widgets.addClass(filtersItem, "selected");
            filters.appendChild(filtersItem);
        }
    };
    
    var generate = function(data) {
        for(var i=0, l=data.FILTERS.length; i<l; ++i) {
            var k = data.FILTERS[i];
            
            addFilters(data.VALUES[k], data.params[k]);
            
            var bottomBarItem = widgets.box({
                textContent: data.STRINGS[k],
                onclick: function() {
                    console.log(",,o");
                }
            });
            bottomBar.appendChild(bottomBarItem);
        }
        
        container.appendChild(filters);
        container.appendChild(bottomBar);
        return container;
    };
    
    return {
        generate: generate
    }
});