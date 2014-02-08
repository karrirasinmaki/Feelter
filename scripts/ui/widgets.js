define(function() {
    
    var superWidget = function(el, params) {
        params = params || {};
        if(params.innerHTML) el.innerHTML = params.innerHTML;
        if(params.textContent) el.textContent = params.textContent;
        if(params.className) el.className += " "+params.className;
        el.onclick = params.onclick;
    };
    
    var box = function(params) {
        var div = document.createElement("div");
        div.className = "box";
        
        superWidget(div, params);
        return div;
    };
    
    var topBar = function(params) {
        var div = document.createElement("div");
        div.className = "topbar";
        
        superWidget(div, params);
        return div;
    };
    
    var infoButton = function(params) {
        var button = document.createElement("button");
        button.className = "infobutton";
        
        superWidget(button, params);
        return button;
    };
    
    var infoBox = function(params) {
        var div = document.createElement("div");
        div.className = "infobox";
        
        superWidget(div, params);
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
    
    var hide = function(el) {
        addClass(el, "hidden");
    };
    var show = function(el) {
        removeClass(el, "hidden");
    };
    var toggleVisibility = function(el) {
        toggleClass(el, "hidden");
    };
    
    return {
        box: box,
        topBar: topBar,
        infoButton: infoButton,
        infoBox: infoBox,
        
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        
        hide: hide,
        show: show,
        toggleVisibility: toggleVisibility
    };
    
});