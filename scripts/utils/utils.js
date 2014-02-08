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
    
    return {
        log: log,
        load: {
            css: loadCss,
            img: loadImage
        }
    }
    
});