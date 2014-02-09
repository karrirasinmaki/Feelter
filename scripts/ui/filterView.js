define(["./widgets"], function(widgets) {
    
    var FILTER_BOX_FANCY_TITLE = "How'd you want to have it?";
    var FILTER_BOX_HELPER_TEXT = "Select your prefers.";
    
    var onChangeListener;
    
    var notifyOnChange = function() {
        onChangeListener && onChangeListener();
    };
    
    var container = widgets.box();
    container.style.zIndex = 11;
    var arrowWrapper = widgets.box({className: "arrow-wrapper"});
    arrowWrapper.className = "arrow-wrapper";
    arrowWrapper.innerHTML = "<span class='arrow-top'></span>";
    var inner = widgets.box({className: "blue inner"});
    var topBar = widgets.box({className: "title"});
    var filters = widgets.box({className: "filters"});
    var bottomBar = widgets.box({className: "bottom"});
    
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
    
    var showPage = function(page) {
        widgets.removeClass(page, "flipOutX");
        widgets.show(page);
        widgets.addClass(page, "flipInX");
        bottomBar._pageShowing = page;
    }
    
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
            widgets.hide(newPage);
            
            var bottomBarItem = widgets.button({
                textContent: data.STRINGS[k],
                onclick: function() {
                    if(bottomBar._pageShowing) {
                        widgets.addClass(bottomBar._pageShowing, "flipOutX");
                        var el = bottomBar._pageShowing;
                        var toShow = this._pageAttached;
                        setTimeout(function() {
                            widgets.hide(el);
                            showPage(toShow);
                        }, 100);
                    }
                    else showPage(this._pageAttached);
                },
                _pageAttached: newPage
            });
            bottomBar.appendChild(bottomBarItem);
        }
        
        if(params.onhide) arrowWrapper.onclick = params.onhide;
        
        topBar.innerHTML = "<b>"+FILTER_BOX_FANCY_TITLE+"</b><i>"+FILTER_BOX_HELPER_TEXT+"</i>";
        
        inner.appendChild(topBar);
        inner.appendChild(filters);
        inner.appendChild(bottomBar);
        container.appendChild(arrowWrapper);
        container.appendChild(inner);
        return container;
    };
    
    return {
        generate: generate
    }
});
