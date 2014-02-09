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
                innerHTML: "<span><strong>" + d + "</strong></span>",
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
    
    var showPageByButton = function(button) {
        var page = button._pageAttached
        widgets.addClass(button, "selected");
        widgets.removeClass(page, "flipOutX");
        widgets.show(page);
        widgets.addClass(page, "flipInX");
        bottomBar._selectedButton = button;
    };
    /* Hide old selected, show current */
    var hideShowPageByButton = function(button, toShow) {
        widgets.addClass(button._pageAttached, "flipOutX");
        setTimeout(function() {
            widgets.removeClass(button, "selected");
            widgets.hide(button._pageAttached);
            showPageByButton(toShow);
        }, 100);
    };
    
    var generate = function(params) {
        var data = params.data || {};
        onChangeListener = params.onchange;
        
        for(var i=0, l=data.FILTERS.length; i<l; ++i) {
            var k = data.FILTERS[i];
            
            /* Page */
            var newPage = widgets.box({
                className: "page id-"+i
            });
            addFiltersTo(newPage, data.VALUES[k], data.params[k], k);
            
            filters.appendChild(newPage);
            if(i > 0) widgets.hide(newPage);
            
            /* BottomBar */
            var bottomBarItem = widgets.button({
                innerHTML: "<strong>"+data.STRINGS[k]+"</strong>",
                onclick: function() {
                    if(bottomBar._selectedButton) {
                        hideShowPageByButton(bottomBar._selectedButton, this);
                    }
                    else showPageByButton(this);
                },
                _pageAttached: newPage
            });
            bottomBar.appendChild(bottomBarItem);
            
            if(i === 0) {
                bottomBar._selectedButton = bottomBarItem;
                showPageByButton(bottomBarItem);
            }
        }
        
        if(params.onhide) arrowWrapper.onclick = params.onhide;
        
        topBar.innerHTML = "<strong>"+FILTER_BOX_FANCY_TITLE+"</strong><i>"+FILTER_BOX_HELPER_TEXT+"</i>";
        
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
