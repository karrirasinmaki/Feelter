var MetroCoffee = (function() {
    
    require(["utils/hammer", "utils/utils", "ui/widgets", "ui/mainView"],
    function(hammer,          utils,         widgets,      mainView) {
        
        var context = {
            Hammer: hammer,
            widgets: widgets,
            utils: utils
        };
        
        utils.load.css("font/nexa/stylesheet.css");
        utils.load.css("css/animate.css");
        mainView.init(context);
    });
    
})();