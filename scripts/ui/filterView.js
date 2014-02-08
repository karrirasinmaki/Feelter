define(["./widgets"], function(widgets) {
    
    var onChangeListener;
    
    var notifyOnChange = function() {
        onChangeListener && onChangeListener();
    };
    
    var container = widgets.box();
    widgets.addClass(container, "infobox");
    container.style.zIndex = 11;
    var filters = widgets.box({className: "filters"});
    var bottomBar = widgets.box();
    
    var addFilters = function(data, selected, key) {
        for(var i=0, l=data.length; i<l; ++i) {
            var d = data[i];
            var filtersItem = widgets.box({
                innerHTML: "<span><b>" + d + "</b></span>",
                className: "filteritem",
                onclick: function(e) {
                    if(this._selected) {
                        widgets.removeClass(this, "selected");
                    }
                    else {
                        widgets.addClass(this, "selected");
                    }
                    this._selected = !this._selected;
                    selected[ this._index ] = this._selected;
                    notifyOnChange();
                }
            });
            filtersItem._index = i;
            filtersItem._selected = (selected[i]);
            
            if(filtersItem._selected) {
                widgets.addClass(filtersItem, "selected");
                filtersItem._selected = true;
            }
            else {
                filtersItem._selected = false;
                widgets.removeClass(filtersItem, "selected");
            }
            
            filters.appendChild(filtersItem);
        }
    };
    
    var generate = function(params) {
        var data = params.data || {};
        onChangeListener = params.onchange;
        
        for(var i=0, l=data.FILTERS.length; i<l; ++i) {
            var k = data.FILTERS[i];
            
            addFilters(data.VALUES[k], data.params[k], k);
            
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