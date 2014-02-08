define(function() {
    
    var topBar = function() {
        var div = document.createElement("div");
        div.className = "topbar";
        return div;
    };
    
    var infoButton = function(text, params) {
        params = params || {};
        var button = document.createElement("button");
        button.className = "infobutton";
        button.textContent = text;
        
        button.onclick = params.onclick;
        
        return button;
    };
    
    var infoBox = function(innerHTML) {
        var div = document.createElement("div");
        div.className = "infobox";
        div.innerHTML = innerHTML;
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
        topBar: topBar,
        infoButton: infoButton,
        infoBox: infoBox,
        hide: hide,
        show: show,
        toggleVisibility: toggleVisibility
    };
    
});