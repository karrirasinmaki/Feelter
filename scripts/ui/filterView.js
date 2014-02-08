define(["./widgets"], function(widgets) {
    
    var FILTER_BOX_FANCY_TITLE = "How'd you want to have it?";
    var FILTER_BOX_HELPER_TEXT = "Select your prefers.";
    
    var onChangeListener;
    
    var notifyOnChange = function() {
        onChangeListener && onChangeListener();
    };
    
    var container = widgets.box();
    widgets.addClass(container, "infobox");
    container.style.zIndex = 11;
    var topBar = widgets.box({className: "title"});
    var filters = widgets.box({className: "filters"});
    var bottomBar = widgets.box();
    
    var addFiltersTo = function(to, data, selected, key) {
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
            
            to.appendChild(filtersItem);
        }
    };
    
    var generate = function(params) {
        var data = params.data || {};
        onChangeListener = params.onchange;
        
        for(var i=0, l=data.FILTERS.length; i<l; ++i) {
            var k = data.FILTERS[i];
            
            var newPage = widgets.box({
                className: "page id-"+i
            });
            addFiltersTo(newPage, data.VALUES[k], data.params[k], k);
            
            filters.appendChild(newPage);
            widgets.animate.slideDown(newPage, function() {
                widgets.toggleClass(newPage, "slidden");
            }, 1);
            
            var bottomBarItem = widgets.box({
                textContent: data.STRINGS[k],
                onclick: function() {
                    widgets.animate.slideHide(this._pageAttached);
                },
                _pageAttached: newPage
            });
            bottomBar.appendChild(bottomBarItem);
        }
        
        topBar.innerHTML = "<b>"+FILTER_BOX_FANCY_TITLE+"</b><i>"+FILTER_BOX_HELPER_TEXT+"</i>";
        
        container.appendChild(topBar);
        container.appendChild(filters);
        container.appendChild(bottomBar);
        return container;
    };
    
    return {
        generate: generate
    }
});
