define(function() {
    
    var superWidget = function(el, params) {
        params = params || {};
        for(var k in params) {
            if(!params.hasOwnProperty(k)) continue;
            el[k] = params[k];
        }
    };
    
    var box = function(params) {
        var div = document.createElement("div");
        superWidget(div, params);
        div.className += " box";
        
        return div;
    };
    
    var button = function(params) {
        var btn = document.createElement("button");
        superWidget(btn, params);
        
        return btn;
    };
    
    var topBar = function(params) {
        var div = document.createElement("div");
        var inner = document.createElement("div");
        var arrowWrapper = document.createElement("div");
        if(params.onclick) {
            div.onclick = params.onclick;
            params.onclick = undefined;
        }
        superWidget(inner, params);
        inner.className += " topbar";
        
        arrowWrapper.className = "arrow-wrapper";
        arrowWrapper.innerHTML = "<span class='arrow-down'></span>";
        div.appendChild(inner);
        div.appendChild(arrowWrapper);
        
        return div;
    };
    
    var infoButton = function(params) {
        var btn = button(params);
        btn.className += " infobutton";
        
        return btn;
    };
    
    var infoBox = function(params) {
        var div = document.createElement("div");
        superWidget(div, params);
        div.className += " infobox";
        
        return div;
    }
        
    var hasClass = function(el, className) {
        return el.className.indexOf(className) !== -1;
    };
    var addClass = function(el, className) {
        if(hasClass(el, className)) return;
        el.className += " "+className;
    };
    var removeClass = function(el, className) {
        el.className = el.className.replace(className, "");
    };
    var toggleClass = function(el, className) {
        if(hasClass(el, className)) removeClass(el, className);
        else addClass(el, className);
    };
    
    var isVisible = function(el) {
        return !hasClass(el, "hidden");
    };
    var hide = function(el) {
        addClass(el, "hidden");
    };
    var show = function(el) {
        removeClass(el, "hidden");
    };
    var toggleVisibility = function(el) {
        toggleClass(el, "hidden");
    };
    
    var animate = {
        setTransform: function(el, command) {
            if(el.style.webkitTransform !== undefined) el.style.webkitTransform = command;
            else if(el.style.transform !== undefined) el.style.transform = command;
            else if(el.style.msTransform !== undefined) el.style.msTransform = command;
            else if(el.style.mozTransform !== undefined) el.style.mozTransform = command;
        },
        slideTo: function(el, y, callback, duration) {
            duration = duration || 700;
            el.style.transition = (duration/1000) + "s all";
            animate.setTransform( el, "translate(0px, "+y+"px)" );
            setTimeout(callback, duration);
        },
        slideUp: function(el, callback, duration) {
            duration = duration || 700;
            var to = el.offsetHeight > 0 ? el.offsetHeight+"px" : "100%";
            el.style.transition = (duration/1000) + "s all";
            animate.setTransform( el, "translate(0px, -"+to+")" );
            setTimeout(callback, duration);
        },
        slideDown: function(el, callback, duration) {
            duration = duration || 700;
            var to = el.offsetHeight > 0 ? el.offsetHeight+"px" : "100%";
            el.style.transition = (duration/1000) + "s all";
            animate.setTransform( el, "translate(0px, "+to+")" );
            setTimeout(callback, duration);
        },
        slideBack: function(el, callback, duration) {
            duration = duration || 700;
            el.style.transition = (duration/1000) + "s all";
            animate.setTransform( el, "translate(0px, 0px)" );
            setTimeout(callback, duration);
        },
        slideHide: function(el) {
            if( !hasClass(el, "slidden") ) animate.slideDown(el, function() {
                toggleClass(el, "slidden");
            }, 500);
            else animate.slideBack(el, function() {
                toggleClass(el, "slidden");
            }, 500);
        },
        slideHideUp: function(el) {
            if( !hasClass(el, "slidden") ) animate.slideUp(el, function() {
                toggleClass(el, "slidden");
            }, 500);
            else animate.slideBack(el, function() {
                toggleClass(el, "slidden");
            }, 500);
        },
        slideToggle: function(el, y, duration) {
            duration = duration || 700;
            if( !hasClass(el, "slidden") ) animate.slideTo(el, y, function() {
                toggleClass(el, "slidden");
            }, duration);
            else animate.slideBack(el, function() {
                toggleClass(el, "slidden");
            }, duration);
        }
    };
    
    return {
        box: box,
        button: button,
        topBar: topBar,
        infoButton: infoButton,
        infoBox: infoBox,
        
        animate: animate,
        
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        
        isVisible: isVisible,
        hide: hide,
        show: show,
        toggleVisibility: toggleVisibility
    };
    
});