var MetroCoffee = (function() {
    
    require(["utils/hammer", "utils/utils", "ui/widgets", "ui/mainView", "domReady", "utils/prefixfree"],
    function(hammer,          utils,         widgets,      mainView,      domReady,   ____) {
        
        var context = {
            Hammer: hammer,
            widgets: widgets,
            utils: utils
        };
                
        utils.load.css("font/nexa/stylesheet.css");
        utils.load.css("css/animate.css");
        mainView.init(context);
        
        domReady(function() {
            var splash = document.getElementById("splashscreen");
            widgets.addClass(splash, "animated bounceOut");
            setTimeout(function() {
                splash.remove();
            }, 1000);
        });
    });
    
})();