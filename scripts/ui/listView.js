define(["./widgets"], function(widgets) {
    
    var container = widgets.box({className: "blue"});
    container.id = "listbox";
    var scrollView = widgets.box({className: "scroll"});
                                  
    container.appendChild(scrollView);
    container._listArea = scrollView;
    
    var parseFeatures = function(data, params) {
        var vals = params.VALUES;
        var out = "";
        
        for(var k in vals) {
            if(!data[k] || !vals.hasOwnProperty(k)) continue;
            var feat = data[k];
            var valset = vals[k];
            var subout = "";
            for(var i=0, l=feat.length; i<l; ++i) {
                var o = valset[feat[i]];
                if(o) subout += (i > 0 ? ", " : "") + o;
            }
            out += "<div>"+subout+"<div>";
        }
        
        return out;
    };
                                  
    var open = function(dataset, params, userLocation) {
        if(!userLocation) userLocation = "Current+Location";
        var area = this._listArea;
        area.innerHTML = "";
        
        for(var i=0, l=dataset.length; i<l; ++i) {
            var data = dataset[i];
            var listItem = widgets.box({className: "listitem minimized"});
            var left = widgets.box({clasName: "left"});
            var right = widgets.circleButton({
                clasName: "right",
                innerHTML: "<span>+</span>",
                onclick: function() {
                    if(widgets.hasClass(this._parent, "minimized")) {
                        widgets.removeClass(this._parent, "minimized");
                        this.innerHTML = "<span>-</span>";
                    }
                    else {
                        widgets.addClass(this._parent, "minimized");
                        this.innerHTML = "<span>+</span>";
                    }
                },
                _parent: listItem
            });
            
            
            left.innerHTML = '<strong>' + data.name + '</strong><br><div>' + parseFeatures(data, params) + '</div><div class="hideonminimized"><br><div class="address">'+data.addr+'</div><a href="tel:'+data.phone+'">'+data.phone+'</a><a href="'+data.www+'" target="_blank">'+data.www+'</a><div><br>'+data.open+'</div></div>';
            
            var guideButton = document.createElement("a");
            guideButton.className = "guidebutton";
            guideButton.href = "http://maps.google.com/maps?saddr="+userLocation.latlong.join(",")+"&daddr="+data.latlong.join(",");
            guideButton.target = "_blank";
            guideButton.textContent = "Guide me there!";
            
            left.appendChild(guideButton);
            listItem.appendChild(left);
            listItem.appendChild(right);
            area.appendChild(listItem);
        }
    };
    
    var generate = function() {
        container.open = open;
        
        return container;
    };
    
    
    return {
        generate: generate
    }
    
});
