define(function() {
    
    var log = console.log.bind(console);
    
    var loadCss = function loadCssFn(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    };
    
    var loadImage = function loadCssFn(url) {
        var img = document.createElement("img");
        img.src = url;
        img.alt = "";
        return img;
    };
    
    var newArray = function(length, placeholder) {
        var a = [];
        for(var i=0; i<length; ++i) {
            a[i] = placeholder;
        }
        return a;
    };
    
    return {
        log: log,
        newArray: newArray,
        load: {
            css: loadCss,
            img: loadImage
        }
    }
    
});